import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {auth, db} from '../../Firebase';
import {withAuthorization} from '../../Firebase/withAuthorization';
import {SalesEntryForm} from './SalesEntryForm';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import '../../styles/general.css';
import Accordion from 'react-bootstrap/Accordion';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faLongArrowAltDown, faLongArrowAltUp, faUser} from "@fortawesome/free-solid-svg-icons";
import {Roles} from "../../State";

const rp = require('request-promise');

const baseURL = 'https://wrf-center.com/api/product';

interface IProps {
	email?: string;
	error?: any;
	history?: any;
	password?: string;
	height?: string;
}

interface IState {
	email: string;
	error: any;
	password: string;
	roles: Roles;
	data: any;
	height?: string;
	doesContainShow?: boolean;
}

class SalesEntryFormComponent extends React.Component<IProps, IState> {
	private static INITIAL_STATE = {
		email: "",
		error: {},
		password: "",
		height: "",
		roles: {
			isAdmin: true,
			isSales: true
		},
		data: {},
		doesContainShow: false
	};

	constructor(props: any) {
		super(props);

		this.state = { ...SalesEntryFormComponent.INITIAL_STATE };
	}

	public componentDidMount() {
		this.getWRFServerData(baseURL).then(d => {
				this.setState({data: JSON.parse(d)})
			}
		);
	}

	public onSubmit = (event: any) => {
		if(!this.state.height) {
			this.setState({ height: '34.5' });
		}
		event.preventDefault();
	};

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

	private doesContainShow(aId: string) {
		console.log(aId);
		const el = document.getElementById(aId);
		console.log(el);
		if(el && el.classList.contains('show')) {
			return <FontAwesomeIcon icon={faLongArrowAltUp}/>
		}
	}

	private handleAccordionToggleClick(e: any, aId: string) {
		const el = document.getElementById(aId);
		el.classList.toggle('show');
		if(el && el.classList.contains('show')) {
			this.setState({doesContainShow: true})
		} else {
			this.setState({doesContainShow: false})
		}
	}

	public render() {
		const { email, password, error, data, height } = this.state;
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
								<p>{!!data && <SalesEntryForm some_data={data}/>}</p>
							</div>
							<div className={'col-md-8 order-md-1'}>
								<Accordion>
									<Card>
											<Accordion.Toggle as={Card.Header} eventKey='0' onClick={(e: any) => this.handleAccordionToggleClick(e, 'accord-0')}>
												Size <span className={"floater-rght"} id={'accord-icon-0'}>
												{this.state.doesContainShow ? <FontAwesomeIcon icon={faLongArrowAltUp}/> : <FontAwesomeIcon icon={faLongArrowAltDown}/>}
						          </span>
											</Accordion.Toggle>
										<Accordion.Collapse eventKey='0' id={'accord-0'}>
											<Card.Body>
												<form onSubmit={event => this.onSubmit(event)}>
													<div className="input-group form-group">
														<input
															value={email}
															onChange={event => this.setStateWithEvent(event, "email")}
															type="text"
															placeholder="Length"
															className="form-control"
														/>
														<input
															value={password}
															onChange={event => this.setStateWithEvent(event, "password")}
															type="text"
															placeholder="Depth"
															className="form-control"
														/>
														<input
															value={height || "34.5"}
															onChange={event => this.setStateWithEvent(event, "height")}
															type="text"
															placeholder="Height"
															className="form-control"
														/>
													</div>
													<div className="input-group form-group">

													</div>
													<button type="submit" className="btn float-right login_btn">
														Save Size
													</button>

													<div className="input-group form-group">
														{error && <p className={"signin-error"}>{error.message}</p>}
													</div>
												</form>
											</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
											<Accordion.Toggle as={Card.Header} eventKey='1' onClick={(e) => this.handleAccordionToggleClick(e, 'accord-1')}>
												Style
											</Accordion.Toggle>
										<Accordion.Collapse eventKey='1' id={'accord-1'}>
											<Card.Body>Style Questions here</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey='2' onClick={(e) => this.handleAccordionToggleClick(e, 'accord-2')}>
											Features / Luxuries
										</Accordion.Toggle>
										<Accordion.Collapse eventKey='2' id={'accord-2'}>
											<Card.Body>Features / Luxuries questions</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey='3' onClick={(e) => this.handleAccordionToggleClick(e, 'accord-3')}>
											Top(s)
										</Accordion.Toggle>
										<Accordion.Collapse eventKey='3' id={'accord-3'}>
											<Card.Body>Tops questions</Card.Body>
										</Accordion.Collapse>
									</Card>
									<Card>
										<Accordion.Toggle as={Card.Header} eventKey='4' onClick={(e) => this.handleAccordionToggleClick(e, 'accord-4')}>
											Color
										</Accordion.Toggle>
										<Accordion.Collapse eventKey='4' id={'accord-4'}>
											<Card.Body>Color Qs</Card.Body>
										</Accordion.Collapse>
									</Card>
								</Accordion>
							</div>
						</div>
				</div>
			</div>
		);
	}

	private static propKey(propertyName: string, value: any): object {
		return { [propertyName]: value };
	}

	private setStateWithEvent(event: any, columnType: string): void {
		this.setState(SalesEntryFormComponent.propKey(columnType, (event.target as any).value));
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
