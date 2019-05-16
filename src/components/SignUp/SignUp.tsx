import * as React from "react";
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import {ChangeEvent, FormEvent} from "react";
import { auth } from "../Firebase/firebase";

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
        console.log(event);
        const { email, passwordOne, username } = this.state;
        const { history } = this.props;
        if(email && passwordOne && username) {
            auth.createUserWithEmailAndPassword(email, passwordOne)
                .then((authUser: any) => {
                    console.log(authUser);
                    // console.log(this.props);
                    history.push(ROUTES.HOME);
                    // console.log(this.props);
                    console.log(this.state);
                    this.setState({...INITIAL_STATE});
                    console.log(this.state);
                    // Create a user in your own accessible Firebase Database too
                    /*db.doCreateUser(authUser.user.uid, username, email)
                        .then(() => {
                            console.log('1');
                            this.setState(() => ({...INITIAL_STATE}));
                            console.log('2');
                            history.push(ROUTES.HOME);
                            console.log('3');
                        })
                        .catch((error: any) => {
                            this.setState(error);
                        });*/
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