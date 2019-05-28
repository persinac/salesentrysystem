import * as React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import { SignOut } from '../SignOut'
import { authUserContext } from "../../Firebase/AuthUserContext";

interface INavState {
    authUser: any
}

interface INavProps {
    history: any
}

export default class Navigation extends React.Component {
    render () {
        return (
          <authUserContext.Consumer>
              {authUser => (authUser ? this.returnAuthorizedLogin() : this.returnNonAuthorizedLogin())}
          </authUserContext.Consumer>
        );
    }

    private returnNonAuthorizedLogin() {
        return (<div></div>)
    }

    private returnAuthorizedLogin() {
        return (
          <div>
              <ul>
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
                      <SignOut />
                  </li>
              </ul>
          </div>
        )
    }
}

