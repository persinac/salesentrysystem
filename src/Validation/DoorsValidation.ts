import {TypeGuards} from '../Enums/TypeGuards';
import {
	Cabinet,
	Doors,
	DoorsValidationError,
	Drawers,
	DrawersValidationError,
	Tops,
	TopValidationError
} from '../State';
import {Validation} from './Validation';

export class DoorsValidation extends Validation {

	private door_details: Doors;
	private errors: DoorsValidationError;

	constructor(dr: Doors) {
		super();

		this.door_details = dr;
		this.errors = {
			type: TypeGuards.DOORS_VALIDATION_ERROR,
			e_length: '', e_width: '', e_quantity: '', e_height: ''
		};
	}

	public validate(): boolean {
		this.checkQuantity();
		this.checkLength();
		this.checkWidth();
		this.checkHeight();

		return (this.errors.e_length.length === 0 &&
			this.errors.e_quantity.length === 0 &&
			this.errors.e_height.length === 0 &&
			this.errors.e_width.length === 0
		);
	}

	public getErrors(): DoorsValidationError {
		return this.errors;
	}

	private checkQuantity() {
		const {quantity} = this.door_details;
		if (String(quantity).length === 0) {
			this.errors.e_quantity = 'Door quantity cannot be blank';
		} else if (Number(quantity) < 2) {
			this.errors.e_quantity = 'Door quantity must be greater than 2';
		} else if (Number(quantity) > 8) {
			this.errors.e_quantity = 'Door quantity must be less than 8';
		}
	}

	/***
	 * This will need to be updated once multiple UNIQUE drawer measurements are entered
	 */
	private checkLength() {
		const {length} = this.door_details;
		if (String(length).length === 0) {
			this.errors.e_length = 'Door length cannot be blank';
		}
	}

	/***
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab width(s)
	 */
	private checkWidth() {
		const {width} = this.door_details;
		if (String(width).length === 0) {
			this.errors.e_width = 'Door width cannot be blank';
		}
	}

	/***
	 * Is this one even necessary???
	 *
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab heights
	 */
	private checkHeight() {
		const {width} = this.door_details;
		if (String(width).length === 0) {
			this.errors.e_height = 'Door height cannot be blank';
		}
	}
}
