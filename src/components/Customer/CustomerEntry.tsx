import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import * as React from "react";
import Card from 'react-bootstrap/Card';
import {Customer} from "../../State";


interface InterfaceProps {
	users?: any;
	some_data?: any;
	customer?: Customer;
	customerHandler?: any;
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
		const {email, name, primary_phone_number, shipping_address} = this.props.customer;
		// console.log(this.state);
		return (
			<div className={'the-lonely-card'}>
				<Card>
					<Card.Header>Customer Information</Card.Header>
					<Card.Body>
						<div className={'row'}>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'cust-q-1'}
									value={email}
									onChange={(event: any) => this.props.customerHandler(event, 'email')}
									type='text'
									placeholder={'email'}
									className='form-control'
								/>
							</div>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'cust-q-2'}
									value={name}
									onChange={(event: any) => this.props.customerHandler(event, 'name')}
									type='text'
									placeholder={'name'}
									className='form-control'
								/>
							</div>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'cust-q-3'}
									value={primary_phone_number}
									onChange={(event: any) => this.props.customerHandler(event, 'primary_phone_number')}
									type='text'
									placeholder={'primary_phone_number'}
									className='form-control'
								/>
							</div>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'cust-q-4'}
									value={shipping_address}
									onChange={(event: any) => this.props.customerHandler(event, 'shipping_address')}
									type='text'
									placeholder={'shipping_address'}
									className='form-control'
								/>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		);
	}
}
