import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import Card from 'react-bootstrap/Card';
import {Customer, CustomerValidationError} from "../../State";
import {ErrorWrapper} from "../ErrorWrapper/ErrorWrapper";


interface InterfaceProps {
	users?: any;
	some_data?: any;
	customer?: Customer;
	customerHandler?: any;
	customerErrors?: CustomerValidationError;
}

interface IState {
	doesContainShow?: boolean;
}

export class CustomerEntry extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {doesContainShow: false};
	};

	componentDidMount(): void {}

	public render() {
		return this.renderCard();
	}

	private renderCard() {
		const {primary_email, name, phone_number, shipping_address} = this.props.customer;
		console.log(this.props.customerErrors);
		return (
			<div className={'the-lonely-card'}>
				<Card>
					<Card.Header>Customer Information</Card.Header>
					<Card.Body>
						<div className={'row'}>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'cust-q-1'}
									value={primary_email}
									onChange={(event: any) => this.props.customerHandler(event, 'primary_email')}
									type='text'
									placeholder={'email'}
									className={'form-control'}
								/>
							</div>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'cust-q-2'}
									value={name}
									onChange={(event: any) => this.props.customerHandler(event, 'name')}
									type='text'
									placeholder={'name'}
									className={'form-control'}
								/>
								<ErrorWrapper errorMessage={this.props.customerErrors.e_name} id={'cust-q-2'}/>
							</div>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'cust-q-3'}
									value={phone_number}
									onChange={(event: any) => this.props.customerHandler(event, 'phone_number')}
									type='text'
									placeholder={'primary_phone_number'}
									className={'form-control'}
								/>
								<ErrorWrapper errorMessage={this.props.customerErrors.e_phone_number} id={'cust-q-3'}/>
							</div>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'cust-q-4'}
									value={shipping_address}
									onChange={(event: any) => this.props.customerHandler(event, 'shipping_address')}
									type='text'
									placeholder={'shipping_address'}
									className={'form-control'}
								/>
								<ErrorWrapper errorMessage={this.props.customerErrors.e_shipping_address} id={'cust-q-4'}/>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
