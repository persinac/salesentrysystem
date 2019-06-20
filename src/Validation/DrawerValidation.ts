import {TypeGuards} from '../Enums/TypeGuards';
import {Cabinet, Drawers, DrawersValidationError, Tops, TopValidationError} from '../State';
import {Validation} from './Validation';

export class DrawerValidation extends Validation {

	private cab_details: Cabinet | null;
	private drawer_details: Drawers;
	private errors: DrawersValidationError;

	constructor(cabinet: Cabinet | null, dwr: Drawers) {
		super();

		this.cab_details = cabinet;
		this.drawer_details = dwr;
		this.errors = {
			type: TypeGuards.DRAWERS_VALIDATION_ERROR,
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

	public getErrors(): DrawersValidationError {
		return this.errors;
	}

	private checkQuantity() {
		const {quantity} = this.drawer_details;
		if (String(quantity).length === 0) {
			this.errors.e_quantity = 'Drawer quantity cannot be blank';
		} else if (Number(quantity) < 2) {
			this.errors.e_quantity = 'Drawer quantity must be greater  than 2';
		} else if (Number(quantity) > 4) {
			this.errors.e_quantity = 'Drawer quantity must be less than 4';
		}
	}

	/***
	 * This will need to be updated once multiple UNIQUE drawer measurements are entered
	 */
	private checkLength() {
		const {length} = this.drawer_details;
		const {length: cab_length, quantity: cab_qty} = this.cab_details;
		if (String(length).length === 0) {
			this.errors.e_length = 'Drawer length cannot be blank';
		} else if (Number(length) >= Number(cab_length)) {
			this.errors.e_length = 'Drawer length must be less than or equal to cabinet length';
		}
	}

	/***
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab width(s)
	 */
	private checkWidth() {
		const {width} = this.drawer_details;
		const {width: cab_width} = this.cab_details;
		if (String(width).length === 0) {
			this.errors.e_width = 'Drawer width cannot be blank';
		} else if (Number(width) >= Number(cab_width)) {
			this.errors.e_width = 'Drawer width must be less than or equal to cabinet width';
		}
	}

	/***
	 * Is this one even necessary???
	 *
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab heights
	 */
	private checkHeight() {
		const {height} = this.drawer_details;
		const {height: cab_height} = this.cab_details;
		if (String(height).length === 0) {
			this.errors.e_height = 'Drawer height cannot be blank';
		} else if (Number(height) >= Number(cab_height)) {
			this.errors.e_height = 'Drawer height must be less than or equal to cabinet height';
		}
	}
}
