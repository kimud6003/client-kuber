import React from "react";
import { Mutation } from "react-apollo";
// import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { VERIFY_PHONE } from "./VerifyPhoneQueries";

interface IState {
  verificationKey: string;
  phoneNumber:string; 
}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    if (!props.location.state) {
      props.history.push("/");
    }
    const {
      location: { state }
    } = props;
    let phoneNumber = "";
    if (state) {
      phoneNumber = state.phone;
    } else {
      phoneNumber = "";
    }
    this.state = {
      phoneNumber,
      verificationKey: "",
    };
  }
  public render() {
    const { verificationKey, phoneNumber } = this.state;
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <VerifyMutation
            mutation={VERIFY_PHONE}
            variables={{
              key: verificationKey,
              phoneNumber
            }}
            onCompleted={data => {
              const { CompletePhoneVerification } = data;
              if (CompletePhoneVerification.ok) {
                if (CompletePhoneVerification.token) {
                  logUserIn({
                    variables: {
                      token: CompletePhoneVerification.token
                    }
                  });
                }
                toast.success("인증 되었습니다.");
                toast.info('메뉴에서 이름을 설정 해주세요', {
                  position: "top-center",
                  autoClose: false,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  });
              } else {
                toast.error(CompletePhoneVerification.error);
              }
            }}
          >
            {(mutation, { loading }) => (
              <VerifyPhonePresenter
                onSubmit={mutation}
                onChange={this.onInputChange}
                verificationKey={verificationKey}
                loading={loading}
              />
            )}
          </VerifyMutation>
        )}
      </Mutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;
