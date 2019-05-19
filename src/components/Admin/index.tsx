import * as React from "react";
import { db } from "../../Firebase";
import { withAuthorization } from "../../Firebase/withAuthorization";
import {Admin} from "./Admin";
import * as ROLES from '../../constants/roles'

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

const authCondition = (authUser: any) => authUser && !!authUser.roles[ROLES.ADMIN];

export const AdminPage = withAuthorization(authCondition)(AdminComponent);
