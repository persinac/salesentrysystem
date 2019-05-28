import * as React from "react";
import Card from "react-bootstrap/Card";
import {GoogleSignIn} from "./GoogleSignIn";
import {SignUpLink} from "../SignUp";
import {PasswordForgetLink} from "../PasswordForget";
import {SignInForm} from "./SignInForm";
import {SignOutComponent} from "../SignOut/SignOut";
import {authUserContext} from "../../Firebase/AuthUserContext";

interface InterfaceProps {
	history?: any;
	authUser?: any;
}

interface InterfaceState {
	renderChild: boolean;
}

export class Wrapper extends React.Component<InterfaceProps, InterfaceState> {
	constructor(props: InterfaceProps) {
		super(props);

		console.log(authUserContext.Consumer);
		this.state = { renderChild: true };
		this.handleChildUnmount = this.handleChildUnmount.bind(this);
		this.handleChildMount = this.handleChildMount.bind(this);
	}

	handleChildUnmount(){
		this.setState({ renderChild: false });
	}

	handleChildMount(){
		this.setState({ renderChild: true });
	}



	public render() {
		return (
			<authUserContext.Consumer>
				{authUser => {
					return (authUser ? null: this.returnComponent())}}
			</authUserContext.Consumer>
		);
	}

	private returnComponent() {
		return (
			<div className="container">
				<div className="d-flex justify-content-center h-100">
					<Card>
						<div className="card-header">
							<h3>SignIn</h3>
							<div className="d-flex justify-content-end social_icon">
								<GoogleSignIn
									history={this.props.history}
								/>
							</div>
						</div>
						<div className="card-body">
							<SignInForm
								history={this.props.history}
							/>
						</div>
						<div className="card-footer">
							<SignUpLink />
							<PasswordForgetLink />
						</div>
					</Card>
				</div>
			</div>
		);
	}
}