import {TypeGuards} from '../Enums/TypeGuards';
import {
	Drawers,
	DrawersValidationError,
	MeasurementDetails,
} from '../State';
import {Validation} from './Validation';
import {MAX_DRAWERS} from "../constants/ProductDetails";

export class DrawerValidation extends Validation {

	private drawer_details: Drawers | null;
	private drawer_measurement: MeasurementDetails[];
	private errors: DrawersValidationError[];

	private num_of_drawers: number;
	private max_list_of_qty: number[];
	private list_of_qty: number[];

	constructor(drawer: Drawers) {
		super();

		this.drawer_details = drawer;
		this.drawer_measurement = drawer.measurement;

		this.num_of_drawers = Number(drawer.quantity);
		this.errors = [];
		this.list_of_qty = [];

		this.createListOfErrors();
	}

	private createListOfErrors(): void {
		this.max_list_of_qty = Array.from(Array(MAX_DRAWERS).keys());

		this.max_list_of_qty.forEach((i) => {
			this.errors.push(
				{
					type: this.determineErrorNum(i),
					e_length: '', e_quantity: '', e_width: '',
					e_height: ''
				}
			)
		});
	}

	public validate(): boolean {
		const list_of_validation: boolean[] = [];
		this.checkQuantity();
		if (!Number.isNaN(this.num_of_drawers) && this.list_of_qty.length > 1) {
			this.checkLength();
			this.checkWidth();
			this.checkHeight();

			this.list_of_qty.forEach((i) => {
				list_of_validation.push(this.errors[i].e_length.length === 0 &&
					this.errors[i].e_quantity.length === 0 &&
					this.errors[i].e_height.length === 0 &&
					this.errors[i].e_width.length === 0);
			});
		} else {
			// quantity invalid
			list_of_validation.push(true);
		}

		return !list_of_validation.includes(false);
	}

	public getErrors(): DrawersValidationError[] {
		return this.errors;
	}

	public getSpecificError(idx: number): DrawersValidationError {
		return this.errors[idx];
	}

	private checkQuantity() {
		const {quantity} = this.drawer_details;
		if (String(quantity).length === 0 || quantity === undefined) {
			this.errors[0].e_quantity = 'Drawer quantity cannot be blank';
		} else if (Number(quantity) === 1) {
			this.errors[0].e_quantity = 'Drawer quantity must be greater than 1';
		} else {
			this.list_of_qty = Array.from(Array(this.num_of_drawers).keys());
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 */
	private checkLength() {
		const length_arr: number[] = [];

		this.list_of_qty.forEach((i) => {
			const curr: MeasurementDetails = this.drawer_measurement[i];
			if (String(curr.length).length === 0 || curr.length === undefined) {
				this.errors[i].e_length = 'Drawer length cannot be blank';
			} else {
				if (curr.length !== null || curr.length !== undefined) {
					length_arr.push(Number(curr.length));
				}
			}
		});
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab width(s)
	 */
	private checkWidth() {
		const width_arr: number[] = [];

		this.list_of_qty.forEach((i) => {
			const curr = this.drawer_measurement[i];
			if (String(curr.width).length === 0 || curr.width === undefined) {
				this.errors[i].e_width = 'Drawer width cannot be blank';
			} else {
				if (curr.width !== null || curr.width !== undefined) {
					width_arr.push(Number(curr.width));
				}
			}
		});
	}

	private checkHeight() {
		const height_arr: number[] = [];

		this.list_of_qty.forEach((i) => {
			const curr = this.drawer_measurement[i];
			if (String(curr.height).length === 0 || curr.height === undefined) {
				this.errors[i].e_height = 'Drawer height cannot be blank';
			} else {
				if (curr.height !== null || curr.height !== undefined) {
					height_arr.push(Number(curr.height));
				}
			}
		});
	}

	private determineErrorNum(num: number): TypeGuards {
		switch (num) {
			case 0:
				return TypeGuards.DRAWERS_VALIDATION_ERROR;
			case 1:
				return TypeGuards.DRAWERS_VALIDATION_ERROR_2;
			case 2:
				return TypeGuards.DRAWERS_VALIDATION_ERROR_3;
			case 3:
				return TypeGuards.DRAWERS_VALIDATION_ERROR_4;
		}
	}
}