import * as React from "react";
import {withRouter} from "react-router-dom";
import * as routes from "../constants/routes";
import {firebase, db} from "./index";
import {authUserContext} from "./AuthUserContext";
import {ComponentType} from "react";
import {Roles} from "../State";

interface InterfaceProps {
	history?: any;
	roles?: Roles;
}

export const withAuthorization = (condition: any, routeRedirect?: any) => (Component: ComponentType) => {
	class WithAuthorization extends React.Component<InterfaceProps, {}> {
		constructor(props: InterfaceProps) {
			super(props);
		}

		public componentDidMount() {
			firebase.auth.onAuthStateChanged((authUser: any) => {
				db
					.getUserById(authUser.uid)
					.then(snapshot => {
						const dbUser = snapshot.val();
						// default empty roles
						if (!dbUser.roles) {
							dbUser.roles = {};
						}

						// merge auth and db user
						authUser = {
							uid: authUser.uid,
							email: authUser.email,
							...dbUser,
						};
						let route = routeRedirect ? routeRedirect(authUser) : routes.SIGN_IN;
						console.log(this.props);
						// this.props.roles.isSales = dbUser.roles ? dbUser.roles['isSales'] : false;
						// this.props.roles.isAdmin = dbUser.roles ? dbUser.roles['isAdmin'] : false;

						if (!condition(authUser)) {
							this.props.history.push(route);
						}
					});
			})
		}

		public render() {
			return (
				<authUserContext.Consumer>
					{authUser => (authUser ? <Component/> : null)}
				</authUserContext.Consumer>
			);
		}
	}

	return withRouter(WithAuthorization as any);
};
