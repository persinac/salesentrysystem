import {MeasurementDetails} from "../State";

export class MeasurementHelper {
	public static measurementLengthSum(measurements: MeasurementDetails[]): number {
		let sum: number = 0;
		measurements.forEach((v: MeasurementDetails) => {
			if (v.length !== null && v.length !== undefined) {
				sum = Number(sum) + Number(v.length);
			}
		});
		return sum;
	}

	public static measurementHeightSum(measurements: MeasurementDetails[]): number {
		let sum: number = 0;
		measurements.forEach((v: MeasurementDetails) => {
			if (v.height !== null && v.height !== undefined) {
				sum = Number(sum) + Number(v.height);
			}
		});
		return sum;
	}

	public static measurementWidthSum(measurements: MeasurementDetails[]): number {
		let sum: number = 0;
		measurements.forEach((v: MeasurementDetails) => {
			if (v.width !== null && v.width !== undefined) {
				sum = Number(sum) + Number(v.width);
			}
		});
		return sum;
	}
}