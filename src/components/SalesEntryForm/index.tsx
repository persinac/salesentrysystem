import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {auth, db} from '../../Firebase';
import {withAuthorization} from '../../Firebase/withAuthorization';
import {SalesEntryForm} from './SalesEntryForm';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import '../../styles/general.css';
import Accordion from 'react-bootstrap/Accordion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faLongArrowAltDown, faLongArrowAltUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {Questions, QuestionValues, Roles} from '../../State';

const rp = require('request-promise');

const baseURL = 'https://wrf-center.com/api/';
const devBaseURL = 'http://localhost:8080/';

interface IProps {
	email?: string;
	error?: any;
	history?: any;
	password?: string;
	height?: string;
}

interface IState {
	email: string;
	error: any;
	password: string;
	roles: Roles;
	data: any;
	questions?: Questions[];
	questionValues?: Map<number, QuestionValues>;
	categories?: any;
	secondary_categories?: any;
	height?: string;
	doesContainShow?: boolean;
}

export class SalesEntryFormComponent extends React.Component<IProps, IState> {
	private static INITIAL_STATE = {
		email: '',
		error: {},
		password: '',
		height: '',
		roles: {
			isAdmin: true,
			isSales: true
		},
		data: {},
		doesContainShow: false
	};

	constructor(props: any) {
		super(props);

		this.state = {...SalesEntryFormComponent.INITIAL_STATE};
	}

	public componentDidMount() {
		const questionUrl = baseURL + 'question';
		this.getWRFServerData(questionUrl).then(d => {
			const parsedD = JSON.parse(d);
			this.setState({questions: parsedD});
			if (parsedD) {
				let qVals: Map<number, QuestionValues> = new Map;
				parsedD.forEach((e: any) => {
					qVals.set(e.q_id, {[e.short_name]: ''});
				});
				this.setState({questionValues: qVals});
			}
		});

		const catUrl = baseURL + 'category/';
		this.getWRFServerData(catUrl).then(d => {
				const parsedD = JSON.parse(d);
				if (parsedD) {
					this.setState({categories: parsedD});
				}
			}
		);
	}

	public onSubmit = (event: any) => {
		if (!this.state.height) {
			this.setState({height: '34.5'});
		}
		event.preventDefault();
	};

	public getWRFServerData = (builtURI: string): Promise<any> => {
		return rp(builtURI)
			.then((d: any) => {
				return d;
			})
			.catch((e: any) => {
				console.log('ERROR!!!!');
				console.log(e);
			});
	};

	public render() {
		const {email, password, error, data, height, questions} = this.state;
		return (
			<div className={'margin-t-10 row'}>
				<div className={'width-100'}>
					<Accordion>
						{this.renderCards()}
					</Accordion>
					<div className={'floater-rght'}>
						<button type='button' className='btn btn-outline-primary margin-t-10'>Save Order</button>
						<button type='button' className='btn btn-outline-success margin-t-10 margin-l-10'>Submit Order</button>
					</div>
				</div>
			</div>
		);
	}

	private renderCards() {
		if (this.state.questionValues && this.state.categories) {
			const filteredPrimaryCats = this.state.categories.filter((filter: any) => filter.category_hierarchy === 1);
			const eles = filteredPrimaryCats.map((cat: any) => {
				const filteredSecondaryCats = this.state.categories.filter((filter: any) => filter.belongs_to === cat.category_id);
				return <SalesEntryForm
					category_id={cat.category_id}
					category_title={cat.category}
					secondary_categories={filteredSecondaryCats}
					all_categories={this.state.categories}
					questions={this.state.questions}
					questionValues={this.state.questionValues}/>;
			});
			return (eles);
		} else {
			return null;
		}
	}

	private static propKey(propertyName: string, value: any): object {
		return {[propertyName]: value};
	}
}

const authCondition = (authUser: any) => {
	console.log('AUTH CONDITION');
	console.log(authUser);
	console.log(authUser.roles);
	console.log(ROLES.ADMIN);
	console.log(authUser.roles[ROLES.ADMIN]);
	return authUser && !!authUser.roles[ROLES.ADMIN] || !!authUser.roles[ROLES.SALES];
};

const defaultRouteRedirect = (authUser: any) => {
	console.log('DEFAULT REDIRECT - ADMIN INDEX');
	console.log(authUser);
	console.log(authUser.roles);
	console.log(ROLES.ADMIN);
	let route = routes.SIGN_IN;
	if (authUser) {
		if (!!authUser.roles[ROLES.ADMIN]) {
			route = routes.ADMIN;
		} else if (!!authUser.roles[ROLES.SALES]) {
			route = routes.ACCOUNT;
		} else {
			route = routes.SIGN_IN;
		}
	}
	return route;
};
