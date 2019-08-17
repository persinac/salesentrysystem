import React from "react";
import {
	MeasurementDetails,
	PricingComponent,
	ProductDetails, Questions,
	SalesEntryState
} from '../../State';
import {
	CABINET_OPTIONS
} from "../../constants/ProductOptions";
import {PriceBuilder} from "../../Utility/PriceBuilder";
import {ShortNamePrefix} from "../../Enums/ShortNamePrefix";
import {FEATURE_LUXURIES_SHORT_NAMES} from "../../constants/FeaturesLuxuriesShortNames";

interface InterfaceProps {
	category_id?: number;
	category_title?: string;
	context: SalesEntryState;
	priceConstructor?: any;
	cabinetConstructor?: any;
	customPrice?: boolean;
}

interface IState {
	componentPrice?: Map<string, PricingComponent>;
}

export class OrderSummary extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			componentPrice: this.props.context.componentPrice
		};
	}

	shouldComponentUpdate(nextProps: InterfaceProps, nextState: IState) { return true; }

	public render() {
		const itemWidth = {
			width: '10%'
		};
		const descWidth = {
			width: this.props.customPrice ? '40%' : '50%'
		};
		const unitsWidth = {
			width: '10%'
		};
		const ppuWidth = {
			width: '15%'
		};
		const cpWidth = {
			width: '15%'
		};
		const ltWidth = {
			width: this.props.customPrice ? '10%' : '15%'
		};
		if (this.props.context) {
			return (
				<div>
					<table className={'table table-striped table-sm'}>
						<thead>
						<tr>
							<th style={itemWidth}>Item</th>
							<th style={descWidth}>Description</th>
							<th style={unitsWidth}>Units</th>
							<th style={ppuWidth}>Price per Unit</th>
							<th style={ltWidth}>Line Total</th>
							{this.props.customPrice ?
								<th style={cpWidth}>Custom Price</th> : null
							}
						</tr>
						</thead>
						<tbody>
							{this.props.context.componentPrice.has(`${ShortNamePrefix.CABINET}_size`) ? this.renderCabs() : null}
							{this.props.context.componentPrice.has(`${ShortNamePrefix.CABINET}_size`) ? this.renderCabinetColor() : null}
							{this.props.context.componentPrice.has(`${ShortNamePrefix.DOOR}_size`) ? this.renderDoors() : null}
							{this.props.context.componentPrice.has(`${ShortNamePrefix.DRAWER}_size`) ? this.renderDrawers() : null}
							{this.props.context.componentPrice.has(`${ShortNamePrefix.ROLLOUT_DRAWERS}_size`) ? this.renderRolloutDrawers() : null}
							{this.props.context.componentPrice.has(`${ShortNamePrefix.LEGS}_size`) ? this.renderLegs() : null}
							{this.props.context.componentPrice.has(`${ShortNamePrefix.TOP}_size`) ? this.renderTops() : null}
							{this.renderFeaturesLuxuries()}
							{this.renderHardwareDrawers()}
							{this.renderHardwareDoors()}
						</tbody>
					</table>

				</div>
			)
		} else {
			return null;
		}
	}

	private renderCabs() {
		const {cabinet} = this.props.context;
		let value: string = this.getResponseFromProductDetails(
			this.state.componentPrice.get(`${ShortNamePrefix.CABINET}_size`),
			this.props.context.productDetails
		);
		const description: string = CABINET_OPTIONS.filter((co) => co.value === value)[0].label;
		const measurement = cabinet.measurement;
		const list_of_nums: number[] = Number(cabinet.quantity) ? Array.from(Array(Number(cabinet.quantity)).keys()): [];
		if (list_of_nums.length > 0) {
			let trs = list_of_nums.map((i: number) => {
				let price = this.state.componentPrice.get(`${ShortNamePrefix.CABINET}_size`).custom_price;
				if (this.props.customPrice) {
					price = PriceBuilder.buildCabinetLineItemPrice(
						value,
						measurement[i],
						this.state.componentPrice.get(`${ShortNamePrefix.CABINET}_size`),
						this.props.context.prices
					);
				}
				const descrip = `Cabinet - ${description} - ${measurement[i].length} x ${measurement[i].width} x ${measurement[i].height}`;
				return this.renderRow(i, descrip, 1, price, price, `${ShortNamePrefix.CABINET}_size`, (i+1)>1);
			});
			return trs;
		}
	}

	private renderDoors() {
		const {door} = this.props.context;
		let value: string = this.getResponseFromProductDetails(
			this.state.componentPrice.get(`${ShortNamePrefix.DOOR}_size`),
			this.props.context.productDetails
		);
		const measurement = door.measurement;
		const list_of_nums: number[] = Number(door.quantity) ? Array.from(Array(Number(door.quantity)).keys()): [];
		if (list_of_nums.length > 0) {
			let trs = list_of_nums.map((i: number) => {
				let price = this.state.componentPrice.get(`${ShortNamePrefix.DOOR}_size`).custom_price;
				if (this.props.customPrice) {
					price = PriceBuilder.buildDoorLineItemPrice(
						value,
						measurement[i],
						this.state.componentPrice.get(`${ShortNamePrefix.DOOR}_size`),
						this.props.context.prices,
						i
					);
				}
				const descrip = `Door - ${measurement[i].length} x ${measurement[i].width} x ${measurement[i].height}`;
				return this.renderRow(i, descrip, 1, price, price, `${ShortNamePrefix.DOOR}_size`, (i+1)>1);
			});
			return trs;
		}
	}

	private renderDrawers() {
		const {drawers} = this.props.context;
		let value: string = this.getResponseFromProductDetails(
			this.props.context.componentPrice.get(`${ShortNamePrefix.DRAWER}_size`),
			this.props.context.productDetails
		);
		const measurement = drawers.measurement;
		const list_of_nums: number[] = Number(drawers.quantity) ? Array.from(Array(Number(drawers.quantity)).keys()): [];
		if (list_of_nums.length > 0) {
			let trs = list_of_nums.map((i: number) => {
				let price = this.state.componentPrice.get(`${ShortNamePrefix.DRAWER}_size`).custom_price;
				if (this.props.customPrice) {
					price = PriceBuilder.buildDrawerLineItemPrice(
						value,
						measurement[i],
						this.state.componentPrice.get(`${ShortNamePrefix.DRAWER}_size`),
						this.props.context.prices
					);
				}
				const descrip = `Drawer - ${measurement[i].length} x ${measurement[i].width} x ${measurement[i].height}`;
				return this.renderRow(i, descrip, 1, price, price, `${ShortNamePrefix.DRAWER}_size`, (i+1)>1);
			});
			return trs;
		}
	}

	private renderRolloutDrawers() {
		const {rollout_drawers} = this.props.context;
		let value: string = this.getResponseFromProductDetails(
			this.props.context.componentPrice.get(`${ShortNamePrefix.ROLLOUT_DRAWERS}_size`),
			this.props.context.productDetails
		);
		const measurement = rollout_drawers.measurement;
		const list_of_nums: number[] = Number(rollout_drawers.quantity) ? Array.from(Array(Number(rollout_drawers.quantity)).keys()): [];
		if (list_of_nums.length > 0) {
			let trs = list_of_nums.map((i: number) => {
				let price = this.state.componentPrice.get(`${ShortNamePrefix.ROLLOUT_DRAWERS}_size`).custom_price;
				if (this.props.customPrice) {
					price = PriceBuilder.buildRolloutDrawerLineItemPrice(
						value,
						measurement[i],
						this.state.componentPrice.get(`${ShortNamePrefix.ROLLOUT_DRAWERS}_size`),
						this.props.context.prices
					);
				}
				const descrip = `Rollout Drawer - ${measurement[i].length} x ${measurement[i].width} x ${measurement[i].height}`;
				return this.renderRow(i, descrip, 1, price, price, `${ShortNamePrefix.ROLLOUT_DRAWERS}_size`, (i+1)>1);
			});
			return trs;
		}
	}

	private renderLegs() {
		const {legs} = this.props.context;
		let value: string = this.getResponseFromProductDetails(
			this.props.context.componentPrice.get(`${ShortNamePrefix.LEGS}_size`),
			this.props.context.productDetails
		);
		const measurement = legs.measurement;
		const list_of_nums: number[] = Number(legs.quantity) ? Array.from(Array(Number(legs.quantity)).keys()): [];
		if (list_of_nums.length > 0) {
			let trs = list_of_nums.map((i: number) => {
				let price = this.state.componentPrice.get(`${ShortNamePrefix.LEGS}_size`).custom_price;
				if (this.props.customPrice) {
					price = PriceBuilder.buildLegsLineItemPrice(
						value,
						measurement[i],
						this.state.componentPrice.get(`${ShortNamePrefix.LEGS}_size`),
						this.props.context.prices
					);
				}
				const descrip = `Legs - ${measurement[i].length} x ${measurement[i].width} x ${measurement[i].height}`;
				return this.renderRow(i, descrip, 1, price, price, `${ShortNamePrefix.LEGS}_size`, (i+1)>1);
			});
			return trs;
		}
	}

	private renderTops() {
		const {tops} = this.props.context;
		let value: string = this.getResponseFromProductDetails(
			this.props.context.componentPrice.get(`${ShortNamePrefix.TOP}_size`),
			this.props.context.productDetails
		);
		const measurement = tops.measurement;
		const list_of_nums: number[] = Number(tops.quantity) ? Array.from(Array(Number(tops.quantity)).keys()): [];
		if (list_of_nums.length > 0) {
			let trs = list_of_nums.map((i: number) => {
				let price = this.state.componentPrice.get(`${ShortNamePrefix.TOP}_size`).custom_price;
				if (this.props.customPrice) {
					price = PriceBuilder.buildTopLineItemPrice(
						value,
						measurement[i],
						this.state.componentPrice.get(`${ShortNamePrefix.TOP}_size`),
						this.props.context.prices,
						i
					);
				}
				const descrip = `Top - ${measurement[i].length} x ${measurement[i].width} x ${measurement[i].height}`;
				return this.renderRow(i, descrip, 1, price, price, `${ShortNamePrefix.TOP}_size`, (i+1)>1);
			});
			return trs;
		}
	}

	private renderFeaturesLuxuries() {
		const {productDetails, questions, componentPrice} = this.props.context;

		let filteredQuestions = FEATURE_LUXURIES_SHORT_NAMES.map((flsn) => {
			return questions.filter((q: Questions) => {return q.short_name === flsn.value})[0];
		});

		let questionsWithResponses = filteredQuestions.map((fq: Questions) => {
			return productDetails.filter((pd: ProductDetails) => {
				return (pd.response !== undefined && pd.q_fk === fq.q_id );
			})[0];
		}).filter((e) => { return e !== undefined });

		if(questionsWithResponses.length > 0) {
			let trs = questionsWithResponses.map((pd: ProductDetails, i: number) => {
				const question = filteredQuestions.filter((q: Questions) => pd.q_fk === q.q_id)[0];

				if (this.state.componentPrice.has(`${question.short_name}`)) {
					let price = this.state.componentPrice.get(`${question.short_name}`).custom_price;
					if (!price) {
						price = PriceBuilder.buildFeatureLuxuryLineItemPrice(
							pd.response,
							this.props.context.prices
						);
					}
					if (price > 0) {
						const descrip = `${question.text}`;
						return this.renderRow(i, descrip, 1, price, price, `${question.short_name}`, false);
						return (
							<tr>
								<td>#{(i + 1)}</td>
								<td>{question.text}</td>
								<td>1</td>
								<td>${price.toFixed(2)}</td>
								<td>${price.toFixed(2)}</td>
								<td>
									<input
										value={""}
										type='text'
										placeholder="Stuff"
										className='form-control'
									/>
								</td>
							</tr>
						);
					}
				}
			});
			return trs;
		}
	}

	private renderHardwareDrawers() {
		const {productDetails, questions} = this.props.context;
		const {quantity} = this.props.context.drawers;

		let filteredQuestions = questions.filter((q: Questions) => q.short_name === 'hrdwr_drwr')[0];
		let questionsWithResponses = productDetails.filter((pd: ProductDetails) => {
			return (pd.response !== undefined && pd.q_fk === filteredQuestions.q_id );
		})[0];

		if(questionsWithResponses && quantity) {
			let price = this.state.componentPrice.get(`hrdwr_drwr`).custom_price;
			if (this.props.customPrice && !price) {
				price = PriceBuilder.buildHardwareDrawerLineItemPrice(
					questionsWithResponses.response,
					this.props.context.prices,
					quantity
				);
			}
			const descrip = filteredQuestions.text;
			if(price > 0) {
				return this.renderRow(0, descrip, quantity, price, price, 'hrdwr_drwr', false);
			}
		}
	}

	private renderHardwareDoors() {
		const {productDetails, questions, componentPrice} = this.props.context;
		const {quantity} = this.props.context.door;

		let filteredQuestions = questions.filter((q: Questions) => q.short_name === 'hrdwr_dr')[0];
		let questionsWithResponses = productDetails.filter((pd: ProductDetails) => {
			return (pd.response !== undefined && pd.q_fk === filteredQuestions.q_id );
		})[0];

		if(questionsWithResponses && quantity) {
			let price = this.state.componentPrice.get(`hrdwr_dr`).custom_price;
			if (this.props.customPrice && !price) {
				price = PriceBuilder.buildHardwareDoorLineItemPrice(
					questionsWithResponses.response,
					this.props.context.prices,
					quantity
				);
			}
			const descrip = filteredQuestions.text;
			if(price > 0) {
				return this.renderRow(0, descrip, quantity, price, price, 'hrdwr_dr', false);
			}
		}
	}

	private renderCabinetColor() {
		const {productDetails, questions} = this.props.context;

		let filteredQuestions = questions.filter((q: Questions) => q.short_name === 'pnt_clr')[0];
		let questionsWithResponses = productDetails.filter((pd: ProductDetails) => {
			return (pd.response !== undefined && pd.q_fk === filteredQuestions.q_id );
		})[0];

		if(questionsWithResponses) {
			let price = this.state.componentPrice.get(`pnt_clr`).custom_price;
			if (this.props.customPrice && !price) {
				price = PriceBuilder.buildCabPaintColorLineItemPrice(
					questionsWithResponses.response,
					this.props.context.prices
				);
			}
			const descrip = `Cabinet Paint Color - ${questionsWithResponses.response}`;
			if(price > 0) {
				return this.renderRow(0, descrip, 1, price, price, 'pnt_clr', false);
			}
		}
	}

	private renderRow(i: number, text: string, units: number, individualItemPrice: number, linePrice: number, shortName: string, disableInput: boolean) {
		return (
			<tr>
				<td>#{(i + 1)}</td>
				<td>{text}</td>
				<td>{units}</td>
				<td>${Number(individualItemPrice).toFixed(2)}</td>
				<td>${Number(linePrice).toFixed(2)}</td>
				{this.props.customPrice ?
					<td>
						<input
							id={String(i + 1)}
							value={disableInput ? '' : this.state.componentPrice.get(shortName).custom_price}
							type='text'
							onChange={(event: any) => {
								this.setDynStateWithEvent(event,i,shortName);
							}}
							placeholder={(i + 1) === 1 ? 'custom price' : ''}
							className='form-control'
							disabled={disableInput}
						/>
					</td> : null
				}
			</tr>
		);
	}
	private getResponseFromProductDetails(cp: PricingComponent, productDetails: ProductDetails[]): string {
		const detail = productDetails.filter((pd: ProductDetails) => pd.pd_id === cp.pd_id);
		return detail[0].response;
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

		this.setState({
			componentPrice: this.onUpdateItem(index, columnType, val)
		});
	}

	private onUpdateItem = (i: number, propName: string, value: any) => {
		let myList = this.state.componentPrice;

		let cp = myList.get(propName);
		cp.custom_price = value;

		myList.set(propName, cp);
		return myList;
	}
}
