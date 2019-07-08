import React from 'react';
import {Categories} from '../../Enums/Category';
import {withAuthorization} from '../../Firebase/withAuthorization';
import {TopValidation} from '../../Validation/TopValidation';
import {CustomerEntryComponent} from '../Customer';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import '../../styles/general.css';
import '../../styles/error.css';
import {
	Cabinet,
	Doors,
	Drawers,
	Legs, MeasurementDetails,
	PriceMatrix,
	PricingComponent,
	ProductDetails,
	SalesEntryState,
	Tops
} from '../../State';
import {ProductHeaderComponent} from '../ProductHeaderInfo';
import {CustomerValidation} from '../../Validation/CustomerValidation';
import {ProductHeaderValidation} from '../../Validation/ProductHeaderValidation';
import {ProductComponent, ProductDetailsMapper} from '../../Structure/types';
import {Mapper} from '../../Mapper/Mapper';
import {CabinetValidation} from '../../Validation/CabinetValidation';
import {TypeGuards} from "../../Enums/TypeGuards";
import {newSalesEntryContext} from '../../Context/NewSalesEntryContext';
import {SalesEntryFormComponent} from "../SalesEntryForm";
import {DrawerValidation} from "../../Validation/DrawerValidation";
import {DoorsValidation} from "../../Validation/DoorsValidation";
import {LegsErrorShortNamesMapping} from "../../Enums/InterfaceErrorMapping";
import {LegsValidation} from "../../Validation/LegsValidation";
import {RolloutDrawerValidation} from "../../Validation/RolloutDrawerValidation";
import {SalesEntrySidebarComponent} from "../SalesEntrySidebar";

const rp = require('request-promise');

interface IProps {
	email?: string;
	error?: any;
	history?: any;
	password?: string;
	height?: string;
	productId?: number;
	context?: any;
}

