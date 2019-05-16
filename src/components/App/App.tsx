import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from "../Firebase/firebase";
import Navigation from '../Navigation/Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp/SignUp';
import SignInPage from '../SignIn';
import PasswordForgetPage from '../PasswordForget';
import HomePage from '../Home';
import AccountPage from '../Account';
import AdminPage from '../Admin';

import * as ROUTES from '../../constants/routes';

export default class App extends React.Component {
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
                        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
                        <Route path={ROUTES.HOME} component={HomePage} />
                        <Route path={ROUTES.ACCOUNT} component={AccountPage} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />
                    </div>
                </Router>
            </div>
        );
    }
}