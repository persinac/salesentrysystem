import * as React from 'react';
import {db} from '../../Firebase';
import {withAuthorization} from '../../Firebase/withAuthorization';
import {Admin} from './Admin';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import AdminSideNav from "../Navigation/AdminSideNav";

const rp = require('request-promise');

const baseURL = 'https://wrf-center.com/api/product';

interface IState {
	navbarHeight: string;
	users: any;
	data: any;
}

class AdminComponent extends React.Component<{}, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			users: null,
			navbarHeight: '',
			data: null
		};
	}

	public componentDidMount() {
		db.getUsers().then(snapshot =>
			this.setState(() => ({users: snapshot.val()}))
		);

		this.getWRFServerData(baseURL).then(d => {
				this.setState({data: JSON.parse(d)})
			}
		);
		this.setState({navbarHeight: window.getComputedStyle(document.getElementById('primary-navbar'), null).getPropertyValue("height")})
	}

	public getWRFServerData = (builtURI: string): Promise<any> => {
		return rp(builtURI)
			.then((d: any) => {
				return d;
			})
			.catch((e: any) => {
				console.log('ERROR!!!!');
				console.log(e);
			});
	};

	public render() {
		const {navbarHeight} = this.state;
		const containerStyle = {
			height: `calc(100% - ${navbarHeight})`
		};
		return (
			<div className={'container-fluid'} style={containerStyle}>
				<div className={'row height-100'}>
					<AdminSideNav />
					<main role={'main'} className={'col-md-9 ml-sm-auto col-lg-10 pt-3 px-4'}>
						<h2>Admin</h2>
						<p>The admin page is only accessible by admins.</p>
						<p>{navbarHeight}</p>

						<div>
							<p className={'lead'}>
								Add the list of sales orders component here
							</p>
						</div>
					</main>
				</div>
			</div>
		);
	}
}

const authCondition = (authUser: any) => {
	console.log('AUTH CONDITION');
	console.log(authUser);
	console.log(authUser.roles);
	console.log(ROLES.ADMIN);
	console.log(authUser.roles[ROLES.ADMIN]);
	return authUser && !!authUser.roles[ROLES.ADMIN];
};

const defaultRouteRedirect = (authUser: any) => {
	console.log('DEFAULT REDIRECT - ADMIN INDEX');
	console.log(authUser);
	console.log(authUser.roles);
	console.log(ROLES.ADMIN);
	let route = routes.SIGN_IN;
	if (authUser) {
		if (!!authUser.roles[ROLES.ADMIN]) {
			route = routes.ADMIN;
		} else if (!!authUser.roles[ROLES.SALES]) {
			route = routes.ACCOUNT;
		} else {
			route = routes.SIGN_IN;
		}
	}
	return route;
};

export const AdminPage = withAuthorization(authCondition, defaultRouteRedirect)(AdminComponent);
