import React from 'react';
import '../../styles/general.css';
import {
	Roles, SalesEntryState,
} from '../../State';
import {newSalesEntryContext} from "../../Context/NewSalesEntryContext";
import {SalesEntryForm} from "../SalesEntryForm/SalesEntryForm";
import {OrderSummary} from "./OrderSummary";

interface IProps {
	submitHandler: any;
	priceConstructor: any;
	cabinetConstructor: any;
}

interface IState {
	roles: Roles;
	height?: string;
}

export class OrderSummaryComponent extends React.Component<IProps, IState> {
	private static INITIAL_STATE = {
		height: '',
		roles: {
			isAdmin: true,
			isSales: true
		}
	};

	constructor(props: any) {
		super(props);

		this.state = {...OrderSummaryComponent.INITIAL_STATE};
	}

	public componentDidMount() {}

	public render() {
		return (
			<newSalesEntryContext.Consumer>
				{context => (<div className={'margin-t-10 row'}>
					<div className={'width-100'}>
						{this.renderCards(context)}
					</div>
				</div>)
				}
			</newSalesEntryContext.Consumer>
		);
	}

	private renderCards(context: SalesEntryState) {
		if (context.categories && context.productDetails) {
			return <OrderSummary context={context}/>;
		} else {
			return null;
		}
	}
}