import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {auth, db} from '../../Firebase';
import {withAuthorization} from '../../Firebase/withAuthorization';
import {CustomerEntryComponent} from '../Customer';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import '../../styles/general.css';
import '../../styles/error.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faLongArrowAltDown, faLongArrowAltUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {
	Customer,
	CustomerValidationError,
	ProductDetails,
	ProductHeader,
	Questions,
	QuestionValues,
	Roles
} from '../../State';
import {SalesEntryFormComponent} from "../SalesEntryForm";
import {CustomerEntry} from "../Customer/CustomerEntry";
import {ProductHeaderComponent} from "../ProductHeaderInfo";
import {authUserContext} from "../../Firebase/AuthUserContext";
import {array} from "prop-types";
import {CustomerValidation} from "../../Validation/CustomerValidation";

const rp = require('request-promise');

const baseURL = 'https://wrf-center.com/api/';
const devBaseURL = 'http://localhost:8080/';

interface IProps {
	email?: string;
	error?: any;
	history?: any;
	password?: string;
	height?: string;
	productId?: number;
	context?: any;
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
	customerErrors?: CustomerValidationError;
	productHeader?: ProductHeader;
	productDetails?: ProductDetails[];
	questions?: Questions[];
	categories?: any;
	secondary_categories?: any;
	productId?: number;
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
		customer: {primary_email: '', name: '', phone_number: '', shipping_address: ''},
		customerErrors: {e_primary_email: '', e_name: '', e_phone_number: '', e_shipping_address: ''},
		productHeader: {notes: '', reference_number: '', group_id: 0, order_num: 0, status: 'Started', crafting_required: false},
	};

	private post_options = {
		method: 'POST',
		uri: '',
		body: {
			some: 'payload'
		},
		json: true // Automatically stringifies the body to JSON
	};

	constructor(props: any) {
		super(props);

		this.setCustomerStateWithEvent = this.setCustomerStateWithEvent.bind(this);
		this.setProductStateWithEvent = this.setProductStateWithEvent.bind(this);
		this.onProductDetailsSubmit = this.onProductDetailsSubmit.bind(this);
		this.state = {...NewSalesEntryComponent.INITIAL_STATE};
	}

	public componentDidMount() {
		this.buildData();
		const primaryNavBarHeight =  window.getComputedStyle(document.getElementById('primary-navbar'), null).getPropertyValue("height");
		const hdrHeight =  window.getComputedStyle(document.getElementById('sales-entry-hdr'), null).getPropertyValue("height");
		this.setState({containerHeight: `(${primaryNavBarHeight} + ${hdrHeight})`, navbarHeight: primaryNavBarHeight})
	}

	private async buildData() {
		const isExistingEntry = (window.location.search !== null && window.location.search !== undefined && window.location.search.length > 0);
		let salesEntryId: number = null;
		if (isExistingEntry) {
			salesEntryId = Number.parseInt(window.location.search.slice(1));

			const myURL = baseURL + 'product/relationship/all/' + salesEntryId;
			await this.getWRFServerData(myURL).then(d => {
					const parsedD = JSON.parse(d);
					console.log(parsedD.phs[0]);
					if (parsedD) {
						this.setState({
							productHeader: {
								ph_id: parsedD.phs[0].ph_id,
								group_id: parsedD.phs[0].group_id,
								order_num: parsedD.phs[0].order_num,
								notes: parsedD.phs[0].notes,
								reference_number: parsedD.phs[0].reference_number,
								crafting_required: parsedD.phs[0].crafting_required,
								status: parsedD.phs[0].status,
								created_on: parsedD.phs[0].created_on,
								created_by: parsedD.phs[0].created_by,
								updated_on: parsedD.phs[0].updated_on,
								updated_by: parsedD.phs[0].updated_by,
							},
							customer: parsedD.phs[0].customer,
							productDetails: parsedD.phs[0].product_details
						});
					}
				}
			);
		}

		const questionUrl = baseURL + 'question';
		await this.getWRFServerData(questionUrl).then(d => {
			const parsedD = JSON.parse(d);
			this.setState({questions: parsedD});
			if (parsedD) {
				let pds: ProductDetails[] = [];
				parsedD.forEach((e: any) => {
					if (isExistingEntry) {
						let response_exists = this.state.productDetails.filter((pd: ProductDetails) => pd.q_fk === e.q_id);
						if (response_exists.length > 0) {
							pds.push(response_exists[0]);
						} else {
							pds.push({ph_fk: this.state.productHeader.ph_id, q_fk: e.q_id, cat_fk: e.cat_fk, created_by: this.props.email, updated_by: this.props.email})
						}
					} else {
						pds.push({q_fk: e.q_id, cat_fk: e.cat_fk, created_by: this.props.email, updated_by: this.props.email})
					}
				});
				this.setState({productDetails: pds});
			}
		});

		const catUrl = baseURL + 'category/';
		await this.getWRFServerData(catUrl).then(d => {
				const parsedD = JSON.parse(d);
				if (parsedD) {
					this.setState({categories: parsedD});
				}
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
	};

	public postWRFServerData(body: any, endpoint: string, put: boolean): Promise<any> {
		this.post_options.body = body;
		this.post_options.uri = baseURL + endpoint;
		this.post_options.method = put ? 'PUT' : 'POST';
		return rp(this.post_options)
			.then(function (parsedBody: any) {
				return parsedBody;
			})
			.catch(function (err: any) {
				return err;
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
				disabled={this.state.productHeader.ph_id === null || this.state.productHeader.ph_id === undefined}
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

	public onProductDetailsSubmit = (event: any, validate: boolean) => {
		const {productDetails} = this.state;

		let pdsToUpdate = productDetails.filter((pd: ProductDetails) => {
			return (pd.response !== null && pd.response !== undefined);
		});

		pdsToUpdate.map((pd: ProductDetails) => {
			if(!pd.created_by) {
				pd.created_by = this.props.email;
			}
			pd.updated_by = this.props.email;
		});
		this.postWRFServerData(Array.from(pdsToUpdate), 'product/details', true)
			.then((newPDs: any)=>{
				const updatedPDs: ProductDetails[] = newPDs.details;
				let {productDetails} = this.state;
				updatedPDs.forEach((upd: ProductDetails) => {
					let idx = -1;
					productDetails.some((pd: ProductDetails, internal_i: number) => {
						if (pd.pd_id == upd.pd_id || pd.q_fk == upd.q_fk) {
							idx = internal_i;
							return true;
						}
						return false;
					});
					productDetails[idx].updated_on = upd.updated_on;
					productDetails[idx].response = upd.response;
				});
				this.setState({productDetails: productDetails});
			})
			.catch((e) => {
				console.log(e);
				console.log('DONE - Error');
			});

		event.preventDefault();
	};

	public onCustomerSubmit = (event: any) => {
		const {productHeader, customer} = this.state;
		const isNewProduct = !productHeader.ph_id;

		if(!productHeader.created_by) {
			productHeader.created_by = this.props.email;
		}
		if(!customer.created_by) {
			customer.created_by = this.props.email;
		}

		productHeader.updated_by = this.props.email;
		customer.updated_by = this.props.email;
		//validate customer:
		let cv: CustomerValidation = new CustomerValidation(this.state.customer);
		if (cv.validate()) {
			this.setState({customerErrors: {...cv.getErrors()}});
			this.postWRFServerData({...productHeader, customer}, 'product', false)
				.then((productStuff: any)=>{
					const ph_id = productStuff.newProduct.ph_id;
					let pds: ProductDetails[] = this.state.productDetails;
					if(isNewProduct) {
						pds.map((e: ProductDetails) => {
							e.ph_fk = ph_id
						});
					}
					this.setState({productHeader: {...productStuff.newProduct}, customer: {...productStuff.newProduct.customer}, productDetails: pds});
					console.log(this.state.productDetails);
				})
				.catch((e) => {
					console.log(e);
					console.log('DONE - Error');
				});
		} else {
			this.setState({customerErrors: {...cv.getErrors()}});
		}
		event.preventDefault();
	};

	private renderPage() {
		const {page, customer, customerErrors, productHeader, questions, categories, productDetails} = this.state;
		if (page == 0) {
			return (
				<div>
					<CustomerEntryComponent customer={customer} customerErrors={customerErrors} customerHandler={this.setCustomerStateWithEvent}/>
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
				categories={categories}
				productDetails={productDetails}
				submitHandler={this.onProductDetailsSubmit}
			/>
		} else if (page == 2) {
			return <SalesEntryFormComponent
				questions={questions}
				categories={categories}
				productDetails={productDetails}
				submitHandler={this.onProductDetailsSubmit}
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
	// console.log('AUTH CONDITION');
	// console.log(authUser);
	// console.log(authUser.roles);
	// console.log(ROLES.ADMIN);
	// console.log(authUser.roles[ROLES.ADMIN]);
	return authUser && !!authUser.roles[ROLES.ADMIN] || !!authUser.roles[ROLES.SALES];
};

const defaultRouteRedirect = (authUser: any) => {
	// console.log('DEFAULT REDIRECT - ADMIN INDEX');
	// console.log(authUser);
	// console.log(authUser.roles);
	// console.log(ROLES.ADMIN);
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
