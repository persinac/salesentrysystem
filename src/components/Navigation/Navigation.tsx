import * as React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import {SignOut} from '../SignOut';
import {authUserContext} from '../../Firebase/AuthUserContext';
import Nav from "react-bootstrap/Nav";
import {act} from "react-dom/test-utils";

interface INavState {
	authUser: any
}

interface INavProps {
	history: any
}

export default class Navigation extends React.Component {
	render() {
		return (
			<authUserContext.Consumer>
				{authUser => (authUser ? this.returnAuthorizedLogin() : this.returnNonAuthorizedLogin())}
			</authUserContext.Consumer>
		);
	}

	private returnNonAuthorizedLogin() {
		return (<div></div>);
	}

	private returnAuthorizedLogin() {
		return (
			<Nav id={'primary-navbar'} className={'navbar navbar-expand-lg navbar-dark sticky-top bg-dark flex-md-nowrap p-0'}>
				<div className={'navbar-brand col-sm-3 col-md-2 mr-0'}><a>WRF Center</a></div>
				{/*<button className={"navbar-toggler"} type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
				        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					<span className={"navbar-toggler-icon"}></span>
				</button>*/}
				<div className={'navbar-collapse'} id="navbarSupportedContent">
					<ul className={'navbar-nav mr-auto'}>
						<li className={"nav-item active"}>
							<Link className={"nav-link"} to={ROUTES.HOME} onClick={(event) => {
								this.removeActiveClasses();
								(event.target as any).classList.toggle('active')
							}
							}>Home</Link>
						</li>
						<li className={"nav-item"}>
							<Link className={"nav-link"} to={ROUTES.ACCOUNT} onClick={(event) => {
								this.removeActiveClasses();
								(event.target as any).classList.toggle('active')
							}
							}>Account</Link>
						</li>
						<li className={"nav-item"}>
							<Link className={"nav-link"} to={ROUTES.ADMIN} onClick={(event) => {
								this.removeActiveClasses();
								(event.target as any).classList.toggle('active')
							}
							}>Admin</Link>
						</li>
						<li className={"nav-item"}>
							<Link className={"nav-link"} to={ROUTES.SALES_ENTRY_FORM} onClick={(event) => {
								this.removeActiveClasses();
								(event.target as any).classList.toggle('active')
							}
							}>New Sales Entry</Link>
						</li>
						<li className={"nav-item"}>
							<Link className={"nav-link"} to={ROUTES.SALES_ENTRY_FORM} onClick={(event) => {
								this.removeActiveClasses();
								(event.target as any).classList.toggle('active')
							}
							}>List of Orders</Link>
						</li>
					</ul>
				</div>
				<ul className={'navbar-nav px-3'}>
					<li className={'nav-item text-nowrap'}>
						<SignOut/>
					</li>
				</ul>
			</Nav>
		)
	}

	private removeActiveClasses(): void {
		[...document.querySelectorAll('.active')].forEach(function(e) {
			e.classList.remove('active');
		});
	}
}

