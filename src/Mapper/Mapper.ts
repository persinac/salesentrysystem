import {ProductComponent, ProductComponentErrors, ProductDetailsMapper} from "../Structure/types";
import {Cabinet, MeasurementDetails, ProductDetails, Questions, Tops} from "../State";
import {
	CabinetErrorShortNamesMapping,
	DoorsErrorShortNamesMapping,
	DrawersErrorShortNamesMapping,
	TopErrorShortNamesMapping
} from "../Enums/InterfaceErrorMapping";
import {
	CabinetQuestionsShortNames,
	CabinetDetailsQuestionsShortNames,
	DoorsQuestionsShortNames,
	DrawersQuestionsShortNames,
	TopQuestionsShortNames,
	TopMeasurementShortNames
} from "../Enums/InterfaceMapping";
import { TypeGuards } from "../Enums/TypeGuards";

import {MAX_CABS, MAX_TOPS} from "../constants/ProductDetails";

export class Mapper {
	public static unionQuestionsDetails(
			productDetails: ProductDetails[],
			questions: Questions[],
			categoryId: number
		): ProductDetailsMapper {
			let merged_details: ProductDetailsMapper = {};
			productDetails.forEach((pd: ProductDetails) => {
				let question;
				if(pd.cat_fk === categoryId) {
					question = questions.find((q: Questions) => q.q_id === pd.q_fk);
					merged_details[question.short_name] = pd;
				}
			});
			return merged_details;
		}

	public static mapProductComponent(details: ProductDetailsMapper, object: ProductComponent): ProductComponent {
		let enumKeys: string[] = [];
		let returnObject: any;
		let detailKeys: string[] = [];
		let maxQuantityOfComponent: number[] = [];
		switch (object.type) {
			case TypeGuards.CABINET:
				maxQuantityOfComponent = Array.from(Array(MAX_CABS + 1).keys());
				maxQuantityOfComponent.forEach((num: number) => {
					if (num > 0) {
						if (num === 1) {
							Object.keys(CabinetDetailsQuestionsShortNames).forEach((k: string) => detailKeys.push(k));
						} else {
							Object.keys(CabinetDetailsQuestionsShortNames).forEach((k: any) => {
								detailKeys.push(`${k}_${num}`);
							});
						}
					}
				});
				enumKeys = Object.keys(CabinetQuestionsShortNames);
				returnObject = Object(CabinetQuestionsShortNames);
				(<Cabinet>object).measurement = this.setupMapMeasurements(detailKeys, returnObject, details, 'cab', MAX_CABS, this.determineCabNum);
				break;
			case TypeGuards.TOPS:
				maxQuantityOfComponent = Array.from(Array(MAX_TOPS + 1).keys());
				maxQuantityOfComponent.forEach((num: number) => {
					if (num > 0) {
						if (num === 1) {
							Object.keys(TopMeasurementShortNames).forEach((k: string) => detailKeys.push(k));
						} else {
							Object.keys(TopMeasurementShortNames).forEach((k: any) => {
								detailKeys.push(`${k}_${num}`);
							});
						}
					}
				});
				enumKeys = Object.keys(TopQuestionsShortNames);
				returnObject = Object(TopQuestionsShortNames);
				(<Tops>object).measurement = this.setupMapMeasurements(detailKeys, returnObject, details, 'top', MAX_TOPS, this.determineTopNum);
				break;
			case TypeGuards.DRAWERS:
				enumKeys = Object.keys(DrawersQuestionsShortNames);
				returnObject = Object(DrawersQuestionsShortNames);
				break;
			case TypeGuards.DOORS:
				enumKeys = Object.keys(DoorsQuestionsShortNames);
				returnObject = Object(DoorsQuestionsShortNames);
				break;
			default: throw new Error("Unexpected object: " + object);
		}

		enumKeys.forEach((sn: string) => {
			Object(object)[returnObject[sn]] = details[sn].response
		});
		return object;
	}

