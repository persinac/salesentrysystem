import {TypeGuards} from '../Enums/TypeGuards';
import {Cabinet, MeasurementDetails, Tops, TopValidationError} from '../State';
import {Validation} from './Validation';
import {MAX_TOPS} from "../constants/ProductDetails";
import {MeasurementHelper} from "../Utility/MeasurementHelper";

export class TopValidation extends Validation {

	private cab_details: Cabinet | null;
	private top_details: Tops;
	private top_measurement: MeasurementDetails[];
	private errors: TopValidationError[];

	private num_of_tops: number;
	private max_list_of_top_nums: number[];
	private list_of_top_nums: number[];

	constructor(cabinet: Cabinet | null, top: Tops) {
		super();

		this.cab_details = cabinet;
		this.top_details = top;
		this.top_measurement = top.measurement;

		this.num_of_tops = Number(top.quantity);
		this.errors = [];
		this.list_of_top_nums = Array.from(Array(this.num_of_tops).keys());
		this.createListOfTopErrors();
	}

	private createListOfTopErrors(): void {
		this.max_list_of_top_nums = Array.from(Array(MAX_TOPS).keys());

		this.max_list_of_top_nums.forEach((i) => {
			this.errors.push(
				{
					type: this.determineErrorNum(i),
					e_length: '', e_quantity: '', e_width: ''
				}
			)
		});
	}

	public validate(): boolean {
		this.checkQuantity();
		this.checkLength();
		this.checkWidth();

		const list_of_validation: boolean[] = [];

		this.list_of_top_nums.forEach((i) => {
			list_of_validation.push(this.errors[i].e_length.length === 0 &&
				this.errors[i].e_quantity.length === 0 &&
				this.errors[i].e_width.length === 0)
		});

		return !list_of_validation.includes(false);
	}

	public getErrors(): TopValidationError[] {
		return this.errors;
	}

	public getSpecificError(idx: number): TopValidationError {
		return this.errors[idx];
	}

	private checkQuantity() {
		const {quantity} = this.top_details;
		if (String(quantity).length === 0) {
			this.errors[0].e_quantity = 'Top quantity cannot be blank';
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 */
	private checkLength() {
		const length_arr: number[] = [];
		const cab_length = MeasurementHelper.measurementLengthSum(this.cab_details.measurement);

		this.list_of_top_nums.forEach((i) => {
			const curr_top = this.top_measurement[i];
			if (String(curr_top.length).length === 0) {
				this.errors[i].e_length = 'Top length cannot be blank';
			} else {
				if (curr_top.length !== null || curr_top.length !== undefined) {
					length_arr.push(Number(curr_top.length));
				}
			}
		});

		const arrSum: number = length_arr.reduce((a,b) => a + b, 0);
		if (arrSum < (cab_length + 2)) {
			this.list_of_top_nums.forEach((i) => {
				if (this.errors[i].e_length.length === 0) {
					this.errors[i].e_length = 'Total top length must be greater than cabinet length by 2in';
				}
			});
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 * Need to grab the max width from all cab width(s)
	 */
	private checkWidth() {
		const width_arr: number[] = [];
		const cab_width = MeasurementHelper.measurementWidthSum(this.cab_details.measurement);

		this.list_of_top_nums.forEach((i) => {
			const curr_top = this.top_measurement[i];
			if (String(curr_top.width).length === 0) {
				this.errors[i].e_width = 'Top width cannot be blank';
			} else {
				if (curr_top.width !== null || curr_top.width !== undefined) {
					width_arr.push(Number(curr_top.width));
				}
			}
		});

		const arrSum: number = width_arr.reduce((a,b) => a + b, 0);
		if (arrSum < (cab_width + 2)) {
			this.list_of_top_nums.forEach((i) => {
				if (this.errors[i].e_width.length === 0) {
					this.errors[i].e_width = 'Total top width must be greater than cabinet width by 2in';
				}
			});
		}
	}

	private determineErrorNum(num: number): TypeGuards {
		switch (num) {
			case 0:
				return TypeGuards.TOP_VALIDATION_ERROR;
			case 1:
				return TypeGuards.TOP_VALIDATION_ERROR_2;
		}
	}
}
