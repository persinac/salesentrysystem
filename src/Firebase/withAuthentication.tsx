import React from "react";
import { firebase } from "./index";
import { authUserContext } from "./AuthUserContext";

interface InterfaceProps {
    authUser?: any;
}

interface InterfaceState {
    authUser?: any;
}

export const withAuthentication = (Component: any) => {
    class WithAuthentication extends React.Component<
        InterfaceProps,
        InterfaceState
        > {
        constructor(props: any) {
            super(props);

            this.state = {
                authUser: null
            };
        }

        public componentDidMount() {
            firebase.auth.onAuthStateChanged(authUser => {
                authUser
                    ? this.setState(() => ({ authUser }))
                    : this.setState(() => ({ authUser: null }));
            });
        }

        public render() {
            const { authUser } = this.state;
            return (
                <authUserContext.Provider value={authUser}>
                    <Component />
                </authUserContext.Provider>
            );
        }
    }
    return WithAuthentication;
};
