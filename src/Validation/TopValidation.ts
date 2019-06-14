import {TypeGuards} from '../Enums/Enums';
import {Cabinet, Tops, TopValidationError} from '../State';
import {Validation} from './Validation';

export class TopValidation extends Validation {

	private cab_details: Cabinet | null;
	private top_details: Tops;
	private errors: TopValidationError;

	constructor(cabinet: Cabinet | null, top: Tops) {
		super();

		this.cab_details = cabinet;
		this.top_details = top;
		this.errors = {
			type: TypeGuards.TOP_VALIDATION_ERROR,
			e_length: '', e_quantity: '', e_width: ''
		};
	}

	public validate(): boolean {
		this.checkQuantity();
		this.checkLength();
		this.checkWidth();

		return (this.errors.e_length.length === 0 &&
			this.errors.e_quantity.length === 0 &&
			this.errors.e_width.length === 0
		);
	}

	public getErrors(): TopValidationError {
		return this.errors;
	}

	private checkQuantity() {
		const {quantity} = this.top_details;
		if (String(quantity).length === 0) {
			this.errors.e_quantity = 'Top quantity cannot be blank';
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 */
	private checkLength() {
		const {length} = this.top_details;
		const {length: cab_length, quantity} = this.cab_details;
		if (String(length).length === 0) {
			this.errors.e_length = 'Top length cannot be blank';
		} else if (Number(length) <= ((Number(cab_length) * Number(quantity)) + 2)) {
			this.errors.e_length = 'Top length must be greater than total cabinet length by 2in';
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab width(s)
	 */
	private checkWidth() {
		const {width} = this.top_details;
		const {width: cab_width} = this.cab_details;
		if (String(width).length === 0) {
			this.errors.e_width = 'Top width cannot be blank';
		} else if (Number(width) <= (Number(cab_width) + 2)) {
			this.errors.e_width = 'Top width must be greater than max cabinet width by 2in';
		}
	}
}
