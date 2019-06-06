import * as React from 'react';
import {SalesEntryForm} from './SalesEntryForm';
import '../../styles/general.css';
import Accordion from 'react-bootstrap/Accordion';
import {Questions, QuestionValues, Roles} from '../../State';

interface IProps {
	email?: string;
	error?: any;
	history?: any;
	password?: string;
	height?: string;
	questions?: Questions[];
	questionValues?: Map<number, QuestionValues>;
	categories?: any;
	secondary_categories?: any;
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

	public onSubmit = (event: any, validate: boolean) => {
		console.log(this.props.questionValues);
		event.preventDefault();
	};

	public render() {
		return (
			<div className={'margin-t-10 row'}>
				<div className={'width-100'}>
					<Accordion>
						{this.renderCards()}
					</Accordion>
					<div className={'floater-rght'}>
						<button type='button' className='btn btn-outline-primary margin-t-10' onClick={(e)=>this.onSubmit(e, false)}>Save Order</button>
						<button type='button' className='btn btn-outline-success margin-t-10 margin-l-10' onClick={(e)=>this.onSubmit(e, true)}>Submit Order</button>
					</div>
				</div>
			</div>
		);
	}

	private renderCards() {
		if (this.props.questionValues && this.props.categories) {
			const filteredPrimaryCats = this.props.categories.filter((filter: any) => filter.category_hierarchy === 1);
			const eles = filteredPrimaryCats.map((cat: any) => {
				return <SalesEntryForm
					category_id={cat.category_id}
					category_title={cat.category}
					all_categories={this.props.categories}
					questions={this.props.questions}
					questionValues={this.props.questionValues}/>;
			});
			return (eles);
		} else {
			return null;
		}
	}
}
