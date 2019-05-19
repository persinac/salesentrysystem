import * as React from "react";
import { AuthUserContext } from "../../Firebase/AuthUserContext";
import { withAuthorization } from "../../Firebase/withAuthorization";
import { PasswordForgetForm } from "../PasswordForget/PasswordForgetForm";
import { PasswordChangeForm } from "./PasswordChangeForm";

export const AccountComponent = () => (
  <AuthUserContext.Consumer>
    {authUser => {  console.log("ACCOUNT COMP"); console.log(authUser); return(
      <div>
        <h1>Account: {(authUser as any).email}</h1>
        <h1>Username: {(authUser as any).username}</h1>
        <h3>API Key: {(authUser as any).uid}</h3>
        <h5>Roles: {(authUser as any).roles}</h5>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}}
  </AuthUserContext.Consumer>
);

const authCondition = (authUser: any) => !!authUser;

export const Account = withAuthorization(authCondition)(AccountComponent);
