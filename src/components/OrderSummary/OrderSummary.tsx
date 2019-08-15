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
}

interface IState {
	doesContainShow?: boolean;
	productDetails?: ProductDetails[];
	currentQuestionIdx?: number;
}

export class OrderSummary extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {
			doesContainShow: false,
			currentQuestionIdx: 0,
			productDetails: this.props.context.productDetails
		};
	}

	shouldComponentUpdate(nextProps: InterfaceProps, nextState: IState) { return false; }

	public render() {
		const itemWidth = {
			width: '10%'
		};
		const descWidth = {
			width: '50%'
		};
		const unitsWidth = {
			width: '10%'
		};
		const ppuWidth = {
			width: '15%'
		};
		const ltWidth = {
			width: '15%'
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
			this.props.context.componentPrice.get('cab_size'),
			this.props.context.productDetails
		);
		const description: string = CABINET_OPTIONS.filter((co) => co.value === value)[0].label;
		const measurement = cabinet.measurement;
		const list_of_nums: number[] = Number(cabinet.quantity) ? Array.from(Array(Number(cabinet.quantity)).keys()): [];
		if (list_of_nums.length > 0) {
			let trs = list_of_nums.map((i: number) => {
				let price = PriceBuilder.buildCabinetLineItemPrice(
					value,
					measurement[i],
					this.props.context.componentPrice.get('cab_size'),
					this.props.context.prices
				);
				return (
					<tr>
					<td>#{(i+1)}</td>
					<td>Cabinet - {description} - {measurement[i].length} x {measurement[i].width} x {measurement[i].height}</td>
					<td>1</td>
					<td>${price.toFixed(2)}</td>
					<td>${price.toFixed(2)}</td>
				</tr>
				);
			});
			return trs;
		}
	}

	private renderDoors() {
		const {door} = this.props.context;
		let value: string = this.getResponseFromProductDetails(
			this.props.context.componentPrice.get(`${ShortNamePrefix.DOOR}_size`),
			this.props.context.productDetails
		);
		const measurement = door.measurement;
		const list_of_nums: number[] = Number(door.quantity) ? Array.from(Array(Number(door.quantity)).keys()): [];
		if (list_of_nums.length > 0) {
			let trs = list_of_nums.map((i: number) => {
				let price = PriceBuilder.buildDoorLineItemPrice(
					value,
					measurement[i],
					this.props.context.componentPrice.get(`${ShortNamePrefix.DOOR}_size`),
					this.props.context.prices,
					i
				);
				return (
					<tr>
						<td>#{(i+1)}</td>
						<td>Door - {measurement[i].length} x {measurement[i].width} x {measurement[i].height}</td>
						<td>1</td>
						<td>${price.toFixed(2)}</td>
						<td>${price.toFixed(2)}</td>
					</tr>
				);
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
				let price = PriceBuilder.buildDrawerLineItemPrice(
					value,
					measurement[i],
					this.props.context.componentPrice.get(`${ShortNamePrefix.DRAWER}_size`),
					this.props.context.prices
				);
				return (
					<tr>
						<td>#{(i+1)}</td>
						<td>Drawer - {measurement[i].length} x {measurement[i].width} x {measurement[i].height}</td>
						<td>1</td>
						<td>${price.toFixed(2)}</td>
						<td>${price.toFixed(2)}</td>
					</tr>
				);
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
				let price = PriceBuilder.buildRolloutDrawerLineItemPrice(
					value,
					measurement[i],
					this.props.context.componentPrice.get(`${ShortNamePrefix.ROLLOUT_DRAWERS}_size`),
					this.props.context.prices
				);
				return (
					<tr>
						<td>#{(i+1)}</td>
						<td>Rollout Drawer - {measurement[i].length} x {measurement[i].width} x {measurement[i].height}</td>
						<td>1</td>
						<td>${price.toFixed(2)}</td>
						<td>${price.toFixed(2)}</td>
					</tr>
				);
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
				let price = PriceBuilder.buildLegsLineItemPrice(
					value,
					measurement[i],
					this.props.context.componentPrice.get(`${ShortNamePrefix.LEGS}_size`),
					this.props.context.prices
				);
				return (
					<tr>
						<td>#{(i+1)}</td>
						<td>Legs - {measurement[i].length} x {measurement[i].width} x {measurement[i].height}</td>
						<td>1</td>
						<td>${price.toFixed(2)}</td>
						<td>${price.toFixed(2)}</td>
					</tr>
				);
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
				let price = PriceBuilder.buildTopLineItemPrice(
					value,
					measurement[i],
					this.props.context.componentPrice.get(`${ShortNamePrefix.TOP}_size`),
					this.props.context.prices,
					i
				);
				return (
					<tr>
						<td>#{(i+1)}</td>
						<td>Top - {measurement[i].length} x {measurement[i].width}</td>
						<td>1</td>
						<td>${price.toFixed(2)}</td>
						<td>${price.toFixed(2)}</td>
					</tr>
				);
			});
			return trs;
		}
	}

	private renderFeaturesLuxuries() {
		const {productDetails, questions} = this.props.context;

		let filteredQuestions = FEATURE_LUXURIES_SHORT_NAMES.map((flsn) => {
			return questions.filter((q: Questions) => q.short_name === flsn.value)[0];
		});
		let questionsWithResponses = filteredQuestions.map((fq: Questions) => {
			return productDetails.filter((pd: ProductDetails) => {
				return (pd.response !== undefined && pd.q_fk === fq.q_id );
			})[0];
		}).filter((e) => { return e !== undefined });

		if(questionsWithResponses.length > 0) {
			let trs = questionsWithResponses.map((pd: ProductDetails, i: number) => {
				const question = filteredQuestions.filter((q: Questions) => pd.q_fk === q.q_id)[0];
				let price = PriceBuilder.buildFeatureLuxuryLineItemPrice(
					pd.response,
					this.props.context.prices
				);
				if(price > 0) {
					return (
						<tr>
							<td>#{(i + 1)}</td>
							<td>{question.text}</td>
							<td>1</td>
							<td>${price.toFixed(2)}</td>
							<td>${price.toFixed(2)}</td>
						</tr>
					);
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
			let price = PriceBuilder.buildHardwareDrawerLineItemPrice(
				questionsWithResponses.response,
				this.props.context.prices,
				quantity
			);
			if(price > 0) {
				return (
					<tr>
						<td>#1</td>
						<td>{filteredQuestions.text}</td>
						<td>{quantity}</td>
						<td>${(price / quantity).toFixed(2)}</td>
						<td>${price.toFixed(2)}</td>
					</tr>
				);
			}
		}
	}

	private renderHardwareDoors() {
		const {productDetails, questions} = this.props.context;
		const {quantity} = this.props.context.door;

		let filteredQuestions = questions.filter((q: Questions) => q.short_name === 'hrdwr_dr')[0];
		let questionsWithResponses = productDetails.filter((pd: ProductDetails) => {
			return (pd.response !== undefined && pd.q_fk === filteredQuestions.q_id );
		})[0];

		if(questionsWithResponses && quantity) {
			let price = PriceBuilder.buildHardwareDoorLineItemPrice(
				questionsWithResponses.response,
				this.props.context.prices,
				quantity
			);
			if(price > 0) {
				return (
					<tr>
						<td>#1</td>
						<td>{filteredQuestions.text}</td>
						<td>{quantity}</td>
						<td>${(price / quantity).toFixed(2)}</td>
						<td>${price.toFixed(2)}</td>
					</tr>
				);
			}
		}
	}

	private renderCabinetColor() {
		const {productDetails, questions} = this.props.context;

		let filteredQuestions = questions.filter((q: Questions) => q.short_name === 'pnt_clr')[0];
		let questionsWithResponses = productDetails.filter((pd: ProductDetails) => {
			return (pd.response !== undefined && pd.q_fk === filteredQuestions.q_id );
		})[0];

		console.log(filteredQuestions);
		console.log(questionsWithResponses);
		if(questionsWithResponses) {
			let price = PriceBuilder.buildCabPaintColorLineItemPrice(
				questionsWithResponses.response,
				this.props.context.prices
			);
			if(price > 0) {
				return (
					<tr>
						<td>#1</td>
						<td>Cabinet Paint Color - {questionsWithResponses.response}</td>
						<td>1</td>
						<td>${price.toFixed(2)}</td>
						<td>${price.toFixed(2)}</td>
					</tr>
				);
			}
		}
	}

	private buildMeasurementListItem(qty: number, measurement: MeasurementDetails[]) {
		const list_of_door_nums: number[] = qty ? Array.from(Array(qty).keys()): [];
		if (list_of_door_nums.length > 0) {
			console.log(list_of_door_nums);
			return list_of_door_nums.map((i: number) => {
				return (
					<li>
						<span>
							{measurement[i].length} x {measurement[i].width} x {measurement[i].height}
						</span>
					</li>
				);
			})
		} else {
			return <div></div>;
		}
	}

	private getResponseFromProductDetails(cp: PricingComponent, productDetails: ProductDetails[]): string {
		const detail = productDetails.filter((pd: ProductDetails) => pd.pd_id === cp.pd_id);
		return detail[0].response;
	}
}
