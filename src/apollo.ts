import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink, concat, Operation, split } from "apollo-link";
import { onError } from "apollo-link-error";
import { HttpLink } from "apollo-link-http";
import { withClientState } from "apollo-link-state";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";


const getToken = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    return token;
  } else {
    return "뭐지";
  }
};

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation: Operation, forward: any) => {
  operation.setContext({
    headers: {
      "JWT": getToken()
    }
  });
  return forward(operation);
});

const httpLink = new HttpLink({
  uri: "http://localhost:4000/graphql"
});

const wsLink = new WebSocketLink({
  options: {
    connectionParams: {
      "JWT": getToken()
    },
    reconnect: true
  },
  uri: "ws://localhost:4000/subscription"
});

const combinedLinks = split(
  ({ query }) => {
    const { kind, operation }: any = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink
);

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message }) => {
      console.log(`Unexpected error: ${message}`);
    });
  }
  if (networkError) {
    console.log(`Network error: ${networkError}`);
  }
});

const localStateLink = withClientState({
  cache,
  defaults: {
    auth: {
      __typename: "Auth",
      isLoggedIn: Boolean(localStorage.getItem("JWT"))
    }
  },
  resolvers: {
    Mutation: {
      logUserIn: (_, { token }, { cache: appCache }) => {
        localStorage.setItem("JWT", token);
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: true
            }
          }
        });
        return ;
      },
      logUserOut: (_, __, { cache: appCache }) => {
        localStorage.removeItem("JWT");
        appCache.writeData({
          data: {
            auth: {
              __typename: "Auth",
              isLoggedIn: false
            }
          }
        });
        return null;
      }
    }
  }
});

const client = new ApolloClient({
  cache,
  link: ApolloLink.from([
    errorLink,
    localStateLink,
    concat(authMiddleware, combinedLinks)
  ])
});

export default client;
