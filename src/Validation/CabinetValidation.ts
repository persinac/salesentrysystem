import {TypeGuards} from '../Enums/Enums';
import {Cabinet, CabinetsValidationError, Tops} from '../State';
import {Validation} from './Validation';

export class CabinetValidation extends Validation {

	private cab_details: Cabinet;
	private top_details: Tops | null;
	private errors: CabinetsValidationError;

	constructor(cabinet: Cabinet, top: Tops | null) {
		super();

		this.cab_details = cabinet;
		this.top_details = top;
		this.errors = {
			type: TypeGuards.CABINET_VALIDATION_ERROR,
			e_height: '', e_length: '', e_paint_color: '',
			e_quantity: '', e_stain_color: '', e_width: ''
		};
	}

	public validate(): boolean {
		this.checkQuantity();
		this.checkLength();
		this.checkWidth();

		return (this.errors.e_height.length === 0 &&
			this.errors.e_length.length === 0 &&
			this.errors.e_paint_color.length === 0 &&
			this.errors.e_quantity.length === 0 &&
			this.errors.e_stain_color.length === 0 &&
			this.errors.e_width.length === 0
		);
	}

	public getErrors(): CabinetsValidationError {
		return this.errors;
	}

	private checkQuantity() {
		const {quantity} = this.cab_details;
		if (String(quantity).length === 0) {
			this.errors.e_quantity = 'Cabinet quantity cannot be blank';
		} else if (quantity > 4) {
			this.errors.e_quantity = 'Cannot have more than 4 cabinets';
		} else if (quantity < 1) {
			this.errors.e_quantity = 'Must have at least 1 cabinet';
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 */
	private checkLength() {
		const {length, quantity} = this.cab_details;
		const {length: top_length} = this.top_details;
		if (String(length).length === 0) {
			this.errors.e_length = 'Cabinet length cannot be blank';
		} else if ((Number(length) * Number(quantity)) > (Number(top_length) - 2)) {
			this.errors.e_length = 'Total cabinet length must be less than top length by 2in';
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
		if (String(cab_width).length === 0) {
			this.errors.e_width = 'Cabinet width cannot be blank';
		} else if (Number(width) <= (Number(cab_width) + 2)) {
			this.errors.e_width = 'Cabinet width must be greater than Top width by 2in';
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 */
	private checkHeight() {
		const {height} = this.cab_details;
		if (String(height).length === 0) {
			this.errors.e_height = 'Cabinet height cannot be blank';
		}
	}
}
