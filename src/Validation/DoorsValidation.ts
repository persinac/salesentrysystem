import {TypeGuards} from '../Enums/TypeGuards';
import {
	Doors,
	DoorsValidationError, MeasurementDetails
} from '../State';
import {Validation} from './Validation';
import {MAX_DOORS} from "../constants/ProductDetails";
import {MeasurementHelper} from "../Utility/MeasurementHelper";

export class DoorsValidation extends Validation {

	private door_details: Doors;
	private door_measurements: MeasurementDetails[];
	private num_of_doors: number;
	private max_list_of_door_nums: number[];
	private list_of_door_nums: number[];
	private errors: DoorsValidationError[];

	constructor(dr: Doors) {
		super();

		this.door_details = dr;
		this.door_measurements = dr.measurement;
		this.num_of_doors = Number(dr.quantity);
		this.errors = [];
		this.list_of_door_nums = Array.from(Array(this.num_of_doors).keys());
		this.createListOfErrors()
	}

	public validate(): boolean {
		this.checkQuantity();
		this.checkLength();
		this.checkWidth();
		this.checkHeight();

		const list_of_validation: boolean[] = [];

		this.list_of_door_nums.forEach((i) => {
			list_of_validation.push(this.errors[i].e_height.length === 0 &&
				this.errors[i].e_length.length === 0 &&
				this.errors[i].e_paint_color.length === 0 &&
				this.errors[i].e_quantity.length === 0 &&
				this.errors[i].e_stain_color.length === 0 &&
				this.errors[i].e_width.length === 0)
		});
		return !list_of_validation.includes(false);
	}

	public getErrors(): DoorsValidationError[] {
		return this.errors;
	}

	public getSpecificError(idx: number): DoorsValidationError {
		return this.errors[idx];
	}

	private createListOfErrors(): void {
		this.max_list_of_door_nums = Array.from(Array(MAX_DOORS).keys());

		this.max_list_of_door_nums.forEach((i) => {
			this.errors.push(
				{
					type: this.determineErrorNum(i),
					e_height: '', e_length: '', e_paint_color: '',
					e_quantity: '', e_stain_color: '', e_width: ''
				}
			)
		});
	}

	private checkQuantity() {
		const {quantity} = this.door_details;
		if (String(quantity).length === 0) {
			this.errors[0].e_quantity = 'Door quantity cannot be blank';
		} else if (Number(quantity) < 2) {
			this.errors[0].e_quantity = 'Door quantity must be greater than 2';
		} else if (Number(quantity) > 8) {
			this.errors[0].e_quantity = 'Door quantity must be less than 8';
		}
	}

	/***
	 * This will need to be updated once multiple UNIQUE drawer measurements are entered
	 */
	private checkLength() {
		const length_arr: number[] = [];

		this.list_of_door_nums.forEach((i) => {
			const curr = this.door_measurements[i];
			if (String(curr.length).length === 0 || curr.length === undefined) {
				this.errors[i].e_length = 'Door length cannot be blank';
			} else {
				if (curr.length !== null || curr.length !== undefined) {
					length_arr.push(Number(curr.length));
				}
			}
		});

		// const arrSum: number = length_arr.reduce((a,b) => a + b, 0);
		// if (arrSum > (top_length - 2)) {
		// 	this.list_of_door_nums.forEach((i) => {
		// 		if (this.errors[i].e_length.length === 0) {
		// 			this.errors[i].e_length = 'Total cabinet length must be less than top length by 2in';
		// 		}
		// 	});
		// }
	}

	/***
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab width(s)
	 */
	private checkWidth() {
		const width_arr: number[] = [];

		this.list_of_door_nums.forEach((i) => {
			const curr = this.door_measurements[i];
			if (String(curr.width).length === 0 || curr.width === undefined) {
				this.errors[i].e_width = 'Door width cannot be blank';
			} else {
				if (curr.width !== null || curr.width !== undefined) {
					width_arr.push(Number(curr.width));
				}
			}
		});
	}

	/***
	 * Is this one even necessary???
	 *
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab heights
	 */
	private checkHeight() {
		const height_arr: number[] = [];

		this.list_of_door_nums.forEach((i) => {
			const curr = this.door_measurements[i];
			if (String(curr.height).length === 0  || curr.height === undefined) {
				this.errors[i].e_height = 'Door height cannot be blank';
			} else {
				if (curr.height !== null || curr.height !== undefined) {
					height_arr.push(Number(curr.width));
				}
			}
		});
	}

	private determineErrorNum(num: number): TypeGuards {
		switch (num) {
			case 0:
				return TypeGuards.DOORS_VALIDATION_ERROR;
			case 1:
				return TypeGuards.DOORS_VALIDATION_ERROR_2;
			case 2:
				return TypeGuards.DOORS_VALIDATION_ERROR_3;
			case 3:
				return TypeGuards.DOORS_VALIDATION_ERROR_4;
			case 4:
				return TypeGuards.DOORS_VALIDATION_ERROR_5;
			case 5:
				return TypeGuards.DOORS_VALIDATION_ERROR_6;
			case 6:
				return TypeGuards.DOORS_VALIDATION_ERROR_7;
			case 7:
				return TypeGuards.DOORS_VALIDATION_ERROR_8;
		}
	}
}
