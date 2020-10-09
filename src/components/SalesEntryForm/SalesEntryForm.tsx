import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {ProductDetails, Questions, SalesEntryState} from '../../State';
import {ErrorWrapper} from "../ErrorWrapper/ErrorWrapper";
import {Mapper} from "../../Mapper/Mapper";
import {Categories} from "../../Enums/Category";
import {QuestionsUtility, SubHeaderQuantity} from "../../Utility/QuestionsUtility";
import {MAX_CABS, MAX_DOORS, MAX_DRAWERS, MAX_LEGS, MAX_RO_DRAWERS, MAX_TOPS} from "../../constants/ProductDetails";
import Select from 'react-select';
import {
	CABINET_OPTIONS,
	CUTLERY_OPTIONS, HARDWARE_OPTIONS,
	KNIFE_BLOCK_OPTIONS, PAINT_OPTIONS,
	PULLOUT_TRASH_OPTIONS,
	SPICE_RACK_OPTIONS, SUB_MEASUREMENTS, TOP_OPTIONS,
	UTENSIL_OPTIONS, WINE_RACK_OPTIONS
} from "../../constants/ProductOptions";
import {
	CABINET_QUANTITY,
	DOOR_QUANTITY,
	DRAWER_QUANTITY, LEGS_QUANTITY,
	ROLLOUT_DRAWER_QUANTITY, TOP_QUANTITY
} from "../../constants/QuantityDropdownLabelValue";

interface InterfaceProps {
	category_id?: number;
	category_title?: string;
	context: SalesEntryState;
	priceConstructor: any;
	cabinetConstructor: any;
}

interface IState {
	doesContainShow?: boolean;
	productDetails?: ProductDetails[];
	currentQuestionIdx?: number;
}

