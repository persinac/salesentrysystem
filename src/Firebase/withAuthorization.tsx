import * as React from "react";
import { withRouter } from "react-router-dom";
import * as routes from "../constants/routes";
import { firebase, db } from "./index";
import { AuthUserContext } from "./AuthUserContext";

interface InterfaceProps {
    history?: any;
}

export const withAuthorization = (condition: any) => (Component: any) => {
    class WithAuthorization extends React.Component<InterfaceProps, {}> {
        public componentDidMount() {
            firebase.auth.onAuthStateChanged((authUser: any) => {
                db
                  .getUserById(authUser.uid)
                  .then(snapshot => {
                      const dbUser = snapshot.val();
                        console.log(dbUser);
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
                      console.log(authUser);
                      if (!condition(authUser)) {
                          this.props.history.push(routes.SIGN_IN);
                      }
                  });
            })
        }

        public render() {
            return (
                <AuthUserContext.Consumer>
                    {authUser => (authUser ? <Component /> : null)}
                </AuthUserContext.Consumer>
            );
        }
    }

    return withRouter(WithAuthorization as any);
};
