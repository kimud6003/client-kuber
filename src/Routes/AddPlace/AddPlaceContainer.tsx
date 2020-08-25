import React from "react";
import { Mutation } from "react-apollo";
// import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { GET_PLACES } from "../../sharedQueries";
import { addPlace, addPlaceVariables } from "../../types/api";
import AddPlacePresenter from "./AddPlacePresenter";
import { ADD_PLACE } from "./AddPlaceQuery";

interface IState {
  address: string;
  name: string;
  lat?: number;
  lng?: number;
}


class AddPlaceQuery extends Mutation<addPlace, addPlaceVariables> {}

class AddPlaceContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    if (!props.location.state) {
      this.state = {
        address: "",
        name: ""
      };
    } else {
      const {
        location: {
          state: { address, lat, lng }
        }
      } = props;
      this.state = {
        address,
        name: "",
        lat,
        lng
      };
    }
  }
  // constructor(props: any) {
    // super(props);
    // const { location:{} } = props;
    // this.state = {
    //   address:"대구광역시 북구 산격3동 1421-19",
    //   lat:35.891665, 
    //   lng:128.605520,
    //   name: ""
    // };
  // }
  public render() {
    const { address, name, lat, lng } = this.state;
    const { history } = this.props;
    return (
      <AddPlaceQuery
        mutation={ADD_PLACE}
        onCompleted={data => {
          const { AddPlace } = data;
          if (AddPlace.ok) {
            toast.success("Place added!");
            setTimeout(() => {
              history.push("/places");
            }, 2000);
          } else {
            toast.error(AddPlace.error);
          }
        }}
        refetchQueries={[{ query: GET_PLACES }]}
        variables={{
          address,
          isFav: false,
          lat,
          lng,
          name
        }}
      >
        {(addPlaceFn, { loading }) => (
          <AddPlacePresenter
            onInputChange={this.onInputChange}
            address={address}
            name={name}
            loading={loading}
            onSubmit={addPlaceFn}
            pickedAddress={lat !== 0 && lng !== 0}
          />
        )}
      </AddPlaceQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement
  > = async event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default AddPlaceContainer;
