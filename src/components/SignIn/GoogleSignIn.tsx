import * as React from "react";
import * as routes from "../../constants/routes";
import { auth } from "../../Firebase";

interface InterfaceProps {
  history?: any;
}

interface InterfaceState {
  error: any;
}

export class GoogleSignIn extends React.Component<
  InterfaceProps,
  InterfaceState
  > {
  private static INITIAL_STATE = {
    error: ""
  };

  private static propKey(propertyName: string, value: any): object {
    return { [propertyName]: value };
  }

  constructor(props: InterfaceProps) {
    super(props);
    this.state = { ...GoogleSignIn.INITIAL_STATE };
  }

  public onSubmit = (event: any) => {
    const { history } = this.props;

    auth.doSignInWithGoogle()
      .then((socialAuthUser: any) => {
        this.setState({error: null});
        history.push(routes.HOME);
      })
      .catch((e: any) => {
        this.setState({error: e});
      });

    event.preventDefault();
  };

  public render() {
    const { error } = this.state;
    return (
      <form onSubmit={e => this.onSubmit(e)}>
        <button type="submit"> Sign In with Google </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }

  private setStateWithEvent(event: any, columnType: string): void {
    this.setState(GoogleSignIn.propKey(columnType, (event.target as any).value));
  }
}