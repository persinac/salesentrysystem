import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import {MeasurementDetails, ProductDetails, Questions, SalesEntryState} from '../../State';
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
	SPICE_RACK_OPTIONS, TOP_OPTIONS,
	UTENSIL_OPTIONS, WINE_RACK_OPTIONS
} from "../../constants/ProductOptions";

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
		if (this.props.context) {
			return (
				<div>
					{this.renderCabs()}
					{this.renderDoors()}
					{this.renderDrawers()}
					{this.renderRolloutDrawers()}
					{this.renderLegs()}
					{this.renderTops()}
				</div>
			)
		} else {
			return null;
		}
	}

	private renderCabs() {
		const {cabinet} = this.props.context;
		return (
			<Card>
				<Card.Body className={'nopadding'}>
					<div className={'row'}>
						<div className={'col-lg-12'}><p className={'lead'}>Cabinets</p></div>
						<div className={'col-md-4 mb-3'}>
							<span>Quantity: {cabinet.quantity}</span>
						</div>
						<div className={'col-md-4 mb-3'}>
							<p>Size:</p>
							<ul>
								{this.buildMeasurementListItem(Number(cabinet.quantity), cabinet.measurement)}
							</ul>
						</div>
						<div className={'col-md-4 mb-3'}>
							<span>Material Type: {cabinet.material_type}</span>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	}

	private renderDoors() {
		const {door} = this.props.context;
		return (
			<Card>
				<Card.Body className={'nopadding'}>
					<div className={'row'}>
						<div className={'col-lg-12'}><p className={'lead'}>Doors</p></div>
						<div className={'col-md-4 mb-3'}>
							<span>Quantity: {door.quantity}</span>
						</div>
						<div className={'col-md-4 mb-3'}>
							<p>Size:</p>
							<ul>
								{this.buildMeasurementListItem(Number(door.quantity), door.measurement)}
							</ul>
						</div>
						<div className={'col-md-4 mb-3'}>
							<span>Material Type: {door.material_type}</span>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	}

	private renderDrawers() {
		const {drawers} = this.props.context;
		return (
			<Card>
				<Card.Body className={'nopadding'}>
					<div className={'row'}>
						<div className={'col-lg-12'}><p className={'lead'}>Drawers</p></div>
						<div className={'col-md-4 mb-3'}>
							<span>Quantity: {drawers.quantity}</span>
						</div>
						<div className={'col-md-4 mb-3'}>
							<p>Size:</p>
							<ul>
								{this.buildMeasurementListItem(Number(drawers.quantity), drawers.measurement)}
							</ul>
						</div>
						<div className={'col-md-4 mb-3'}>
							<span>Material Type: {drawers.material_type}</span>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	}

	private renderRolloutDrawers() {
		const {rollout_drawers} = this.props.context;
		return (
			<Card>
				<Card.Body className={'nopadding'}>
					<div className={'row'}>
						<div className={'col-lg-12'}><p className={'lead'}>Rollout Drawers</p></div>
						<div className={'col-md-4 mb-3'}>
							<span>Quantity: {rollout_drawers.quantity}</span>
						</div>
						<div className={'col-md-4 mb-3'}>
							<p>Size:</p>
							<ul>
								{this.buildMeasurementListItem(Number(rollout_drawers.quantity), rollout_drawers.measurement)}
							</ul>
						</div>
						<div className={'col-md-4 mb-3'}>
							<span>Material Type: {rollout_drawers.material_type}</span>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	}

	private renderLegs() {
		const {legs} = this.props.context;
		return (
			<Card>
				<Card.Body className={'nopadding'}>
					<div className={'row'}>
						<div className={'col-lg-12'}><p className={'lead'}>Legs</p></div>
						<div className={'col-md-4 mb-3'}>
							<span>Quantity: {legs.quantity}</span>
						</div>
						<div className={'col-md-4 mb-3'}>
							<p>Size:</p>
							<ul>
								{this.buildMeasurementListItem(Number(legs.quantity), legs.measurement)}
							</ul>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
	}

	private renderTops() {
		const {tops} = this.props.context;
		return (
			<Card>
				<Card.Body className={'nopadding'}>
					<div className={'row'}>
						<div className={'col-lg-12'}><p className={'lead'}>Tops</p></div>
						<div className={'col-md-4 mb-3'}>
							<span>Quantity: {tops.quantity}</span>
						</div>
						<div className={'col-md-4 mb-3'}>
							<p>Size:</p>
							<ul>
								{this.buildMeasurementListItem(Number(tops.quantity), tops.measurement)}
							</ul>
						</div>
					</div>
				</Card.Body>
			</Card>
		);
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
}
