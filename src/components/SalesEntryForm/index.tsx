import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {db} from '../../Firebase';
import {withAuthorization} from '../../Firebase/withAuthorization';
import {SalesEntryForm} from './SalesEntryForm';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import '../../styles/general.css';
import Accordion from 'react-bootstrap/Accordion';

const rp = require('request-promise');

const baseURL = 'https://wrf-center.com/api/product';

class SalesEntryFormComponent extends React.Component {
	constructor(props: any) {
		super(props);

		this.state = {
			users: null
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
	}

	private handleAccordionToggleClick(e: any, aId: number) {
		console.log(aId);
		const el = document.getElementById(aId.toString());
		console.log(el.classList);
		if (el.classList.contains('show')) {
			console.log('COLLAPSE ME');
			el.classList.remove('show');
		}
	}

	public render() {
		const {users, data}: any = this.state;
		return (
			<div className={'bg-light height-100'}>
				<div className={'container'}>
					<div className={'py-5 text-center'}>
						<h2>Sales Entry</h2>
						<p>Accessible if sales or admin</p>
					</div>
						<div className={'row'}>
							<div className={'col-md-4 order-md-2 mb-4'}>
								<p className={'lead'}>Maybe use this sidebar as a component checklist? Validations?</p>
								<p>{!!users && <SalesEntryForm users={users} some_data={data}/>}</p>
							</div>
							<div className={'col-md-8 order-md-1'}>
								<Accordion>
									<Card>
											<Accordion.Toggle as={Card.Header} eventKey='0' onClick={(e) => this.handleAccordionToggleClick(e, 0)}>
												Click me!
											</Accordion.Toggle>
										<Accordion.Collapse eventKey='0' id={'0'}>
											<Card.Body>Hello! I'm the body</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
											<Accordion.Toggle as={Card.Header} eventKey='1' onClick={(e) => this.handleAccordionToggleClick(e, 1)}>
												Click me!
											</Accordion.Toggle>
										<Accordion.Collapse eventKey='1' id={'1'}>
											<Card.Body>Hello! I'm another body</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							</div>
						</div>
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
	return authUser && !!authUser.roles[ROLES.ADMIN] || !!authUser.roles[ROLES.SALES];
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

export const salesEntryFormPage = withAuthorization(authCondition, defaultRouteRedirect)(SalesEntryFormComponent);
