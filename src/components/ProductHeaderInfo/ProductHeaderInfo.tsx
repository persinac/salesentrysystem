import {faLongArrowAltDown, faLongArrowAltUp} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import Card from 'react-bootstrap/Card';
import {ProductHeader, ProductHeaderValidationError} from "../../State";
import {ErrorWrapper} from "../ErrorWrapper/ErrorWrapper";


interface InterfaceProps {
	users?: any;
	some_data?: any;
	productHeader?: ProductHeader;
	productHeaderErrors?: ProductHeaderValidationError;
	phHandler?: any;
}

interface IState {
	doesContainShow?: boolean;
}

export class ProductHeaderInfo extends React.Component<InterfaceProps, IState> {
	constructor(props: any) {
		super(props);

		this.state = {doesContainShow: false};
	}

	componentDidMount(): void {}

	shouldComponentUpdate(nextProps: InterfaceProps, nextState: IState) {
		let didToggle = this.state.doesContainShow !== nextState.doesContainShow;

		const shouldRerender: boolean = !didToggle;
		return shouldRerender;
	}

	public render() {
		return this.renderCard();
	}

	private renderCard() {
		const {notes, reference_number} = this.props.productHeader;
		console.log(this.props.productHeaderErrors);
		return (
			<div className={'the-lonely-card'}>
				<Card>
					<Card.Header>Primary Sales Information</Card.Header>
					<Card.Body>
						<div className={'row'}>
							<div className={`col-md-6 mb-3`}>
								<input
									id={'p-q-2'}
									value={reference_number}
									onChange={(event: any) => this.props.phHandler(event, 'reference_number')}
									type='text'
									placeholder={'reference_number'}
									className={'form-control'}
								/>
								<ErrorWrapper errorMessage={this.props.productHeaderErrors.e_reference_number} id={'p-q-2'}/>
							</div>
							<div className={`col-md-12 mb-3`}>
								<textarea
									id={'p-q-1'}
									value={notes}
									onChange={(event: any) => this.props.phHandler(event, 'notes')}
									placeholder={'notes'}
									className='form-control'
								/>
							</div>
						</div>
					</Card.Body>
				</Card>
			</div>
		);
	}

	private static propKey(propertyName: string, value: any): object {
		return {[propertyName]: value};
	}

	private setStateWithEvent(event: any, columnType: string): void {
		this.setState(ProductHeaderInfo.propKey(columnType, (event.target as any).value));
	}
}
