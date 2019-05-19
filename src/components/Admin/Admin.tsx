import * as React from "react";

interface InterfaceProps {
  users?: any;
}

export class Admin extends React.Component<InterfaceProps, {}> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    const { users }: any = this.props;

    return (
      <div>
        <h4>List of User name</h4>
        <p>(Saved on Sign Up in Firebase Database)</p>

        <ul>
          {Object.keys(users).map(key => {
            return <li key={key}>{users[key].username}</li>;
          })}
        </ul>
      </div>
    );
  }
}
