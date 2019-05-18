import * as React from "react";
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import {ChangeEvent, FormEvent} from "react";
import { auth, db } from "../../Firebase";

interface ISignUpProps {
    email?: string;
    error?: any;
    history?: any;
    passwordOne?: string;
    passwordTwo?: string;
    username?: string;
};

interface IFormState {
    username: string,
    email: string,
    passwordOne: string,
    passwordTwo: string,
    error?: IError | null
};

interface IError {
    message: string;
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

export class SignUpForm extends React.Component<ISignUpProps, Partial<IFormState>> {
    constructor(props: ISignUpProps) {
        super(props);
        this.state = {...INITIAL_STATE};
    }

    private onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const { email, passwordOne, username } = this.state;
        const { history } = this.props;
        if(email && passwordOne && username) {
            auth.doCreateUserWithEmailAndPassword(email, passwordOne)
                .then((authUser: any) => {
                    this.setState({...INITIAL_STATE});
                    // Create a user in your own accessible Firebase Database too
                    db.doCreateUser(authUser.user.uid, username, email)
                        .then(() => {
                            this.setState(() => ({...INITIAL_STATE}));
                            history.push(ROUTES.HOME);
                        })
                        .catch((error: any) => {
                            this.setState(error);
                        });
                })
                .catch((error: any) => {
                    this.setState(error);
                });
        }
        event.preventDefault();
    };

    private onChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Full Name"
                />
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Email Address"
                />
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Password"
                />
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Confirm Password"
                />
                <button disabled={isInvalid} type="submit">Sign Up</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

export const SignUpLink = () => (
    <p>Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link></p>
);