import {Validation} from "./Validation";
import {Customer, CustomerValidationError} from "../State";

export class CustomerValidation extends Validation{

	private customer: Customer;
	private errors: CustomerValidationError;

	constructor(customer: Customer) {
		super();

		this.customer = customer;
		this.errors = {e_name: '', e_phone_number: '', e_shipping_address: ''};
	}

	public validate(): boolean {
		this.checkName();
		this.checkPrimaryPhone();
		this.checkShipping();

		return (this.errors.e_name.length === 0 &&
				this.errors.e_shipping_address.length === 0 &&
				this.errors.e_phone_number.length === 0
		);
	}

	public getErrors(): CustomerValidationError {
		return this.errors;
	}

	private checkShipping() {
		const {shipping_address} = this.customer;
		if (shipping_address.length === 0) {
			this.errors.e_shipping_address = 'Shipping address cannot be blank';
		}
	}

	private checkName() {
		const {name} = this.customer;
		if (name.length === 0) {
			this.errors.e_name = 'Name cannot be blank';
		}
	}

	private checkPrimaryPhone() {
		let regexp: RegExp = new RegExp('^[0-9]*$');
		const {phone_number} = this.customer;
		if (phone_number.length === 0) {
			this.errors.e_phone_number = 'Phone number cannot be blank';
		} else if (!regexp.test(phone_number)) {
			this.errors.e_phone_number = 'Phone number can only include numbers';
		}
	}

	private salesFolioNumber() {
		return '';
	}
}
