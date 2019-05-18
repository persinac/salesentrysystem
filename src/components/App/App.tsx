import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from "../../Firebase/firebase";
import Navigation from '../Navigation/Navigation';
import LandingPage from '../Landing';
import { SignUp } from '../SignUp';
import { SignIn } from '../SignIn';
import { PasswordForget }from '../PasswordForget';
import { Home } from '../Home';
import { Account } from '../Account';
import AdminPage from '../Admin';
import { IAppState } from '../../State'

import * as ROUTES from '../../constants/routes';
import {withAuthentication} from "../../Firebase/withAuthentication";

class AppComponent extends React.Component<any, IAppState> {
    constructor(props: any) {
        super(props);
        this.state = { authUser: null };
    }

    public componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ authUser }))
                : this.setState(() => ({ authUser: null }));
        });
    }
    render () {
        return (
            <div>
                <div>
                    <h1>App</h1>
                </div>
                <Router>
                    <div>
                        <Navigation />
                        <hr />
                        <Route exact path={ROUTES.LANDING} component={LandingPage} />
                        <Route path={ROUTES.SIGN_UP} component={SignUp} />
                        <Route path={ROUTES.SIGN_IN} component={SignIn} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
                        <Route path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.ACCOUNT} component={Account} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />
                    </div>
                </Router>
            </div>
        );
    }
}

export const App = withAuthentication(AppComponent);
