import React from 'react';
import '../../styles/general.css';
import {
	PricingComponent, SalesEntryState,
} from '../../State';
import {Card} from "react-bootstrap";
import {SidebarKeyList} from "../../constants/SidebarMapping";

/***
 * Sidebar CSS:
 * position: sticky
 * top: 100px
 */

interface IProps {
	submitHandler?: any;
	context?: SalesEntryState;
}

interface IState {
	mapStuff: any;
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
		this.setState({mapStuff: SidebarKeyList});
	}

	public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
	}

	public render() {
		let priceComponent: PricingComponent = {};
		let subtotal: number = 0.00;
		if (this.props.context.componentPrice) {
			SidebarKeyList.forEach((k) => {
				if(this.props.context.componentPrice.has(k.value)) {
					priceComponent = this.props.context.componentPrice.get(k.value);
					if(Number(priceComponent.custom_price) > priceComponent.actual_price) {
						subtotal += priceComponent.custom_price;
					} else {
						subtotal += priceComponent.actual_price;
					}

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
			something = SidebarKeyList.map((k) => {
				if(this.props.context.componentPrice.has(k.value)) {
					priceComponent = this.props.context.componentPrice.get(k.value);
					let priceToUse: number = 0.00;
					if(Number(priceComponent.custom_price) > priceComponent.actual_price) {
						priceToUse = Number(priceComponent.custom_price);
						subtotal += Number(priceComponent.custom_price);
					} else {
						priceToUse = priceComponent.actual_price;
						subtotal += priceComponent.actual_price;
					}
					return this.renderPriceComponents(k.label, priceToUse)
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