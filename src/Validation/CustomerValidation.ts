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

	public validate(): any {
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
		if (this.customer.shipping_address.length === 0) {
			this.errors.e_shipping_address = 'Shipping address cannot be blank';
		}
	}

	private checkName() {
		if (this.customer.name.length === 0) {
			this.errors.e_name = 'Name cannot be blank';
		}
	}

	private checkPrimaryPhone() {
		if (this.customer.phone_number.length === 0) {
			this.errors.e_phone_number = 'Phone number cannot be blank';
		}
	}

	private salesFolioNumber() {
		return '';
	}
}
