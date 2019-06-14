import React from 'react';
import {SalesEntryForm} from './SalesEntryForm';
import '../../styles/general.css';
import Accordion from 'react-bootstrap/Accordion';
import {
	Roles, SalesEntryState,
} from '../../State';
import {newSalesEntryContext} from "../../Context/NewSalesEntryContext";

interface IProps {
	submitHandler: any;
}

interface IState {
	roles: Roles;
	height?: string;
}

export class SalesEntryFormComponent extends React.Component<IProps, IState> {
	private static INITIAL_STATE = {
		height: '',
		roles: {
			isAdmin: true,
			isSales: true
		}
	};

	constructor(props: any) {
		super(props);

		this.state = {...SalesEntryFormComponent.INITIAL_STATE};
	}

	public componentDidMount() {}

	public render() {
		return (
			<newSalesEntryContext.Consumer>
				{context => (<div className={'margin-t-10 row'}>
					<div className={'width-100'}>
						<Accordion>
							{this.renderCards(context)}
						</Accordion>
						<div className={'floater-rght'}>
							<button type='button' className='btn btn-outline-primary margin-t-10'
							        onClick={(e) => this.props.submitHandler(e, false)}>Save Order
							</button>
							<button type='button' className='btn btn-outline-success margin-t-10 margin-l-10'
							        onClick={(e) => this.props.submitHandler(e, true)}>Submit Order
							</button>
						</div>
					</div>
				</div>)
				}
			</newSalesEntryContext.Consumer>
		);
	}

	private renderCards(context: SalesEntryState) {
		if (context.categories && context.productDetails) {
			const filteredPrimaryCats = context.categories.filter((filter: any) => filter.category_hierarchy === 1);
			const eles = filteredPrimaryCats.map((cat: any) => {
				return <SalesEntryForm
					category_id={cat.category_id}
					category_title={cat.category}
					context={context}
				/>;
			});
			return (eles);
		} else {
			return null;
		}
	}
}