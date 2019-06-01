import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as firebase from "../../Firebase/firebase";
import Navigation from '../Navigation/Navigation';
import { salesEntryFormPage } from '../SalesEntryForm';
import { SignUp } from '../SignUp';
import { SignIn } from '../SignIn';
import { PasswordForget }from '../PasswordForget';
import { Home } from '../Home';
import { Account } from '../Account';
import { AdminPage } from '../Admin';
import { IAppState } from '../../State';
import '../../styles/general.css';

import * as ROUTES from '../../constants/routes';
import {withAuthentication} from "../../Firebase/withAuthentication";

interface IProps {
    history?: any;
}

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
            <div className={"height-100"}>
                <Router>
                    <div className={"height-100"}>
                        <Navigation />
                        <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
                        <Route path={ROUTES.SIGN_IN} component={SignIn} />
                        <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForget} />
                        <Route path={ROUTES.HOME} component={Home} />
                        <Route path={ROUTES.ACCOUNT} component={Account} />
                        <Route path={ROUTES.ADMIN} component={AdminPage} />
                        <Route path={ROUTES.SALES_ENTRY_FORM} component={salesEntryFormPage} />
                    </div>
                </Router>
            </div>
        );
    }
}

export const App = withAuthentication(AppComponent);
