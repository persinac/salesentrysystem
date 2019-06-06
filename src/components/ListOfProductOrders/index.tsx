import * as React from 'react';
import '../../styles/general.css';
import {ProductHeader, QuestionValues} from '../../State';
import {ListOfProductOrders} from './ListOfProductOrders';
import {withAuthorization} from "../../Firebase/withAuthorization";

const rp = require('request-promise');

const baseURL = 'https://wrf-center.com/api/';
const devBaseURL = 'http://localhost:8080/';

interface IProps {
}

interface IState {
	productHeader: ProductHeader[];
}

class ListOfProductOrdersComponent extends React.Component<IProps, IState> {

	constructor(props: any) {
		super(props);

		this.setState({productHeader: []})
	}

	public componentDidMount() {
		const productURL = devBaseURL + 'product';
		this.getWRFServerData(productURL).then(d => {
			const parsedD = JSON.parse(d);
			this.setState({productHeader: parsedD});
		});
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
			<div className={'container'}>
				<div className={'row'}>
				<div className={'width-100'}>
					{this.renderList()}
				</div>
			</div>
			</div>
		);
	}

	private renderList() {
		if (this.state !== null) {
			return <ListOfProductOrders productHeader={this.state.productHeader} />
		}
	}
}

export const listOfProductOrdersPage = ListOfProductOrdersComponent;
