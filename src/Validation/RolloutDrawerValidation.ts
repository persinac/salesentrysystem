import {TypeGuards} from '../Enums/TypeGuards';
import {
	Drawers,
	DrawersValidationError,
	MeasurementDetails, RolloutDrawers, RolloutDrawersValidationError,
} from '../State';
import {Validation} from './Validation';
import {MAX_DRAWERS, MAX_RO_DRAWERS} from "../constants/ProductDetails";

export class RolloutDrawerValidation extends Validation {

	private ro_drawer_details: RolloutDrawers | null;
	private ro_drawer_measurement: MeasurementDetails[];
	private errors: RolloutDrawersValidationError[];

	private num_of_drawers: number;
	private max_list_of_qty: number[];
	private list_of_qty: number[];

	constructor(drawer: RolloutDrawers) {
		super();

		this.ro_drawer_details = drawer;
		this.ro_drawer_measurement = drawer.measurement;

		this.num_of_drawers = Number(drawer.quantity);
		this.errors = [];

		this.createListOfErrors();
	}

	private createListOfErrors(): void {
		this.max_list_of_qty = Array.from(Array(MAX_RO_DRAWERS).keys());

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
		if (!Number.isNaN(this.num_of_drawers)) {
			if (this.num_of_drawers > 0) {
				this.checkLength();
				this.checkWidth();
				this.checkHeight();

				this.list_of_qty.forEach((i) => {
					list_of_validation.push(this.errors[i].e_length.length === 0 &&
						this.errors[i].e_quantity.length === 0 &&
						this.errors[i].e_height.length === 0 &&
						this.errors[i].e_width.length === 0)
				});
			}
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
		const {quantity} = this.ro_drawer_details;
		if (String(quantity).length > 0 && quantity === undefined) {
			if (quantity > 6) {
				this.errors[0].e_quantity = 'Rollout Drawer quantity must be less than 6';
			}
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
			const curr: MeasurementDetails = this.ro_drawer_measurement[i];
			if (String(curr.length).length === 0 || curr.length === undefined) {
				this.errors[i].e_length = 'Rollout Drawer length cannot be blank';
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
			const curr = this.ro_drawer_measurement[i];
			if (String(curr.width).length === 0 || curr.width === undefined) {
				this.errors[i].e_width = 'Rollout Drawer width cannot be blank';
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
			const curr = this.ro_drawer_measurement[i];
			if (String(curr.height).length === 0 || curr.height === undefined) {
				this.errors[i].e_height = 'Rollout Drawer height cannot be blank';
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
				return TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR;
			case 1:
				return TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_2;
			case 2:
				return TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_3;
			case 3:
				return TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_4;
			case 4:
				return TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_5;
			case 5:
				return TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_6;
		}
	}
}
