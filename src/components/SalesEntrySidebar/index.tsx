import React from 'react';
import '../../styles/general.css';
import {
	PricingComponent,
	Roles, SalesEntryState,
} from '../../State';
import {Card} from "react-bootstrap";

interface IProps {
	submitHandler?: any;
	context?: SalesEntryState;
}

interface IState {
	roles: Roles;
	height?: string;
}

export class SalesEntrySidebarComponent extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);
	}

	public shouldComponentUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean {
		console.log('should update');
		return true;
	}

	public componentWillUpdate(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): void {
		console.log('will update')
	}

	public componentDidMount() {}

	public componentDidUpdate(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void {
		console.log(this.props.context.componentPrice);
	}

	public render() {
		let priceComponent: PricingComponent = {};
		if (this.props.context.componentPrice) {
			if(this.props.context.componentPrice.has('cabinet_size')) {
				priceComponent = this.props.context.componentPrice.get('cabinet_size');
			}
		}
		return (
			<div>
				<Card>
					<p className={'lead'}>{priceComponent.pd_id ? '$'+String(priceComponent.actual_price) : '$0.00'}</p>
				</Card>
			</div>
		);
	}
}