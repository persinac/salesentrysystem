import {TypeGuards} from '../Enums/TypeGuards';
import {Cabinet, Legs, LegsValidationError, MeasurementDetails, Tops, TopValidationError} from '../State';
import {Validation} from './Validation';
import {MAX_LEGS, MAX_TOPS} from "../constants/ProductDetails";
import {MeasurementHelper} from "../Utility/MeasurementHelper";

export class LegsValidation extends Validation {

	private leg_details: Legs | null;
	private legs_measurement: MeasurementDetails[];
	private errors: LegsValidationError[];

	private num_of_legs: number;
	private max_list_of_qty: number[];
	private list_of_qty: number[];

	constructor(leg: Legs) {
		super();

		this.leg_details = leg;
		this.legs_measurement = leg.measurement;

		this.num_of_legs = Number(leg.quantity);
		this.errors = [];
		this.list_of_qty = leg.quantity ? Array.from(Array(this.num_of_legs).keys()) : [];
		this.createListOfErrors();
	}

	private createListOfErrors(): void {
		this.max_list_of_qty = Array.from(Array(MAX_LEGS).keys());

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
		// this.checkQuantity();
		this.checkLength();
		this.checkWidth();
		this.checkHeight();

		const list_of_validation: boolean[] = [];

		this.list_of_qty.forEach((i) => {
			list_of_validation.push(this.errors[i].e_length.length === 0 &&
				this.errors[i].e_quantity.length === 0 &&
				this.errors[i].e_height.length === 0 &&
				this.errors[i].e_width.length === 0)
		});

		return !list_of_validation.includes(false);
	}

	public getErrors(): LegsValidationError[] {
		return this.errors;
	}

	public getSpecificError(idx: number): LegsValidationError {
		return this.errors[idx];
	}

	private checkQuantity() {
		const {quantity} = this.leg_details;
		if (String(quantity).length === 0) {
			this.errors[0].e_quantity = 'Leg quantity cannot be blank';
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 */
	private checkLength() {
		const length_arr: number[] = [];

		this.list_of_qty.forEach((i) => {
			const curr = this.legs_measurement[i];
			if (String(curr.length).length === 0 || curr.length === undefined) {
				this.errors[i].e_length = 'Leg length cannot be blank';
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
			const curr = this.legs_measurement[i];
			if (String(curr.width).length === 0 || curr.width === undefined) {
				this.errors[i].e_width = 'Leg width cannot be blank';
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
			const curr = this.legs_measurement[i];
			if (String(curr.height).length === 0 || curr.height === undefined) {
				this.errors[i].e_height = 'Leg height cannot be blank';
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
				return TypeGuards.LEGS_VALIDATION_ERROR;
			case 1:
				return TypeGuards.LEGS_VALIDATION_ERROR_2;
			case 2:
				return TypeGuards.LEGS_VALIDATION_ERROR_3;
			case 3:
				return TypeGuards.LEGS_VALIDATION_ERROR_4;
			case 4:
				return TypeGuards.LEGS_VALIDATION_ERROR_5;
		}
	}
}
