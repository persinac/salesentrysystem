import {ProductComponent, ProductComponentErrors, ProductDetailsMapper} from "../Structure/types";
import {
	Cabinet,
	Doors,
	Drawers,
	Legs,
	MeasurementDetails,
	ProductDetails,
	Questions,
	RolloutDrawers,
	Tops
} from "../State";
import {
	CabinetErrorShortNamesMapping,
	DoorsErrorShortNamesMapping,
	DrawersErrorShortNamesMapping, LegsErrorShortNamesMapping, RolloutDrawersErrorShortNamesMapping,
	TopErrorShortNamesMapping
} from "../Enums/InterfaceErrorMapping";
import {
	CabinetQuestionsShortNames,
	CabinetDetailsQuestionsShortNames,
	DoorsQuestionsShortNames,
	DrawersQuestionsShortNames,
	TopQuestionsShortNames,
	TopMeasurementShortNames,
	DoorsMeasurementShortNames,
	LegsMeasurementShortNames,
	LegsQuestionsShortNames,
	DrawersMeasurementQuestionsShortNames, RolloutDrawersQuestionsShortNames, RolloutDrawersMeasurementShortNames
} from "../Enums/InterfaceMapping";
import { TypeGuards } from "../Enums/TypeGuards";

import {MAX_CABS, MAX_DOORS, MAX_DRAWERS, MAX_LEGS, MAX_RO_DRAWERS, MAX_TOPS} from "../constants/ProductDetails";
import {ShortNamePrefix} from "../Enums/ShortNamePrefix";

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
				(<Cabinet>object).measurement = this.setupMapMeasurements(detailKeys, returnObject, details, ShortNamePrefix.CABINET, MAX_CABS, this.determineCabNum);
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
				(<Tops>object).measurement = this.setupMapMeasurements(detailKeys, returnObject, details, ShortNamePrefix.TOP, MAX_TOPS, this.determineTopNum);
				break;
			case TypeGuards.DOORS:
				maxQuantityOfComponent = Array.from(Array(MAX_DOORS + 1).keys());
				maxQuantityOfComponent.forEach((num: number) => {
					if (num > 0) {
						if (num === 1) {
							Object.keys(DoorsMeasurementShortNames).forEach((k: string) => detailKeys.push(k));
						} else {
							Object.keys(DoorsMeasurementShortNames).forEach((k: any) => {
								detailKeys.push(`${k}_${num}`);
							});
						}
					}
				});
				enumKeys = Object.keys(DoorsQuestionsShortNames);
				returnObject = Object(DoorsQuestionsShortNames);
				(<Doors>object).measurement = this.setupMapMeasurements(detailKeys, returnObject, details, ShortNamePrefix.DOOR, MAX_DOORS, this.determineDoorNum);
				break;
			case TypeGuards.LEGS:
				maxQuantityOfComponent = Array.from(Array(MAX_LEGS + 1).keys());
				maxQuantityOfComponent.forEach((num: number) => {
					if (num > 0) {
						if (num === 1) {
							Object.keys(LegsMeasurementShortNames).forEach((k: string) => detailKeys.push(k));
						} else {
							Object.keys(LegsMeasurementShortNames).forEach((k: any) => {
								detailKeys.push(`${k}_${num}`);
							});
						}
					}
				});
				enumKeys = Object.keys(LegsQuestionsShortNames);
				returnObject = Object(LegsQuestionsShortNames);
				(<Legs>object).measurement = this.setupMapMeasurements(detailKeys, returnObject, details, ShortNamePrefix.LEGS, MAX_LEGS, this.determineLegsNum);
				break;
			case TypeGuards.DRAWERS:
				maxQuantityOfComponent = Array.from(Array(MAX_DRAWERS + 1).keys());
				maxQuantityOfComponent.forEach((num: number) => {
					if (num > 0) {
						if (num === 1) {
							Object.keys(DrawersMeasurementQuestionsShortNames).forEach((k: string) => detailKeys.push(k));
						} else {
							Object.keys(DrawersMeasurementQuestionsShortNames).forEach((k: any) => {
								detailKeys.push(`${k}_${num}`);
							});
						}
					}
				});
				enumKeys = Object.keys(DrawersQuestionsShortNames);
				returnObject = Object(DrawersQuestionsShortNames);
				(<Drawers>object).measurement = this.setupMapMeasurements(detailKeys, returnObject, details, ShortNamePrefix.DRAWER, MAX_DRAWERS, this.determineDrawersNum);
				break;
			case TypeGuards.ROLLOUT_DRAWERS:
				maxQuantityOfComponent = Array.from(Array(MAX_RO_DRAWERS + 1).keys());
				maxQuantityOfComponent.forEach((num: number) => {
					if (num > 0) {
						if (num === 1) {
							Object.keys(RolloutDrawersMeasurementShortNames).forEach((k: string) => detailKeys.push(k));
						} else {
							Object.keys(RolloutDrawersMeasurementShortNames).forEach((k: any) => {
								detailKeys.push(`${k}_${num}`);
							});
						}
					}
				});
				enumKeys = Object.keys(RolloutDrawersQuestionsShortNames);
				returnObject = Object(RolloutDrawersQuestionsShortNames);
				(<RolloutDrawers>object).measurement = this.setupMapMeasurements(detailKeys, returnObject, details, ShortNamePrefix.ROLLOUT_DRAWERS, MAX_RO_DRAWERS, this.determineRolloutDrawersNum);
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
			case TypeGuards.DRAWERS_VALIDATION_ERROR_2:
			case TypeGuards.DRAWERS_VALIDATION_ERROR_3:
			case TypeGuards.DRAWERS_VALIDATION_ERROR_4:
				value = Object(errors)[Object(DrawersErrorShortNamesMapping)[this.mapErrorValidations(givenShortName)]];
				break;
			case TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR:
			case TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_2:
			case TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_3:
			case TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_4:
			case TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_5:
			case TypeGuards.ROLLOUT_DRAWERS_VALIDATION_ERROR_6:
				value = Object(errors)[Object(RolloutDrawersErrorShortNamesMapping)[this.mapErrorValidations(givenShortName)]];
				break;
			case TypeGuards.DOORS_VALIDATION_ERROR:
			case TypeGuards.DOORS_VALIDATION_ERROR_2:
			case TypeGuards.DOORS_VALIDATION_ERROR_3:
			case TypeGuards.DOORS_VALIDATION_ERROR_4:
			case TypeGuards.DOORS_VALIDATION_ERROR_5:
			case TypeGuards.DOORS_VALIDATION_ERROR_6:
			case TypeGuards.DOORS_VALIDATION_ERROR_7:
			case TypeGuards.DOORS_VALIDATION_ERROR_8:
				value = Object(errors)[Object(DoorsErrorShortNamesMapping)[this.mapErrorValidations(givenShortName)]];
				break;
			case TypeGuards.LEGS_VALIDATION_ERROR:
			case TypeGuards.LEGS_VALIDATION_ERROR_2:
			case TypeGuards.LEGS_VALIDATION_ERROR_3:
			case TypeGuards.LEGS_VALIDATION_ERROR_4:
			case TypeGuards.LEGS_VALIDATION_ERROR_5:
				value = Object(errors)[Object(LegsErrorShortNamesMapping)[this.mapErrorValidations(givenShortName)]];
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

	public static determineCabNum(num: string): TypeGuards {
		const cab_2_regex = new RegExp('2');
		const cab_3_regex = new RegExp('3');
		const cab_4_regex = new RegExp('4');
		if (cab_2_regex.test(num)) {
			return TypeGuards.CABINET_2;
		} if (cab_3_regex.test(num)) {
			return TypeGuards.CABINET_3;
		} if (cab_4_regex.test(num)) {
			return TypeGuards.CABINET_4;
		} else {
			return TypeGuards.CABINET;
		}
	}

	public static determineTopNum(num: string): TypeGuards {
		const top_2_regex = new RegExp('2');
		if (top_2_regex.test(num)) {
			return TypeGuards.TOPS_2;
		} else {
			return TypeGuards.TOPS;
		}
	}

	public static determineDoorNum(num: string): TypeGuards {
		const dr_2_regex = new RegExp('2');
		const dr_3_regex = new RegExp('3');
		const dr_4_regex = new RegExp('4');
		const dr_5_regex = new RegExp('5');
		const dr_6_regex = new RegExp('6');
		const dr_7_regex = new RegExp('7');
		const dr_8_regex = new RegExp('8');
		if (dr_2_regex.test(num)) {
			return TypeGuards.DOORS_2;
		} else if (dr_3_regex.test(num)) {
			return TypeGuards.DOORS_3;
		} else if (dr_4_regex.test(num)) {
			return TypeGuards.DOORS_4;
		} else if (dr_5_regex.test(num)) {
			return TypeGuards.DOORS_5;
		} else if (dr_6_regex.test(num)) {
			return TypeGuards.DOORS_6;
		} else if (dr_7_regex.test(num)) {
			return TypeGuards.DOORS_7;
		} else if (dr_8_regex.test(num)) {
			return TypeGuards.DOORS_8;
		} else {
			return TypeGuards.DOORS;
		}
	}

	public static determineLegsNum(num: string): TypeGuards {
		const _2_regex = new RegExp('2');
		const _3_regex = new RegExp('3');
		const _4_regex = new RegExp('4');
		const _5_regex = new RegExp('5');
		if (_2_regex.test(num)) {
			return TypeGuards.LEGS_2;
		} else if (_3_regex.test(num)) {
			return TypeGuards.LEGS_3;
		} else if (_4_regex.test(num)) {
			return TypeGuards.LEGS_4;
		} else if (_5_regex.test(num)) {
			return TypeGuards.LEGS_5;
		} else {
			return TypeGuards.LEGS;
		}
	}

	public static determineDrawersNum(num: string): TypeGuards {
		const _2_regex = new RegExp('2');
		const _3_regex = new RegExp('3');
		const _4_regex = new RegExp('4');
		if (_2_regex.test(num)) {
			return TypeGuards.DRAWERS_2;
		} else if (_3_regex.test(num)) {
			return TypeGuards.DRAWERS_3;
		} else if (_4_regex.test(num)) {
			return TypeGuards.DRAWERS_4;
		} else {
			return TypeGuards.DRAWERS;
		}
	}

	public static determineRolloutDrawersNum(num: string): TypeGuards {
		const _2_regex = new RegExp('2');
		const _3_regex = new RegExp('3');
		const _4_regex = new RegExp('4');
		const _5_regex = new RegExp('5');
		const _6_regex = new RegExp('6');
		if (_2_regex.test(num)) {
			return TypeGuards.ROLLOUT_DRAWERS_2;
		} else if (_3_regex.test(num)) {
			return TypeGuards.ROLLOUT_DRAWERS_3;
		} else if (_4_regex.test(num)) {
			return TypeGuards.ROLLOUT_DRAWERS_4;
		} else if (_5_regex.test(num)) {
			return TypeGuards.ROLLOUT_DRAWERS_5;
		} else if (_6_regex.test(num)) {
			return TypeGuards.ROLLOUT_DRAWERS_6;
		} else {
			return TypeGuards.ROLLOUT_DRAWERS;
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