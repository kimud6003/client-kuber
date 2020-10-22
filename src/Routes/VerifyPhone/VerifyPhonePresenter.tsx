import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "../../typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn;
  loading: boolean;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({
  verificationKey,
  onChange,
  onSubmit,
  loading
}) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"핸드폰 인증 페이지"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput
        value={verificationKey}
        placeholder={"핸드폰 인증번호입력"}
        onChange={onChange}
        name={"verificationKey"}
      />
      <Button
        disabled={loading}
        value={loading ? "인증되었습니다" : "확인"}
        onClick={null}
      />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
