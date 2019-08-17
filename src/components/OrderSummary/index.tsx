import React from 'react';
import '../../styles/general.css';
import {
	Roles, SalesEntryState,
} from '../../State';
import {newSalesEntryContext} from "../../Context/NewSalesEntryContext";
import {OrderSummary} from "./OrderSummary";

interface IProps {
	submitHandler: any;
	priceConstructor: any;
	cabinetConstructor: any;
	customPrice?: boolean;
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
					{ this.props.customPrice ?
						<button
							type='button'
							className='btn btn-outline-secondary margin-t-10 margin-l-10 floater-rght'
							disabled={false}
							onClick={(e) => {this.props.submitHandler()}}>Save Custom Price
						</button> : null
					}
				</div>)
				}

			</newSalesEntryContext.Consumer>
		);
	}

	private renderCards(context: SalesEntryState) {
		if (context.categories && context.productDetails) {
			return (
				<div>
				<OrderSummary context={context} customPrice={this.props.customPrice}/>
				</div>
			);
		} else {
			return null;
		}
	}
}