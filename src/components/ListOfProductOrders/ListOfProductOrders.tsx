import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import {ProductHeader} from "../../State";
import * as ROUTES from "../../constants/routes";
import {Link} from "react-router-dom";


interface InterfaceProps {
	productHeader?: ProductHeader[];
}

interface IState {
	doesContainShow?: boolean;
}

export class ListOfProductOrders extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {doesContainShow: false};
	}

	componentDidMount(): void {}

	public render() {
		return this.renderCard();
	}

	private renderCard() {
		const {productHeader} = this.props;
		return (
			<div className={'table-responsive'}>
				<table className={'table table-striped table-sm'}>
					<thead>
						<tr>
							<th>ID</th>
							<th>Ref #</th>
							<th>Order Status</th>
							<th>Created By</th>
							<th>Created On</th>
							<th>Last Updated On</th>
						</tr>
					</thead>
					<tbody>
						{this.buildProductHeaderTRs()}
					</tbody>
				</table>
			</div>
		);
	}

	private buildProductHeaderTRs() {
		const {productHeader} = this.props;
		if(productHeader) {
			let trs = productHeader.map((ph: any) => {
				return (
					<tr>
						<td><Link to={`${ROUTES.SALES_ENTRY_FORM}?${ph['ph_id']}`}>{ph['ph_id']}</Link></td>
						<td>{ph['reference_number']}</td>
						<td>{ph['status']}</td>
						<td>{ph['created_by']}</td>
						<td>{ph['created_on']}</td>
						<td>{ph['updated_on']}</td>
					</tr>
				)
			});
			return trs;
		}
	}
}
