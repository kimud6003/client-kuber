import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import styled from "../../typed-components";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  profilePhoto: string;
  onSubmit: MutationFn;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({
  firstName,
  lastName,
  onSubmit,
  profilePhoto,
  onInputChange,
  loading,
  uploading
}) => (
  <Container>
    <Helmet>
      <title>이름 수정</title>
    </Helmet>
    <Header title={"사용자 수정"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput
        uploading={uploading}
        fileUrl={profilePhoto}
        onChange={onInputChange}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={firstName}
        placeholder={"성"}
        name={"firstName"}
      />
      <ExtendedInput
        onChange={onInputChange}
        type={"text"}
        value={lastName}
        placeholder={"이름"}
        name={"lastName"}
      />
      <Button onClick={null} value={loading ? "Loading" : "Update"} />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