	public static mapErrorObject(givenShortName: string, errors: ProductComponentErrors): string {
		let value: string = '';
		switch (errors.type) {
			case TypeGuards.CABINET_VALIDATION_ERROR:
			case TypeGuards.CABINET_VALIDATION_ERROR_2:
			case TypeGuards.CABINET_VALIDATION_ERROR_3:
			case TypeGuards.CABINET_VALIDATION_ERROR_4:
				value = Object(errors)[Object(CabinetErrorShortNamesMapping)[this.mapErrorValidations(givenShortName)]];
				break;
			case TypeGuards.TOP_VALIDATION_ERROR:
			case TypeGuards.TOP_VALIDATION_ERROR_2:
				value = Object(errors)[Object(TopErrorShortNamesMapping)[this.mapErrorValidations(givenShortName)]];
				break;
			case TypeGuards.DRAWERS_VALIDATION_ERROR:
				value = Object(errors)[Object(DrawersErrorShortNamesMapping)[givenShortName]];
				break;
			case TypeGuards.DOORS_VALIDATION_ERROR:
				value = Object(errors)[Object(DoorsErrorShortNamesMapping)[givenShortName]];
				break;
			default: throw new Error("Unexpected object: " + errors);
		}
		return value !== undefined ? value : '';
	}

	public static setupMapMeasurements(
		enumKeys: string[], objectToModify: any, details: ProductDetailsMapper,
		fieldPrefix: string, maxQuantity: number, determineFx: any
	): MeasurementDetails[] {
		const max_list_of_nums = Array.from(Array(maxQuantity).keys());
		let deets: MeasurementDetails[] = [];

		max_list_of_nums.forEach((num: number) => {
			num = num + 1;
			deets.push(
				this.mapMeasurements(
					enumKeys, objectToModify, details, fieldPrefix, num, determineFx
				));
		});

		return deets;
	}

	public static mapMeasurements(
			enumKeys: string[],
			objectToModify: any,
			details: ProductDetailsMapper,
			fieldPrefix: string,
			num: number,
			determineFx: any
		): any {

		const _height_regex = new RegExp('_height');
		const _length_regex = new RegExp('_lngth');
		const _width_regex = new RegExp('_wdth');
		let field: string = '';
		let abbr_field: string = '';

		let indiv_deet: any = {type: determineFx(String(num))};
		enumKeys.forEach((sn: string) => {
			if (_height_regex.test(sn)) {
				field = `height`;
				abbr_field = `height`;
			} else if (_length_regex.test(sn)) {
				field = `length`;
				abbr_field = `lngth`;
			} else if (_width_regex.test(sn)) {
				field = `width`;
				abbr_field = `wdth`;
			}

			let isCurrentDetail = false;

			if (num == 1) {
				isCurrentDetail = (`${fieldPrefix}_${abbr_field}` == sn);
			} else {
				isCurrentDetail = sn.includes(String(num))
			}

			if (isCurrentDetail && details[sn].response !== null && details[sn].response !== undefined) {
				Object(indiv_deet)[field] = details[sn].response
			}
		});
		return indiv_deet;
	}

	public static mapErrorValidations(givenShortName: string) {
		return givenShortName.replace(/_\d+/, '');
	}

	public static determineCabNum(cabNumber: string): TypeGuards {
		const cab_2_regex = new RegExp('2');
		const cab_3_regex = new RegExp('3');
		const cab_4_regex = new RegExp('4');
		if (cab_2_regex.test(cabNumber)) {
			return TypeGuards.CABINET_2;
		} if (cab_3_regex.test(cabNumber)) {
			return TypeGuards.CABINET_3;
		} if (cab_4_regex.test(cabNumber)) {
			return TypeGuards.CABINET_4;
		} else {
			return TypeGuards.CABINET;
		}
	}

	public static determineTopNum(number: string): TypeGuards {
		const top_2_regex = new RegExp('2');
		if (top_2_regex.test(number)) {
			return TypeGuards.TOPS_2;
		} else {
			return TypeGuards.TOPS;
		}
	}

	public static determineCabFieldPostfix(cabShortName: string): string {
		const cab_2_regex = new RegExp('_2');
		const cab_3_regex = new RegExp('_3');
		const cab_4_regex = new RegExp('_4');
		if (cab_2_regex.test(cabShortName)) {
			return '_2';
		} if (cab_3_regex.test(cabShortName)) {
			return '_3';
		} if (cab_4_regex.test(cabShortName)) {
			return '_4';
		} else {
			return '';
		}
	}
}