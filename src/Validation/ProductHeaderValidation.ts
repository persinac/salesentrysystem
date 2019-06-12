import {Validation} from "./Validation";
import {ProductHeader, ProductHeaderValidationError} from "../State";

export class ProductHeaderValidation extends Validation{

	private product_header: ProductHeader;
	private errors: ProductHeaderValidationError;

	constructor(ph: ProductHeader) {
		super();

		this.product_header = ph;
		this.errors = {e_reference_number: ''};
	}

	public validate(): boolean {
		this.checkReferenceNumber();

		return (this.errors.e_reference_number.length === 0);
	}

	public getErrors(): ProductHeaderValidationError {
		return this.errors;
	}

	private checkReferenceNumber() {
		const {reference_number} = this.product_header;
		if (reference_number.length === 0) {
			this.errors.e_reference_number = 'Reference number cannot be blank';
		}
	}
}
