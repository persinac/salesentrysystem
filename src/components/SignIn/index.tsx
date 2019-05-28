import * as React from "react";
import { withRouter } from "react-router-dom";
import './sign_style/signin.css';
import {Wrapper} from "./wrapper";

const SignInComponent = ({ history }: { [key: string]: any }) => (
	<Wrapper history={history}/>
);

export const SignIn = withRouter(SignInComponent);