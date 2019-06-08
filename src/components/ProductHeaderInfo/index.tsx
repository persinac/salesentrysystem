import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {auth, db} from '../../Firebase';
import {withAuthorization} from '../../Firebase/withAuthorization';
import * as ROLES from '../../constants/roles';
import * as routes from '../../constants/routes';
import '../../styles/general.css';
import Accordion from 'react-bootstrap/Accordion';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown, faLongArrowAltDown, faLongArrowAltUp, faUser} from '@fortawesome/free-solid-svg-icons';
import {ProductHeader, Questions, QuestionValues, Roles} from '../../State';
import {ProductHeaderInfo} from "./ProductHeaderInfo";

const rp = require('request-promise');

interface IProps {
	email?: string;
	error?: any;
	history?: any;
	password?: string;
	height?: string;
	productHeader: ProductHeader;
	phHandler: any;
}

interface IState {
	email: string;
	error: any;
	password: string;
	roles: Roles;
	data: any;
}

export class ProductHeaderComponent extends React.Component<IProps, IState> {
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

		this.state = {...ProductHeaderComponent.INITIAL_STATE};
	}

	public onSubmit = (event: any) => {
		console.log(event);
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
		return (
			<div className={'row'}>
				<div className={'width-100'}>
					<ProductHeaderInfo productHeader={this.props.productHeader} phHandler={this.props.phHandler}/>
				</div>
			</div>
		);
	}
}
