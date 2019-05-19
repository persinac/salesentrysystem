import * as React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { SignOut } from '../SignOut'
import { AuthUserContext } from "../../Firebase/AuthUserContext";

interface INavState {
    authUser: any
}

interface INavProps {
    authUser: any
}

export default class Navigation extends React.Component {
    render () {
        return (
          <AuthUserContext.Consumer>
              {authUser => (authUser ? this.returnAuthorizedLogin(authUser) : this.returnNonAuthorizedLogin(authUser))}
          </AuthUserContext.Consumer>
        );
    }

    private returnNonAuthorizedLogin(authUser: any) {
        console.log('Non Auth user');
        return (
          <div>
            <ul>
              <li>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              </li>
              <li>
                <Link to={ROUTES.LANDING}>Landing</Link>
              </li>
            </ul>
          </div>
        )
    }

    private returnAuthorizedLogin(authUser: any) {
        console.log('Auth user');
        console.log(authUser);
        return (
          <div>
              <ul>
                  <li>
                      <Link to={ROUTES.LANDING}>Landing</Link>
                  </li>
                  <li>
                      <Link to={ROUTES.HOME}>Home</Link>
                  </li>
                  <li>
                      <Link to={ROUTES.ACCOUNT}>Account</Link>
                  </li>
                  <li>
                      <Link to={ROUTES.ADMIN}>Admin</Link>
                  </li>
                  <li>
                      <SignOut/>
                  </li>
              </ul>
          </div>
        )
    }
}