export class SalesEntryForm extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			doesContainShow: false,
			currentQuestionIdx: 0,
			productDetails: this.props.context.productDetails
		};
	}

	private handleAccordionToggleClick(e: any, aId: string) {
		const el = document.getElementById(aId);
		el.classList.toggle('show');
		if (el && el.classList.contains('show')) {
			this.setState({doesContainShow: true});
		} else {
			this.setState({doesContainShow: false});
		}
	}

	componentDidMount(): void {
		const currCategory = this.props.context.categories.filter((f: any) => {
			return f.category_id === this.props.category_id
		});
		const element = document.getElementById(`parent-question-${currCategory[0].category_id}`);
		if (element !== undefined && element !== null) {
			if (element.childElementCount > 1) {
				element.classList.add('sales-form-card-overflow-height-300');
			} else {
				element.classList.add('sales-form-card-overflow-height-auto');
			}
		}
		// TODO: Clean this mess up. Not ideal.
		if (currCategory[0].category_id === 4 || currCategory[0].category_id === 2) {
			console.log(this.props.context.questions);
			const cabQuantityQID = this.props.context.questions.filter((q: any) => {
				return q['short_name'] === 'cab_quantity';
			});
			const topQuantityQID = this.props.context.questions.filter((q: any) => {
				return q['short_name'] === 'top_quantity';
			});
			const drQuantityQID = this.props.context.questions.filter((q: any) => {
				return q['short_name'] === 'dr_quantity';
			});
			const legsQuantityQID = this.props.context.questions.filter((q: any) => {
				return q['short_name'] === 'legs_quantity';
			});
			const dwrQuantityQID = this.props.context.questions.filter((q: any) => {
				return q['short_name'] === 'dwr_quantity';
			});
			const rodwrQuantityQID = this.props.context.questions.filter((q: any) => {
				return q['short_name'] === 'rodwr_quantity';
			});
			const paintIsCustomQID = this.props.context.questions.filter((q: any) => {
				return q['short_name'] === 'pnt_isc';
			});

			const cabQuantity = this.props.context.productDetails.filter((pd: any) => {
				return pd['q_fk'] === cabQuantityQID[0]['q_id'];
			});
			const topQuantity = this.props.context.productDetails.filter((pd: any) => {
				return pd['q_fk'] === topQuantityQID[0]['q_id'];
			});
			const drQuantity = this.props.context.productDetails.filter((pd: any) => {
				return pd['q_fk'] === drQuantityQID[0]['q_id'];
			});
			const legsQuantity = this.props.context.productDetails.filter((pd: any) => {
				return pd['q_fk'] === legsQuantityQID[0]['q_id'];
			});
			const dwrQuantity = this.props.context.productDetails.filter((pd: any) => {
				return pd['q_fk'] === dwrQuantityQID[0]['q_id'];
			});
			const rodwrQuantity = this.props.context.productDetails.filter((pd: any) => {
				return pd['q_fk'] === rodwrQuantityQID[0]['q_id'];
			});
			const paintIsCustom = this.props.context.productDetails.filter((pd: any) => {
				return pd['q_fk'] === paintIsCustomQID[0]['q_id'];
			});

			this.showExtraRows('cab_quantity', cabQuantity[0]['response']);
			this.showExtraRows('top_quantity', topQuantity[0]['response']);
			this.showExtraRows('dr_quantity', drQuantity[0]['response']);
			this.showExtraRows('legs_quantity', legsQuantity[0]['response']);
			this.showExtraRows('dwr_quantity', dwrQuantity[0]['response']);
			this.showExtraRows('rodwr_quantity', rodwrQuantity[0]['response']);
			this.showExtraRows('pnt_isc', paintIsCustom[0]['response']);
		}
	}

	shouldComponentUpdate(nextProps: InterfaceProps, nextState: IState) {
		let didToggle = this.state.doesContainShow !== nextState.doesContainShow;

		const shouldRerender: boolean = !didToggle;
		return shouldRerender;
	}

	private createNewRow(questions: any, id: string) {
		if (id.trim().length > 0) {
			const subHeader: SubHeaderQuantity = QuestionsUtility.determineQuantityQuestionSubHeader(id);
			return (
				<div className={'row'} id={id}>
					<div className={'col-lg-12'}><p className={'lead'}>{subHeader.title}</p></div>
					{questions}
				</div>
			);
		} else {
			return (
				<div className={'row'}>
					{questions}
				</div>
			);
		}
	}

	private buildHeader(category: string) {
		return (<h5>{category}</h5>);
	}

	private injectGroupingInput(question: any, classyMcClasserson: string) {
		const hardware_regex = new RegExp('hrdwr_');
		const paint_color_regex = new RegExp('pnt_clr');
		const length_regex = new RegExp('_lngth');
		const width_regex = new RegExp('_wdth');
		const height_regex = new RegExp('_height');
		let idx = -1;
		this.state.productDetails.some((pd: ProductDetails, internal_i: number) => {
			if (pd.q_fk === question.q_id) {
				idx = internal_i;
				return true;
			}
			return false;
		});
		if (question['datatype'] === 'boolean') {
			if (this.state.productDetails[idx].response == '0') {
				this.state.productDetails[idx].response = "";
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<input
						id={question['short_name']}
						checked={!!this.state.productDetails[idx].response}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						type='checkbox'
						placeholder={question['tooltip']}
						className='form-control'
					/>
					{this.attachError(Number(question['cat_fk']), question['short_name'])}
				</div>
			);
		} else if (question['short_name'] === 'cab_size') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				CABINET_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = CABINET_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={CABINET_OPTIONS}
					/>
				</div>
			);
		} else if (question['short_name'] === 'ftr_pot') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				PULLOUT_TRASH_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = PULLOUT_TRASH_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={PULLOUT_TRASH_OPTIONS}
					/>
				</div>
			);
		} else if (question['short_name'] === 'ftr_knf') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				KNIFE_BLOCK_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = KNIFE_BLOCK_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={KNIFE_BLOCK_OPTIONS}
					/>
				</div>
			);
		} else if (question['short_name'] === 'ftr_spr') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				SPICE_RACK_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = SPICE_RACK_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={SPICE_RACK_OPTIONS}
					/>
				</div>
			);
		} else if (question['short_name'] === 'ftr_utn') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				UTENSIL_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = UTENSIL_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={UTENSIL_OPTIONS}
					/>
				</div>
			);
		} else if (question['short_name'] === 'top_size') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				TOP_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = TOP_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={TOP_OPTIONS}
					/>
				</div>
			);
		} else if (question['short_name'] === 'ftr_wr') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				WINE_RACK_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = WINE_RACK_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={WINE_RACK_OPTIONS}
					/>
				</div>
			);
		} else if (question['short_name'] === 'ftr_cly') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				CUTLERY_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = CUTLERY_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={CUTLERY_OPTIONS}
					/>
				</div>
			);
		} else if (hardware_regex.test(question['short_name'])) {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				HARDWARE_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = HARDWARE_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={HARDWARE_OPTIONS}
					/>
				</div>
			);
		} else if (paint_color_regex.test(question['short_name'])) {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				PAINT_OPTIONS.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = PAINT_OPTIONS[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={PAINT_OPTIONS}
					/>
				</div>
			);
		} else if (question['short_name'] === 'cab_quantity') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				CABINET_QUANTITY.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = CABINET_QUANTITY[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={CABINET_QUANTITY}
					/>
				</div>
			);
		} else if (question['short_name'] === 'dr_quantity') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				DOOR_QUANTITY.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = DOOR_QUANTITY[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={DOOR_QUANTITY}
					/>
				</div>
			);
		} else if (question['short_name'] === 'dwr_quantity') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				DRAWER_QUANTITY.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = DRAWER_QUANTITY[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={DRAWER_QUANTITY}
					/>
				</div>
			);
		} else if (question['short_name'] === 'ro_dwr_quantity') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				ROLLOUT_DRAWER_QUANTITY.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = ROLLOUT_DRAWER_QUANTITY[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={ROLLOUT_DRAWER_QUANTITY}
					/>
				</div>
			);
		} else if (question['short_name'] === 'legs_quantity') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				LEGS_QUANTITY.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = LEGS_QUANTITY[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={LEGS_QUANTITY}
					/>
				</div>
			);
		} else if (question['short_name'] === 'top_quantity') {
			let value = {label: '', value: ''};
			if (String(this.state.productDetails[idx].response).length > 0) {
				TOP_QUANTITY.forEach((kvp: any, i: number) => {
					if (kvp.value === this.state.productDetails[idx].response) {
						value = TOP_QUANTITY[i];
					}
				});
			}
			return (
				<div className={classyMcClasserson}>
					<label htmlFor={question['short_name']}>{question['text']}</label>
					<Select
						value={value}
						onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
						options={TOP_QUANTITY}
					/>
				</div>
			);
		} else {
			if(length_regex.test(question['short_name']) || width_regex.test(question['short_name']) || height_regex.test(question['short_name'])) {
				let value = this.splitSubMeasurementValueForDisplay(this.state.productDetails[idx].response);
				let sub_value = {label: '', value: ''};
				if (String(this.state.productDetails[idx].response).length > 0 && this.state.productDetails[idx].response !== undefined) {
					const splitVal = this.state.productDetails[idx].response.split('.')[1];
					SUB_MEASUREMENTS.forEach((kvp: any, i: number) => {
						if (kvp.value === '.' + splitVal) {
							sub_value = SUB_MEASUREMENTS[i];
						}
					});
				}
				return (
					<div className={classyMcClasserson}>
						<label htmlFor={question['short_name']}>{question['text']}</label>
						<input
							id={question['short_name']}
							value={value}
							onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
							type='text'
							placeholder={question['tooltip']}
							className='form-control'
						/>
						<Select
							value={sub_value}
							onChange={(event: any) => this.setSubMeasurementValue(event, question['q_id'], question['short_name'], value)}
							options={SUB_MEASUREMENTS}
						/>
						{this.attachError(Number(question['cat_fk']), question['short_name'])}
					</div>
				);
			} else {
				return (
					<div className={classyMcClasserson}>
						<label htmlFor={question['short_name']}>{question['text']}</label>
						<input
							id={question['short_name']}
							value={this.state.productDetails[idx].response}
							onChange={(event: any) => this.setDynStateWithEvent(event, question['q_id'], question['short_name'])}
							type='text'
							placeholder={question['tooltip']}
							className='form-control'
						/>
						{this.attachError(Number(question['cat_fk']), question['short_name'])}
					</div>
				);
			}
		}
	}

	private attachError(category_id: number, short_name: string) {
		const second_regex = new RegExp('_2');
		const third_regex = new RegExp('_3');
		const fourth_regex = new RegExp('_4');
		const fifth_regex = new RegExp('_5');
		const sixth_regex = new RegExp('_6');
		const seventh_regex = new RegExp('_7');
		const eigth_regex = new RegExp('_8');
		switch (category_id) {
			case Categories.CABINETS:
				if (second_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.cabinetTwoErrors)} id={short_name}/>);
				} else if (third_regex.test(short_name)) {
				return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.cabinetThreeErrors)} id={short_name}/>);
				} else if (fourth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.cabinetFourErrors)} id={short_name}/>);
				} else {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.cabinetErrors)} id={short_name}/>);
				}
			case Categories.TOP:
				if (second_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.topTwoErrors)} id={short_name}/>);
				} else {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.topErrors)} id={short_name}/>);
				}
			case Categories.DRAWERS:
				if (second_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.drawerTwoErrors)} id={short_name}/>);
				} else if (third_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.drawerThreeErrors)} id={short_name}/>);
				} else if (fourth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.drawerFourErrors)} id={short_name}/>);
				} else {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.drawerErrors)} id={short_name}/>);
				}
			case Categories.ROLLOUT_DRAWERS:
				if (second_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.rolloutDrawerTwoErrors)} id={short_name}/>);
				} else if (third_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.rolloutDrawerThreeErrors)} id={short_name}/>);
				} else if (fourth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.rolloutDrawerFourErrors)} id={short_name}/>);
				} else if (fourth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.rolloutDrawerFiveErrors)} id={short_name}/>);
				} else if (fourth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.rolloutDrawerSixErrors)} id={short_name}/>);
				} else {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.rolloutDrawerErrors)} id={short_name}/>);
				}
			case Categories.DOORS:
				if (second_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.doorTwoErrors)} id={short_name}/>);
				} else if (third_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.doorThreeErrors)} id={short_name}/>);
				} else if (fourth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.doorFourErrors)} id={short_name}/>);
				} else if (fifth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.doorFiveErrors)} id={short_name}/>);
				} else if (sixth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.doorSixErrors)} id={short_name}/>);
				}  else if (seventh_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.doorSevenErrors)} id={short_name}/>);
				}  else if (eigth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.doorEightErrors)} id={short_name}/>);
				}  else {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.doorErrors)} id={short_name}/>);
				}
			case Categories.LEGS:
				if (second_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.legTwoErrors)} id={short_name}/>);
				} else if (third_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.legThreeErrors)} id={short_name}/>);
				} else if (fourth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.legFourErrors)} id={short_name}/>);
				} else if (fifth_regex.test(short_name)) {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.legFiveErrors)} id={short_name}/>);
				} else {
					return (<ErrorWrapper errorMessage={Mapper.mapErrorObject(short_name, this.props.context.legErrors)} id={short_name}/>);
				}
			default:
				return null;
		}
	}

	private recursivelyBuildQuestions(currCategory: any, groupedInputs?: any) {
		const minQsPerRow = 2;
		if (currCategory) {
			// for each category
			const groupedSubCatInputs = currCategory.map((sc: any) => {
				// - grab the questions that correspond to that category
				const filteredQs: any = this.props.context.questions.filter((filter: any) => filter.cat_fk === sc.category_id);

				// - construct a header
				const header = sc.category_hierarchy > 1 ? this.buildHeader(sc.category) : null;

				// unique groups will be built via the questions.grouping
				const uniqueGroups: number[] = Array.from(new Set(filteredQs.map((item: any) => item.grouping)));

				const divRowQuestionsByGrouping = uniqueGroups.map((groupNum: number) => {
					// for each unique grouping
					//  - get questions that are in the current grouping
					const groupFilteredQs: any = filteredQs.filter((filter: any) => filter.grouping === groupNum);

					const row_id: string = String(groupFilteredQs[0].unique_dim);
					const qsPerRow: number = groupFilteredQs.length > minQsPerRow ? groupFilteredQs.length : minQsPerRow;
					const classyClass = `col-md-${12 / qsPerRow} mb-3`;

					//  - construct the questions inputs
					const builtQuestions = groupFilteredQs.map((q: any) => {
						return this.injectGroupingInput(q, classyClass);
					});
					return (this.createNewRow(builtQuestions, row_id));
				});
				const subCats: any = this.props.context.categories.filter((filter: any) => filter.belongs_to === sc.category_id);
				if (subCats.length > 0) {
					return this.recursivelyBuildQuestions(subCats, divRowQuestionsByGrouping);
				} else {
					let concatInputs;
					if (groupedInputs !== undefined) {
						concatInputs = groupedInputs.concat(header, divRowQuestionsByGrouping);
					} else {
						concatInputs = divRowQuestionsByGrouping;
					}
					if (concatInputs.length > 0) {
						return (
							<div>
								{concatInputs}
							</div>
						)
					}
				}
			});
			return [].concat.apply([], groupedSubCatInputs);
		}
	}

	private questionBuilder() {
		if (this.props.context.questions) {
			const currCategory = this.props.context.categories.filter((f: any) => f.category_id === this.props.category_id);
			return (
				<div id={`parent-question-${currCategory[0].category_id}`} >
					{this.recursivelyBuildQuestions(currCategory)}
				</div>
			);
		}
	}

	public render() {
		const {context: {questions}, category_id} = this.props;
		if (category_id && questions) {
			return this.renderCard(questions);
		} else {
			return null;
		}
	}

	private renderCard(questions: Questions[]) {
		return (
			<Card id={this.props.category_id.toString()}>
				<Accordion.Toggle as={Card.Header} eventKey={this.props.category_id.toString()}
				                  onClick={(e) => this.handleAccordionToggleClick(e, `accord-${this.props.category_id.toString()}`)}>
					{this.props.category_title}
					{/* TODO: not working properly due to state should update */
						/*<span className={'floater-rght'} id={'accord-icon-0'}>
						{
							this.state.doesContainShow ?
								<FontAwesomeIcon icon={faLongArrowAltUp}/> :
								<FontAwesomeIcon icon={faLongArrowAltDown}/>
						}
					</span>*/}
				</Accordion.Toggle>
				<Accordion.Collapse eventKey={this.props.category_id.toString()}
				                    id={`accord-${this.props.category_id.toString()}`}>
					<Card.Body className={'nopadding'}>
						{!!questions && this.questionBuilder()}
					</Card.Body>
				</Accordion.Collapse>
			</Card>
		);
	}

	private static propKey(propertyName: string, value: any): object {
		return {[propertyName]: value};
	}

	private setStateWithEvent(event: any, columnType: string): void {
		this.setState(SalesEntryForm.propKey(columnType, (event.target as any).value));
	}

	private splitSubMeasurementValueForDisplay(completeValue: string): string {
		let value: any;

		if(completeValue !== undefined) {
			if (completeValue.includes('.')) {
				value = completeValue.split('.')[0]
			} else {
				value = completeValue;
			}
		}
		return value;
	}

	private setSubMeasurementValue(event: any, index: number, columnType: string, completeValue: string): void {
		let value: any;

		if(completeValue.includes('.')) {
			if(event.value.length > 0) {
				value = completeValue.split('.')[0] + event.value;
			} else {
				value = completeValue.split('.')[0]
			}
		} else {
			if(event.value.length > 0) {
				value = completeValue + event.value;
			} else {
				value = completeValue
			}
		}
		this.setDynStateWithEvent(value, index, columnType);
	}

	private setDynStateWithEvent(event: any, index: number, columnType: string): void {
		let val: any;
		if (event.label !== undefined) {
			val = event.value;
		} else if((event.target as any) === undefined) {
			val = event;
		} else {
			val = (event.target as any).type === 'checkbox' ? event.target.checked : (event.target as any).value;
		}

		this.showExtraRows(columnType, val);

		this.setState({
			productDetails: this.onUpdateItem(index, columnType, val)
		});
		this.props.cabinetConstructor();
		this.props.priceConstructor(val, columnType, this.getItem(index, columnType, val));
	}

	private getItem = (i: number, propName: string, value: any) => {
		let idx = -1;

		this.state.productDetails.some((pd: ProductDetails, internal_i: number) => {
			if (pd.q_fk == i) {
				idx = internal_i;
				return true;
			}
			return false;
		});
		let pdItem: ProductDetails = this.state.productDetails[idx];
		pdItem.response = value;
		return pdItem;
	};

	private onUpdateItem = (i: number, propName: string, value: any) => {
		let myList = this.state.productDetails;
		let idx = -1;

		this.state.productDetails.some((pd: ProductDetails, internal_i: number) => {
			if (pd.q_fk == i) {
				idx = internal_i;
				return true;
			}
			return false;
		});
		let pdItem: ProductDetails = this.state.productDetails[idx];
		pdItem.response = value;
		myList[idx] = pdItem;
		return myList;
	}

	private showExtraRows = (columnName: string, value: any): void => {
		if (columnName === 'cab_quantity') {
			this.setExtraRowsStyle(value, 'cab_', MAX_CABS);
		} else if (columnName === 'dr_quantity') {
			this.setExtraRowsStyle(value, 'dr_', MAX_DOORS);
		} else if (columnName === 'dwr_quantity') {
			this.setExtraRowsStyle(value, 'dwr_', MAX_DRAWERS);
		} else if (columnName === 'legs_quantity') {
			this.setExtraRowsStyle(value, 'legs_', MAX_LEGS);
		} else if (columnName === 'top_quantity') {
			this.setExtraRowsStyle(value, 'top_', MAX_TOPS);
		} else if (columnName === 'rodwr_quantity') {
			this.setExtraRowsStyle(value, 'rodwr_', MAX_RO_DRAWERS);
		} else if (columnName === 'pnt_isc') {
			this.setCheckboxShowHideStyle(value, 'pnt_cus')
		}
	};

	private setExtraRowsStyle = (val: any, unique_dim_prefix: string, max_rows: number): void => {
		let listOfNums = Array.from(Array(max_rows + 1).keys());
		let maxListOfNums = Array.from(Array(max_rows + 1).keys());
		if (String(val).length > 0 && val !== undefined) {
			let convertedVal = Number(val);
			// first if statement, hide all rows if quantity = 1 / 0
			if (convertedVal < 2) {
				listOfNums.forEach((num: number) => {
					const ele_id = `${unique_dim_prefix}${num}`;
					const ele = document.getElementById(ele_id);
					if (num > 1) {
						if (ele !== null && ele !== undefined) {
							ele.style.display = 'none';
						}
					} else {
						if (ele !== null && ele !== undefined) {
							ele.style.display = 'flex';
						}
					}
				});
			} else {
				convertedVal = convertedVal > max_rows ? max_rows : convertedVal;
				listOfNums = Array.from(Array(convertedVal + 1).keys());
				maxListOfNums.forEach((num: number) => {
					if (num >= 1) {
						if (listOfNums.includes(num)) {
							const ele_id = `${unique_dim_prefix}${num}`;
							const ele = document.getElementById(ele_id);
							if (ele !== null && ele !== undefined) {
								ele.style.display = 'flex';
							}
						} else {
							const ele_id = `${unique_dim_prefix}${num}`;
							const ele = document.getElementById(ele_id);
							if (ele !== null && ele !== undefined) {
								ele.style.display = 'none';
							}
						}
					}
				});
			}
		} else {
			listOfNums.forEach((num: number) => {
				if (num >= 1) {
					const ele_id = `${unique_dim_prefix}${num}`;
					const ele = document.getElementById(ele_id);
					if (ele !== null && ele !== undefined) {
						ele.style.display = 'none';
					}
				}
			});
		}
	};

	private setCheckboxShowHideStyle = (val: any, unique_dim: string): void => {
		if (String(val).length > 0 && val !== undefined) {
			if (val) {
				if (unique_dim.includes('pnt_')) {
					this.setCustomPaintRowsByCheckbox('flex');
				}
			} else {
				if (unique_dim.includes('pnt_')) {
					this.setCustomPaintRowsByCheckbox('none');
				}
			}
		} else {
			if (unique_dim.includes('pnt_')) {
				this.setCustomPaintRowsByCheckbox('none');
			}
		}
	};

	private setCustomPaintRowsByCheckbox(displayVal: string) {
		const ele_ids: string[] = ['pnt_cus_1', 'pnt_cus_2'];
		ele_ids.forEach((element) => {
			const ele = document.getElementById(element);
			if (ele !== null && ele !== undefined) {
				ele.style.display = displayVal;
			}
		});
	}
}
