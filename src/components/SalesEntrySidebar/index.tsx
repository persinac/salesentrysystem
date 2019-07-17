import React from 'react';
import '../../styles/general.css';
import {
	PricingComponent,
	Roles, SalesEntryState,
} from '../../State';
import {Card} from "react-bootstrap";
import {ShortNamePrefix} from "../../Enums/ShortNamePrefix";
import {SidebarKeyList} from "../../constants/SidebarMapping";

interface IProps {
	submitHandler?: any;
	context?: SalesEntryState;
}

interface IState {
	mapStuff: string[];
}

export class SalesEntrySidebarComponent extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);
	}

	public shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
		// console.log('should update');
		return true;
	}

	public componentWillUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): void {
		// console.log('will update')
	}

	public componentDidMount() {
		console.log('componentDidMount');
		this.setState({mapStuff: SidebarKeyList}
		);
		console.log(this.state);
	}

	public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
		console.log(this.props.context.componentPrice);
	}

	public render() {
		let priceComponent: PricingComponent = {};
		let subtotal: number = 0.00;
		if (this.props.context.componentPrice) {
			SidebarKeyList.forEach((k: string) => {
				if(this.props.context.componentPrice.has(k)) {
					priceComponent = this.props.context.componentPrice.get(k);
					subtotal += priceComponent.actual_price;
				}
			});
		}
		return (
			<div>
				<Card>
					{this.renderIndividualPriceComponents()}
				</Card>
			</div>
		);
	}

	private renderIndividualPriceComponents() {
		let priceComponent: PricingComponent = {};
		let subtotal: number = 0.00;
		let something;
		if (this.props.context.componentPrice) {
			something = SidebarKeyList.map((k: string) => {
				if(this.props.context.componentPrice.has(k)) {
					priceComponent = this.props.context.componentPrice.get(k);
					subtotal += priceComponent.actual_price;
					return this.renderPriceComponents(k, priceComponent.actual_price)
				}
			});
			something.push(this.renderPriceComponents('Subtotal', subtotal));
		}
		return something;
	}

	private renderPriceComponents(title: string, price: number) {
		return (
			<div>
				<p className={'lead'}>{title} <span>{price}</span></p>
				<p></p>
			</div>
		)
	}
}