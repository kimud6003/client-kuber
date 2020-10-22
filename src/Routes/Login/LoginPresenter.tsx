import React from "react";
import Helmet from "react-helmet";
import { Link, RouteComponentProps } from "react-router-dom";
import bgImage from "../../images/bg.png";
import styled from "../../typed-components";

const Container = styled.div`
  height: 100vh;
`;

const Header = styled.header`
  height: 65%;
  max-width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.0)),
    url(${bgImage});
`;

const Logo = styled.div`
  width: 155px;
  height: 155px;
  background-color:#4267B2;
  color:white;
  border-radius:50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 -14px 28px rgba(0, 0, 0, 0.22);
  text-transform: uppercase;
  font-weight: 500;
  font-size: 25px;
`;

const Title = styled.h1``;

const Footer = styled.div``;

const Subtitle = styled.h2`
  font-size: 30px;
`;

const FakeInput = styled.div`
  margin: 50px 0px;
  font-size: 25px;
  font-weight: 300;
`;

const PhoneLogin = styled.div`
  padding: 20px;
  cursor: pointer;
`;

const Grey = styled.span`
  color: ${props => props.theme.greyColor};
  margin-left: 10px;
`;

const SocialLogin = styled.div`
  border-top: 1px solid ${props => props.theme.greyColor};
  padding: 30px 20px;
`;

const SocialLink = styled.span`
  color: ${props => props.theme.blueColor};
  font-size: 20px;
  cursor: pointer;
`;

interface IProps extends RouteComponentProps<any> {}

const OutHomePresenter: React.SFC<IProps> = () => (
  <Container>
    <Helmet>
      <title>택시</title>
    </Helmet>
    <Header>
      <Logo>
        <Title>internseer</Title>
      </Logo>
    </Header>
    <Footer>
      <Link to={"/phone-login"}>
        <PhoneLogin>
          <Subtitle>고객을 찾아봅시다</Subtitle>
          <FakeInput>
            🇰🇷 +82 <Grey>핸드폰 번호 입력</Grey>
          </FakeInput>
        </PhoneLogin>
      </Link>
      <Link to={"/social-login"}>
        <SocialLogin>
          <SocialLink>페이스북 로그인</SocialLink>
        </SocialLogin>
      </Link>
    </Footer>
  </Container>
);

export default OutHomePresenter;
