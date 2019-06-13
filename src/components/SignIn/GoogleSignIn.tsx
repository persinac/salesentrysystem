import React from "react";
import * as routes from "../../constants/routes";
import { auth, db } from "../../Firebase";
import {Roles} from "../../State";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGoogle} from '@fortawesome/free-brands-svg-icons'

interface InterfaceProps {
	history?: any;
}

interface InterfaceState {
	error: any;
	roles: Roles;
}

export class GoogleSignIn extends React.Component<InterfaceProps, InterfaceState> {
	private static INITIAL_STATE = {
		error: "",
		roles: {
			isAdmin: true,
			isSales: true
		}
	};

	private static propKey(propertyName: string, value: any): object {
		return { [propertyName]: value };
	}

	constructor(props: InterfaceProps) {
		super(props);
		this.state = { ...GoogleSignIn.INITIAL_STATE };
	}

	public onSubmit = (event: any) => {
		const { history } = this.props;

		auth.doSignInWithGoogle()
			.then((socialAuthUser: any) => {
				// query server for list of allowed users/emails
				// redirect if email is not found?
				this.setState({error: null});
				history.push(routes.HOME);
				const roles = {isAdmin: true, isSales: false};
				console.log(socialAuthUser.user);
				// Create a user in your own accessible Firebase Database
				db.doCreateUser(socialAuthUser.user.uid, socialAuthUser.user.email, socialAuthUser.user.email, roles)
					.then(() => {
						this.setState(() => ({...GoogleSignIn.INITIAL_STATE}));
					})
					.catch((error: any) => {
						this.setState(error);
					});
			})
			.catch((e: any) => {
				this.setState({error: e});
			});

		event.preventDefault();
	};

	public render() {
		const { error } = this.state;
		return (

			<form onClick={e => this.onSubmit(e)}>
            <span>
              <FontAwesomeIcon icon={faGoogle}/>
            </span>
				{error && <p>{error.message}</p>}
			</form>
		);
	}

	private setStateWithEvent(event: any, columnType: string): void {
		this.setState(GoogleSignIn.propKey(columnType, (event.target as any).value));
	}
}