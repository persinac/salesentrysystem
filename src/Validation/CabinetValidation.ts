import {Validation} from "./Validation";
import {Cabinet, CabinetsValidationError, ProductDetails, Tops} from "../State";

export class CabinetValidation extends Validation{

	private cab_details: Cabinet;
	private top_details: Tops | null;
	private errors: CabinetsValidationError;

	constructor(cabinet: Cabinet, top: Tops | null) {
		super();

		this.cab_details = cabinet;
		this.top_details = top;
		this.errors = {
			e_height: '', e_length: '', e_paint_color: '',
			e_quantity: '', e_stain_color: '', e_width: ''
		};
	}

	public validate(): boolean {
		this.checkQuantity();
		this.checkLength();

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
		}
	}

	private checkLength() {
		const {front_length} = this.cab_details;
		const {length: top_length} = this.top_details;
		if (String(front_length).length === 0) {
			this.errors.e_length = 'Cabinet length cannot be blank';
		} else if (front_length > (top_length-2)) {
			this.errors.e_length = 'Cabinet length must be less than top length by 2in';
		}
	}
}
