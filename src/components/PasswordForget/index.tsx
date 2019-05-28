import * as React from "react";
import { Link } from "react-router-dom";
import { PasswordForgetForm } from "./PasswordForgetForm";

export const PasswordForget = () => (
	<div>
		<h1>PasswordForget</h1>
		<PasswordForgetForm />
	</div>
);

export const PasswordForgetLink = () => (
	<div className="d-flex justify-content-center">
		<Link to="/pw-forget">Forgot Password?</Link>
	</div>
);