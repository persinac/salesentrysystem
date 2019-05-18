import * as React from "react";
import { db } from "../../Firebase";
import { withAuthorization } from "../../Firebase/withAuthorization";
import { UserList } from "./UserList";

class HomeComponent extends React.Component {
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
        <h2>Home Page</h2>
        <p>The Home Page is accessible by every signed in user.</p>

        {!!users && <UserList users={users} />}
      </div>
    );
  }
}

const authCondition = (authUser: any) => !!authUser;

export const Home = withAuthorization(authCondition)(HomeComponent);
