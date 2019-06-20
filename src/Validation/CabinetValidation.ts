import {TypeGuards} from '../Enums/TypeGuards';
import {Cabinet, CabinetsValidationError, MeasurementDetails, Tops} from '../State';
import {Validation} from './Validation';
import {MAX_CABS} from "../constants/ProductDetails";
import {MeasurementHelper} from "../Utility/MeasurementHelper";

export class CabinetValidation extends Validation {

	private cab_details: Cabinet;
	private cab_extras: MeasurementDetails[];
	private num_of_cabs: number;
	private max_list_of_cab_nums: number[];
	private list_of_cab_nums: number[];
	private top_details: Tops | null;
	private errors: CabinetsValidationError[];

	constructor(cabinet: Cabinet, top: Tops | null) {
		super();

		this.cab_details = cabinet;
		this.cab_extras = cabinet.measurement;
		this.num_of_cabs = Number(cabinet.quantity);
		this.top_details = top;
		this.errors = [];
		this.list_of_cab_nums = Array.from(Array(this.num_of_cabs).keys());
		this.createListOfCabErrors();
	}

	private createListOfCabErrors(): void {
		this.max_list_of_cab_nums = Array.from(Array(MAX_CABS).keys());

		this.max_list_of_cab_nums.forEach((i) => {
			this.errors.push(
				{
					type: this.determineCabErrorNum(i),
					e_height: '', e_length: '', e_paint_color: '',
					e_quantity: '', e_stain_color: '', e_width: ''
				}
			)
		});
	}

	public validate(): boolean {
		this.checkQuantity();
		this.checkLength();
		this.checkWidth();
		this.checkHeight();

		const list_of_validation: boolean[] = [];

		this.list_of_cab_nums.forEach((i) => {
			list_of_validation.push(this.errors[i].e_height.length === 0 &&
				this.errors[i].e_length.length === 0 &&
				this.errors[i].e_paint_color.length === 0 &&
				this.errors[i].e_quantity.length === 0 &&
				this.errors[i].e_stain_color.length === 0 &&
				this.errors[i].e_width.length === 0)
		});

		return !list_of_validation.includes(false);
	}

	public getErrors(): CabinetsValidationError[] {
		return this.errors;
	}

	public getSpecificError(idx: number): CabinetsValidationError {
		return this.errors[idx];
	}

	private checkQuantity() {
		if (String(this.num_of_cabs).length === 0) {
			this.errors[0].e_quantity = 'Cabinet quantity cannot be blank';
		} else if (this.num_of_cabs > 4) {
			this.errors[0].e_quantity = 'Cannot have more than 4 cabinets';
		} else if (this.num_of_cabs < 1) {
			this.errors[0].e_quantity = 'Must have at least 1 cabinet';
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 * This will need to be updated once multiple UNIQUE cab measurements are entered
	 */
	private checkLength() {
		const length_arr: number[] = [];
		const top_length = MeasurementHelper.measurementLengthSum(this.top_details.measurement);

		this.list_of_cab_nums.forEach((i) => {
			const curr_cab = this.cab_extras[i];
			console.log(curr_cab);
			if (String(curr_cab.length).length === 0) {
				this.errors[i].e_length = 'Cabinet length cannot be blank';
			} else {
				if (curr_cab.length !== null || curr_cab.length !== undefined) {
					length_arr.push(Number(curr_cab.length));
				}
			}
		});

		const arrSum: number = length_arr.reduce((a,b) => a + b, 0);
		if (arrSum > (top_length - 2)) {
			this.list_of_cab_nums.forEach((i) => {
				if (this.errors[i].e_length.length === 0) {
					this.errors[i].e_length = 'Total cabinet length must be less than top length by 2in';
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
		const top_width = MeasurementHelper.measurementWidthSum(this.top_details.measurement);

		this.list_of_cab_nums.forEach((i) => {
			const curr_cab = this.cab_extras[i];
			if (String(curr_cab.width).length === 0) {
				this.errors[i].e_width = 'Cabinet width cannot be blank';
			} else {
				if (curr_cab.width !== null || curr_cab.width !== undefined) {
					width_arr.push(Number(curr_cab.width));
				}
			}
		});

		const arrSum: number = width_arr.reduce((a,b) => a + b, 0);
		if (arrSum > (top_width - 2)) {
			this.list_of_cab_nums.forEach((i) => {
				if (this.errors[i].e_width.length === 0) {
					this.errors[i].e_width = 'Total cabinet width must be less than Top width by 2in';
				}
			});
		}
	}

	/***
	 * Once we have the total size component constructed, we'll need to validate against that, too
	 */
	private checkHeight() {
		this.list_of_cab_nums.forEach((i) => {
			const curr_cab = this.cab_extras[i];
			if (String(curr_cab.height).length === 0) {
				this.errors[i].e_height = 'Cabinet height cannot be blank';
			}
		});
	}

	private determineCabErrorNum(cabNum: number): TypeGuards {
		switch (cabNum) {
			case 0:
				return TypeGuards.CABINET_VALIDATION_ERROR;
			case 1:
				return TypeGuards.CABINET_VALIDATION_ERROR_2;
			case 2:
				return TypeGuards.CABINET_VALIDATION_ERROR_3;
			case 3:
				return TypeGuards.CABINET_VALIDATION_ERROR_4;
		}
	}
}
