import {Cabinet, CabinetsValidationError} from "../State";
import {ProductDetailsMapper} from "../Structure/types";
import {CabinetErrorShortNamesMapping, CabinetQuestionsShortNames} from "../Enums/Enums";

export class CabinetMapper {
	public static mapObject(details: ProductDetailsMapper): Cabinet {
		let cabinet: Cabinet = {};

		Object.keys(CabinetQuestionsShortNames).forEach((sn: string) => {
			Object(cabinet)[Object(CabinetQuestionsShortNames)[sn]] = details[sn].response
		});

		return cabinet;
	}

	public static mapErrorObject(givenShortName: string, cabErrors: CabinetsValidationError): string {
		const value = Object(cabErrors)[Object(CabinetErrorShortNamesMapping)[givenShortName]];
		return value !== undefined ? value : '';
	}
}