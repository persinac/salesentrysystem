import * as React from "react";
import { db } from "../../Firebase";
import { withAuthorization } from "../../Firebase/withAuthorization";
import {Admin} from "./Admin";
import * as ROLES from '../../constants/roles'
import * as routes from "../../constants/routes";
const rp = require('request-promise');

const baseURL = 'https://wrf-center.com/api/product';
let options = {
  method: 'GET',
  json: true // Automatically parses the JSON string in the response
};

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

    this.getWRFServerData(baseURL).then( d => {
        this.setState({data: JSON.parse(d)})
      }
    );
  }

  getWRFServerData = (builtURI: string): Promise<any> => {
    return rp(builtURI)
      .then(function(d: any) {
        return d;
      })
      .catch(function(e: any) {
        console.log('ERROR!!!!');
        console.log(e);
      });
  }

  public render() {
    const { users, data }: any = this.state;
    return (
      <div>
        <h2>Admin</h2>
        <p>The admin page is only accessible by admins.</p>

        {!!users && <Admin
          users={users}
          some_data={data}
        />}
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
      route = routes.SIGN_IN;
    }
  }
  return route;
};

export const AdminPage = withAuthorization(authCondition, defaultRouteRedirect)(AdminComponent);
