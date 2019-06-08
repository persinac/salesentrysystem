import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {auth, db} from '../../Firebase';
import {withAuthorization} from '../../Firebase/withAuthorization';
import {CustomerEntry} from './CustomerEntry';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import '../../styles/general.css';
import Accordion from 'react-bootstrap/Accordion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faLongArrowAltDown, faLongArrowAltUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {Customer, Questions, QuestionValues, Roles} from '../../State';

const rp = require('request-promise');

interface IProps {
	email?: string;
	error?: any;
	history?: any;
	password?: string;
	height?: string;
	customer?: Customer;
	customerHandler?: any;
}

interface IState {
	email: string;
	error: any;
	password: string;
	roles: Roles;
	data: any;
}

export class CustomerEntryComponent extends React.Component<IProps, IState> {
	private static INITIAL_STATE = {
		email: '',
		error: {},
		password: '',
		roles: {
			isAdmin: true,
			isSales: true
		},
		data: {}
	};

	constructor(props: any) {
		super(props);

		this.state = {...CustomerEntryComponent.INITIAL_STATE};
	}

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
		return (
			<div className={'row'}>
				<div className={'width-100'}>
					<CustomerEntry customer={this.props.customer} customerHandler={this.props.customerHandler}/>
				</div>
			</div>
		);
	}
}