class NewSalesEntryComponent extends React.Component<IProps, SalesEntryState> {
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
		productHeaderErrors: {e_reference_number: ''},
		cabinetErrors: {type: TypeGuards.CABINET_VALIDATION_ERROR, e_paint_color: '', e_stain_color: '', e_length: '', e_width: '', e_height: '', e_quantity: ''},
		cabinetTwoErrors: {type: TypeGuards.CABINET_VALIDATION_ERROR_2, e_paint_color: '', e_stain_color: '', e_length: '', e_width: '', e_height: ''},
		cabinetThreeErrors: {type: TypeGuards.CABINET_VALIDATION_ERROR_3, e_paint_color: '', e_stain_color: '', e_length: '', e_width: '', e_height: ''},
		cabinetFourErrors: {type: TypeGuards.CABINET_VALIDATION_ERROR_4, e_paint_color: '', e_stain_color: '', e_length: '', e_width: '', e_height: ''},
		topErrors: {type: TypeGuards.TOP_VALIDATION_ERROR, e_length: '', e_width: '', e_quantity: ''},
		topTwoErrors: {type: TypeGuards.TOP_VALIDATION_ERROR_2, e_length: '', e_width: '', e_quantity: ''},
		drawerErrors: {type: TypeGuards.DRAWERS_VALIDATION_ERROR, e_length: '', e_width: '', e_height: '', e_quantity: ''},
		drawerTwoErrors: {type: TypeGuards.DRAWERS_VALIDATION_ERROR, e_length: '', e_width: '', e_height: ''},
		drawerThreeErrors: {type: TypeGuards.DRAWERS_VALIDATION_ERROR, e_length: '', e_width: '', e_height: ''},
		drawerFourErrors: {type: TypeGuards.DRAWERS_VALIDATION_ERROR, e_length: '', e_width: '', e_height: ''},
		doorErrors: {type: TypeGuards.DOORS_VALIDATION_ERROR, e_length: '', e_width: '', e_quantity: ''},
		doorTwoErrors: {type: TypeGuards.DOORS_VALIDATION_ERROR_2, e_length: '', e_width: ''},
		doorThreeErrors: {type: TypeGuards.DOORS_VALIDATION_ERROR_3, e_length: '', e_width: ''},
		doorFourErrors: {type: TypeGuards.DOORS_VALIDATION_ERROR_4, e_length: '', e_width: ''},
		doorFiveErrors: {type: TypeGuards.DOORS_VALIDATION_ERROR_5, e_length: '', e_width: ''},
		doorSixErrors: {type: TypeGuards.DOORS_VALIDATION_ERROR_6, e_length: '', e_width: ''},
		doorSevenErrors: {type: TypeGuards.DOORS_VALIDATION_ERROR_7, e_length: '', e_width: ''},
		doorEightErrors: {type: TypeGuards.DOORS_VALIDATION_ERROR_8, e_length: '', e_width: ''},
		legErrors: {type: TypeGuards.LEGS_VALIDATION_ERROR, e_length: '', e_width: '', e_height: '', e_quantity: ''},
		legTwoErrors: {type: TypeGuards.LEGS_VALIDATION_ERROR_2, e_length: '', e_width: '', e_height: ''},
		legThreeErrors: {type: TypeGuards.LEGS_VALIDATION_ERROR_3, e_length: '', e_width: '', e_height: ''},
		legFourErrors: {type: TypeGuards.LEGS_VALIDATION_ERROR_4, e_length: '', e_width: '', e_height: ''},
		legFiveErrors: {type: TypeGuards.LEGS_VALIDATION_ERROR_5, e_length: '', e_width: '', e_height: ''},
		rolloutDrawerErrors: {type: TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR, e_length: '', e_width: '', e_height: '', e_quantity: ''},
		rolloutDrawerTwoErrors: {type: TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_2, e_length: '', e_width: '', e_height: ''},
		rolloutDrawerThreeErrors: {type: TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_3, e_length: '', e_width: '', e_height: ''},
		rolloutDrawerFourErrors: {type: TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_4, e_length: '', e_width: '', e_height: ''},
		rolloutDrawerFiveErrors: {type: TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_5, e_length: '', e_width: '', e_height: ''},
		rolloutDrawerSixErrors: {type: TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_6, e_length: '', e_width: '', e_height: ''},
		cabinet: {type: TypeGuards.CABINET}
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
		this.constructPrice = this.constructPrice.bind(this);
		this.constructComponent = this.constructComponent.bind(this);
		// Mapper.mapProductComponent = Mapper.mapProductComponent.bind(this);
		this.state = {...NewSalesEntryComponent.INITIAL_STATE};
	}

	public componentDidMount = () => {
		this.buildData();
		const primaryNavBarHeight =  window.getComputedStyle(document.getElementById('primary-navbar'), null).getPropertyValue('height');
		const hdrHeight =  window.getComputedStyle(document.getElementById('sales-entry-hdr'), null).getPropertyValue('height');
		this.setState({containerHeight: `(${primaryNavBarHeight} + ${hdrHeight})`, navbarHeight: primaryNavBarHeight});
	};

	private async buildData() {
		const isExistingEntry = (window.location.search !== null && window.location.search !== undefined && window.location.search.length > 0);
		let salesEntryId: number = null;
		if (isExistingEntry) {
			salesEntryId = Number.parseInt(window.location.search.slice(1));

			const myURL = process.env.REACT_APP_BASE_API_URL + 'product/relationship/all/' + salesEntryId;
			await this.getWRFServerData(myURL).then((d) => {
					const parsedD = JSON.parse(d);
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
								updated_by: parsedD.phs[0].updated_by
							},
							customer: parsedD.phs[0].customer,
							productDetails: parsedD.phs[0].product_details
						});
					}
				}
			);
		}

		const priceURL = process.env.REACT_APP_BASE_API_URL + 'pricing';
		await this.getWRFServerData(priceURL).then((d) => {
			const parsedD = JSON.parse(d);
			this.setState({prices: parsedD});
			if (parsedD) {
				console.log(this.state.prices);
				// build / map prices here for sidebar component
			}
		});

		const questionUrl = process.env.REACT_APP_BASE_API_URL + 'question';
		await this.getWRFServerData(questionUrl).then((d) => {
			const parsedD = JSON.parse(d);
			this.setState({questions: parsedD});
			if (parsedD) {
				const pds: ProductDetails[] = [];
				parsedD.forEach((e: any) => {
					if (isExistingEntry) {
						const response_exists = this.state.productDetails.filter((pd: ProductDetails) => pd.q_fk === e.q_id);
						if (response_exists.length > 0) {
							pds.push(response_exists[0]);
						} else {
							pds.push({ph_fk: this.state.productHeader.ph_id, q_fk: e.q_id, cat_fk: e.cat_fk, created_by: this.props.email, updated_by: this.props.email});
						}
					} else {
						pds.push({q_fk: e.q_id, cat_fk: e.cat_fk, created_by: this.props.email, updated_by: this.props.email});
					}
				});
				this.setState({productDetails: pds});
			}
		});

		const catUrl = process.env.REACT_APP_BASE_API_URL + 'category/';
		await this.getWRFServerData(catUrl).then((d) => {
				const parsedD = JSON.parse(d);
				if (parsedD) {
					this.setState({categories: parsedD});
				}
			}
		);

		// build price component data
		this.setState({ componentPrice: new Map<string, PricingComponent>()});
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
		this.post_options.uri = process.env.REACT_APP_BASE_API_URL + endpoint;
		this.post_options.method = put ? 'PUT' : 'POST';
		return rp(this.post_options)
			.then((parsedBody: any) => {
				return parsedBody;
			})
			.catch((err: any) => {
				return err;
			});
	}

	public render() {
		console.log('rendererererere');
		const {containerHeight, navbarHeight} = this.state;
		const rowStyle = {
			height: `calc(100% - ${containerHeight})`
		};
		const containerStyle = {
			height: `calc(100% - ${navbarHeight})`
		};
		return (
			<newSalesEntryContext.Provider value={this.state}>
				<div className={'bg-light height-100'} style={containerStyle}>
					<div className={'container'}>
						<div className={'py-5 text-center'} id={'sales-entry-hdr'}>
							<h2>Sales Entry</h2>
						</div>
						<div className={'row'} style={rowStyle}>
							<div className={'col-md-4 order-md-2 mb-4'}>
								<newSalesEntryContext.Consumer>
									{context => (<SalesEntrySidebarComponent context={context}/>)}
								</newSalesEntryContext.Consumer>
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
			</newSalesEntryContext.Provider>
		);
	}

	private renderButtons() {
		const {page} = this.state;
		if (page === 0) {
			return <button
				type='button'
				className='btn btn-outline-primary margin-t-10'
				disabled={this.state.productHeader.ph_id === null || this.state.productHeader.ph_id === undefined}
				onClick={(e) => {this.setState({page: 1}); }}>Next - Product Details</button>;
		}
		if (page === 1) {
			return (
				<div>
					<button
						type='button'
						className='btn btn-outline-primary margin-t-10'
						onClick={(e) => { this.setState({page: 0}); }}>Back - Primary Information</button>
				</div>
			);
		}
	}

	public onProductDetailsSubmit = (event: any, validate: boolean) => {
		console.log(this.state.componentPrice);
		const {productDetails, questions} = this.state;

		const pdsToUpdate = productDetails.filter((pd: ProductDetails) => {
			return (pd.response !== null && pd.response !== undefined);
		});

		pdsToUpdate.map((pd: ProductDetails) => {
			if (!pd.created_by) {
				pd.created_by = this.props.email;
			}
			pd.updated_by = this.props.email;
		});

		const fresh_top: Tops = {type: TypeGuards.TOPS};
		const fresh_drawer: Drawers = {type: TypeGuards.DRAWERS};
		const fresh_door: Doors = {type: TypeGuards.DOORS};
		const fresh_leg: Legs = {type: TypeGuards.LEGS};
		const fresh_ro_drawers: Legs = {type: TypeGuards.ROLLOUT_DRAWERS};

		const cab_details: ProductDetailsMapper = Mapper.unionQuestionsDetails(productDetails, questions, Categories.CABINETS);
		const top_details: ProductDetailsMapper = Mapper.unionQuestionsDetails(productDetails, questions, Categories.TOP);
		const dwr_details: ProductDetailsMapper = Mapper.unionQuestionsDetails(productDetails, questions, Categories.DRAWERS);
		const dr_details: ProductDetailsMapper = Mapper.unionQuestionsDetails(productDetails, questions, Categories.DOORS);
		const legs_details: ProductDetailsMapper = Mapper.unionQuestionsDetails(productDetails, questions, Categories.LEGS);
		const rodwr_details: ProductDetailsMapper = Mapper.unionQuestionsDetails(productDetails, questions, Categories.ROLLOUT_DRAWERS);

		const cm: ProductComponent = Mapper.mapProductComponent(cab_details, this.state.cabinet);
		const tm: ProductComponent = Mapper.mapProductComponent(top_details, fresh_top);
		const dwm: ProductComponent = Mapper.mapProductComponent(dwr_details, fresh_drawer);
		const dr: ProductComponent = Mapper.mapProductComponent(dr_details, fresh_door);
		const leg: ProductComponent = Mapper.mapProductComponent(legs_details, fresh_leg);
		const rodwr: ProductComponent = Mapper.mapProductComponent(rodwr_details, fresh_ro_drawers);

		// validate components:
		const cv: CabinetValidation = new CabinetValidation(cm, tm);
		const tv: TopValidation = new TopValidation(cm, tm);
		const dwrv: DrawerValidation = new DrawerValidation(dwm);
		const drv: DoorsValidation = new DoorsValidation(dr);
		const legv: LegsValidation = new LegsValidation(leg);
		const rodwrv: RolloutDrawerValidation = new RolloutDrawerValidation(rodwr);

		// have to run validation first, so that errors get set if needed
		const cab_validate = cv.validate();
		const top_validate = tv.validate();
		const dwr_validate = dwrv.validate();
		const drv_validate = drv.validate();
		const legv_validate = legv.validate();
		const rodwrv_validate = rodwrv.validate();

		if (cab_validate && top_validate && dwr_validate && drv_validate && legv_validate && rodwrv_validate) {
			this.postWRFServerData(Array.from(pdsToUpdate), 'product/details', true)
				.then((newPDs: any) => {
					const updatedPDs: ProductDetails[] = newPDs.details;
					const {productDetails: pds} = this.state;
					updatedPDs.forEach((upd: ProductDetails) => {
						let idx = -1;
						pds.some((pd: ProductDetails, internal_i: number) => {
							if (pd.pd_id === upd.pd_id || pd.q_fk === upd.q_fk) {
								idx = internal_i;
								return true;
							}
							return false;
						});
						pds[idx].pd_id = upd.pd_id;
						pds[idx].updated_on = upd.updated_on;
						pds[idx].response = upd.response;
					});
					this.setState({productDetails: pds});
				})
				.catch((e) => {
					console.log(e);
					console.log('DONE - Error');
				});
		}

		this.setState({
			cabinetErrors: {...cv.getSpecificError(0)},
			cabinetTwoErrors: {...cv.getSpecificError(1)},
			cabinetThreeErrors: {...cv.getSpecificError(2)},
			cabinetFourErrors: {...cv.getSpecificError(3)},
			topErrors: {...tv.getSpecificError(0)},
			topTwoErrors: {...tv.getSpecificError(1)},
			drawerErrors: {...dwrv.getSpecificError(0)},
			drawerTwoErrors: {...dwrv.getSpecificError(1)},
			drawerThreeErrors: {...dwrv.getSpecificError(2)},
			drawerFourErrors: {...dwrv.getSpecificError(3)},
			doorErrors: {...drv.getSpecificError(0)},
			doorTwoErrors: {...drv.getSpecificError(1)},
			doorThreeErrors: {...drv.getSpecificError(2)},
			doorFourErrors: {...drv.getSpecificError(3)},
			doorFiveErrors: {...drv.getSpecificError(4)},
			doorSixErrors: {...drv.getSpecificError(5)},
			doorSevenErrors: {...drv.getSpecificError(6)},
			doorEightErrors: {...drv.getSpecificError(7)},
			legErrors: {...legv.getSpecificError(0)},
			legTwoErrors: {...legv.getSpecificError(1)},
			legThreeErrors: {...legv.getSpecificError(2)},
			legFourErrors: {...legv.getSpecificError(3)},
			legFiveErrors: {...legv.getSpecificError(4)},
			rolloutDrawerErrors: {...rodwrv.getSpecificError(0)},
			rolloutDrawerTwoErrors: {...rodwrv.getSpecificError(1)},
			rolloutDrawerThreeErrors: {...rodwrv.getSpecificError(2)},
			rolloutDrawerFourErrors: {...rodwrv.getSpecificError(3)},
			rolloutDrawerFiveErrors: {...rodwrv.getSpecificError(4)},
			rolloutDrawerSixErrors: {...rodwrv.getSpecificError(5)}
		});

		event.preventDefault();
	};

	public onCustomerSubmit = (event: any) => {
		const {productHeader, customer} = this.state;
		console.log({...productHeader, customer});
		const isNewProduct = !productHeader.ph_id;

		if (!productHeader.created_by) {
			productHeader.created_by = this.props.email;
		}
		if (!customer.created_by) {
			customer.created_by = this.props.email;
		}

		productHeader.updated_by = this.props.email;
		customer.updated_by = this.props.email;
		// validate customer:
		const cv: CustomerValidation = new CustomerValidation(this.state.customer);
		const phv: ProductHeaderValidation = new ProductHeaderValidation(this.state.productHeader);
		const cv_validate = cv.validate();
		const phv_validate = phv.validate();

		if (cv_validate && phv_validate) {
			this.postWRFServerData({...productHeader, customer}, 'product', false)
				.then((productStuff: any) => {
					const ph_id = productStuff.newProduct.ph_id;
					const pds: ProductDetails[] = this.state.productDetails;
					if (isNewProduct) {
						pds.map((e: ProductDetails) => {
							e.ph_fk = ph_id;
						});
					}
					this.setState({
						productHeader: {...productStuff.newProduct},
						customer: {...productStuff.newProduct.customer},
						productDetails: pds}
						);
					console.log({...productStuff.newProduct.customer});
				})
				.catch((e) => {
					console.log(e);
					console.log('DONE - Error');
				});
		}

		this.setState({customerErrors: {...cv.getErrors()}, productHeaderErrors: {...phv.getErrors()}});

		event.preventDefault();
	}

	private renderPage() {
		const {page,
			customer,
			customerErrors,
			productHeader,
			productHeaderErrors} = this.state;
		if (page === 0) {
			return (
				<div>
					<CustomerEntryComponent customer={customer} customerErrors={customerErrors} customerHandler={this.setCustomerStateWithEvent}/>
					<ProductHeaderComponent productHeader={productHeader} productHeaderErrors={productHeaderErrors} phHandler={this.setProductStateWithEvent}/>
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
			);
		} else if (page === 1) {
			return (<SalesEntryFormComponent submitHandler={this.onProductDetailsSubmit} priceConstructor={this.constructPrice} cabinetConstructor={this.constructComponent}/>);
		} else if (page === 2) {
			return (<SalesEntryFormComponent submitHandler={this.onProductDetailsSubmit} priceConstructor={this.constructPrice} cabinetConstructor={this.constructComponent}/>);
		} else  {
			return (
				<div>
					<CustomerEntryComponent customer={customer} customerErrors={customerErrors} customerHandler={this.setCustomerStateWithEvent}/>
					<ProductHeaderComponent productHeader={productHeader} productHeaderErrors={productHeaderErrors} phHandler={this.setProductStateWithEvent}/>
					<div className={'row'}>
						<div className={'width-100'}>
							<div className={'floater-rght'}>
								<button type='button' className='btn btn-outline-primary margin-t-10'>Save</button>
							</div>
						</div>
					</div>
				</div>
			);
		}
	}

	private static propKey(propertyName: string, value: any): object {
		return {[propertyName]: value};
	}

	private setCustomerStateWithEvent(event: any, columnType: string): void {
		const val = (event.target as any).value;
		this.setState((prevState) => ({
			customer: {
				...prevState.customer,
				[columnType]: val
			}
		}));
		console.log(this.state.customer);
	}

	private setProductStateWithEvent(event: any, columnType: string): void {
		const val = (event.target as any).value;
		this.setState((prevState) => ({
			productHeader: {
				...prevState.productHeader,
				[columnType]: val
			}
		}));
	}

	// sets state with new cabinet
	private constructComponent(): void {
		const cab_details: ProductDetailsMapper = Mapper.unionQuestionsDetails(this.state.productDetails, this.state.questions, Categories.CABINETS);
		const cm: ProductComponent = Mapper.mapProductComponent(cab_details, this.state.cabinet);
		console.log(cm);
		this.setState({cabinet: cm});
	}

	// value corresponds to dropdown values.. which is the only reason we need it
	private constructPrice(value: any, propName: string, productDetail: ProductDetails) {

		console.log(propName);
		console.log(productDetail);
		let currPriceComponent: PricingComponent = {};
		let priceKey: string = '';
		let myNewValue: PriceMatrix;

		switch (true) {
			case propName.startsWith('cab_size'):
				myNewValue = this.state.prices.filter((p: PriceMatrix) => p.short_name === value)[0];
				priceKey = 'cabinet_size';
				if(this.state.componentPrice.has(priceKey)) {
					currPriceComponent = this.state.componentPrice.get(priceKey);
				}

				currPriceComponent.id = currPriceComponent.id || null;
				currPriceComponent.pd_id = productDetail.pd_id;
				currPriceComponent.actual_price = myNewValue.sell_price;
				currPriceComponent.custom_price = myNewValue.sell_price;
				break;
			case propName.startsWith('cab_quantity'):
			case propName.startsWith('cab_lngth'):
			case propName.startsWith('cab_wdth'):
			case propName.startsWith('cab_height'):
				// multi cabs is an ad hoc calculation, there likely won't be an entry in the price matrix?
				// maybe there should be... but for now, there isn't one since we will be saving the
				// calculated price in the db itself
				myNewValue = this.state.prices.filter((p: PriceMatrix) => p.short_name === 'cab_length_option')[0];
				priceKey = 'cabinet_size';
				if(this.state.componentPrice.has(priceKey)) {
					currPriceComponent = this.state.componentPrice.get(priceKey);
				}

				if (Number(this.state.cabinet.quantity) > 1) {
					currPriceComponent.id = currPriceComponent.id || null;
					currPriceComponent.pd_id = currPriceComponent.pd_id || productDetail.pd_id;
					let price: number = 0.00;

					this.state.cabinet.measurement.forEach((m: MeasurementDetails) => {
						if (m.length !== undefined && m.width !== undefined) {
							const temp_w: number = Number(m.width);
							const temp_l: number = Number(m.length);

							price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price));
						}
					});
					currPriceComponent.actual_price = price;
					currPriceComponent.custom_price = price;
				}
				break;
		}

		if (currPriceComponent.pd_id !== undefined && currPriceComponent.pd_id !== null) {
			this.state.componentPrice.set(priceKey, currPriceComponent);
			// force re-render
			this.setState({componentPrice: this.state.componentPrice});
		}
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

NewSalesEntryComponent.contextType = newSalesEntryContext;

export const newSalesEntryPage = withAuthorization(authCondition, defaultRouteRedirect)(NewSalesEntryComponent);
