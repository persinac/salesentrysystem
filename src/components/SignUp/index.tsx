import * as React from "react";
import { Link, withRouter } from "react-router-dom";
import * as routes from "../../constants/routes";
import { SignUpForm } from "./SignUp";

const SignUpComponent = ({ history }: { [key: string]: any }) => (
	<div>
		<h1>Sign Up</h1>
		<SignUpForm history={history}/>
	</div>
);

export const SignUpLink = () => (
	<div className="d-flex justify-content-center links">
		Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
	</div>
);

export const SignUp = withRouter(SignUpComponent);