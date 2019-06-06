import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {auth, db} from '../../Firebase';
import {withAuthorization} from '../../Firebase/withAuthorization';
import {CustomerEntryComponent} from '../Customer';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import '../../styles/general.css';
import Accordion from 'react-bootstrap/Accordion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faLongArrowAltDown, faLongArrowAltUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {Customer, ProductHeader, Questions, QuestionValues, Roles} from '../../State';
import {SalesEntryFormComponent} from "../SalesEntryForm";
import {CustomerEntry} from "../Customer/CustomerEntry";
import {ProductHeaderComponent} from "../ProductHeaderInfo";

const rp = require('request-promise');

const baseURL = 'https://wrf-center.com/api/';
const devBaseURL = 'http://localhost:8080/';

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
	containerHeight: string;
	navbarHeight: string;
	page: number;
	customer?: Customer;
	productHeader?: ProductHeader;
	questions?: Questions[];
	questionValues?: Map<number, QuestionValues>;
	categories?: any;
	secondary_categories?: any;
}

class NewSalesEntryComponent extends React.Component<IProps, IState> {
	private static INITIAL_STATE = {
		email: '',
		error: {},
		password: '',
		roles: {
			isAdmin: true,
			isSales: true
		},
		data: {},
		containerHeight: '',
		navbarHeight: '',
		page: 0,
		customer: {email: '', name: '', primary_phone_number: '', shipping_address: ''},
		productHeader: {notes: '', reference_number: ''},
	};

	constructor(props: any) {
		super(props);

		this.setCustomerStateWithEvent = this.setCustomerStateWithEvent.bind(this);
		this.setProductStateWithEvent = this.setProductStateWithEvent.bind(this);
		this.state = {...NewSalesEntryComponent.INITIAL_STATE};
	}

	public componentDidMount() {
		const questionUrl = baseURL + 'question';
		this.getWRFServerData(questionUrl).then(d => {
			const parsedD = JSON.parse(d);
			this.setState({questions: parsedD});
			if (parsedD) {
				let qVals: Map<number, QuestionValues> = new Map;
				parsedD.forEach((e: any) => {
					qVals.set(e.q_id, {[e.short_name]: ''});
				});
				this.setState({questionValues: qVals});
			}
		});

		const catUrl = baseURL + 'category/';
		this.getWRFServerData(catUrl).then(d => {
				const parsedD = JSON.parse(d);
				if (parsedD) {
					this.setState({categories: parsedD});
				}
			}
		);

		const primaryNavBarHeight =  window.getComputedStyle(document.getElementById('primary-navbar'), null).getPropertyValue("height");
		const hdrHeight =  window.getComputedStyle(document.getElementById('sales-entry-hdr'), null).getPropertyValue("height");
		this.setState({containerHeight: `(${primaryNavBarHeight} + ${hdrHeight})`, navbarHeight: primaryNavBarHeight})
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
		const {containerHeight, navbarHeight} = this.state;
		const rowStyle = {
			height: `calc(100% - ${containerHeight})`
		};
		const containerStyle = {
			height: `calc(100% - ${navbarHeight})`
		};
		const {email, password, error, data} = this.state;
		return (
			<div className={'bg-light height-100'} style={containerStyle}>
				<div className={'container'}>
					<div className={'py-5 text-center'} id={'sales-entry-hdr'}>
						<h2>Sales Entry</h2>
						<p>Accessible if sales or admin</p>
					</div>
					<div className={'row'} style={rowStyle}>
						<div className={'col-md-4 order-md-2 mb-4'}>
							<p className={'lead'}>Maybe use this sidebar as a component summary? Price/Margin?</p>
						</div>
						<div className={'col-md-8 order-md-1'}>
							{this.renderPage()}
							<hr />
						</div>
					</div>
					<div>
						<div className={'row'}>
							{this.renderButtons()}
						</div>
					</div>
				</div>
			</div>
		);
	}

	private renderButtons() {
		const {page} = this.state;
		if (page == 0) {
			return <button
				type='button'
				className='btn btn-outline-primary margin-t-10'
				onClick={(e)=>{this.setState({page: 1})}}>Next - Product Details</button>
		}
		if (page == 1) {
			return (
				<div>
					<button
						type='button'
						className='btn btn-outline-primary margin-t-10'
						onClick={(e)=>{this.setState({page: 0})}}>Back - Primary Information</button>
				</div>
			)
		}
	}

	public onCustomerSubmit = (event: any) => {
		console.log(event);
		console.log('ON CUSTOMER SUBMIT IN NEW SALES ENTRY (parent)');
		console.log(this.state.customer);
		event.preventDefault();
	};

	private renderPage() {
		const {page, customer, productHeader, questions, questionValues, categories} = this.state;
		if (page == 0) {
			return (
				<div>
					<CustomerEntryComponent customer={customer} customerHandler={this.setCustomerStateWithEvent}/>
					<ProductHeaderComponent productHeader={productHeader} phHandler={this.setProductStateWithEvent}/>
					<div className={'row'}>
						<div className={'width-100'}>
							<div className={'floater-rght'}>
								<button
									type='button'
									className='btn btn-outline-primary margin-t-10'
									onClick={(e) => this.onCustomerSubmit(e)}
								>Save</button>
							</div>
						</div>
					</div>
				</div>
			)
		} else if (page == 1) {
			return <SalesEntryFormComponent
				questions={questions}
				questionValues={questionValues}
				categories={categories}
			/>
		} else if (page == 2) {
			return <SalesEntryFormComponent
				questions={questions}
				questionValues={questionValues}
				categories={categories}
			/>
		} else  {
			return (
				<div>
					<CustomerEntryComponent customer={customer} customerHandler={this.setCustomerStateWithEvent}/>
					<ProductHeaderComponent productHeader={productHeader} phHandler={this.setProductStateWithEvent}/>
					<div className={'row'}>
						<div className={'width-100'}>
							<div className={'floater-rght'}>
								<button type='button' className='btn btn-outline-primary margin-t-10'>Save</button>
							</div>
						</div>
					</div>
				</div>
			)
		}
	}

	private static propKey(propertyName: string, value: any): object {
		return {[propertyName]: value};
	}

	private setCustomerStateWithEvent(event: any, columnType: string): void {
		const val = (event.target as any).value;
		this.setState( (prevState) => ({
			customer: {
				...prevState.customer,
				[columnType]: val
			}
		}));
	}

	private setProductStateWithEvent(event: any, columnType: string): void {
		const val = (event.target as any).value;
		this.setState( (prevState) => ({
			productHeader: {
				...prevState.productHeader,
				[columnType]: val
			}
		}));
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

export const newSalesEntryPage = withAuthorization(authCondition, defaultRouteRedirect)(NewSalesEntryComponent);
