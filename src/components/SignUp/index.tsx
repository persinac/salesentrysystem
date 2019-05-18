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
    <p>
        Don't have an account? <Link to={routes.SIGN_UP}>Sign Up</Link>
    </p>
);

export const SignUp = withRouter(SignUpComponent);