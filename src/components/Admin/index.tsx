import * as React from "react";
import { db } from "../../Firebase";
import { withAuthorization } from "../../Firebase/withAuthorization";
import {Admin} from "./Admin";
import * as ROLES from '../../constants/roles'
import * as routes from "../../constants/routes";

class AdminComponent extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      users: null
    };
  }

  public componentDidMount() {
    db.getUsers().then(snapshot =>
      this.setState(() => ({ users: snapshot.val() }))
    );
  }

  public render() {
    const { users }: any = this.state;
    return (
      <div>
        <h2>Admin</h2>
        <p>The admin page is only accessible by admins.</p>

        {!!users && <Admin users={users} />}
      </div>
    );
  }
}

const authCondition = (authUser: any) => {
  console.log("AUTH CONDITION");
  console.log(authUser);
  console.log(authUser.roles);
  console.log(ROLES.ADMIN);
  console.log(authUser.roles[ROLES.ADMIN]);
  return authUser && !!authUser.roles[ROLES.ADMIN]};

const defaultRouteRedirect = (authUser: any) => {
  console.log("DEFAULT REDIRECT - ADMIN INDEX");
  console.log(authUser);
  console.log(authUser.roles);
  console.log(ROLES.ADMIN);
  let route = routes.SIGN_IN;
  if(authUser) {
    if(!!authUser.roles[ROLES.ADMIN]) {
      route = routes.ADMIN;
    } else if(!!authUser.roles[ROLES.SALES]) {
      route = routes.ACCOUNT;
    } else {
      route = routes.LANDING;
    }
  }
  return route;
};

export const AdminPage = withAuthorization(authCondition, defaultRouteRedirect)(AdminComponent);
