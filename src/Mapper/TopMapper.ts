import {Cabinet, CabinetsValidationError, Tops, TopValidationError} from "../State";
import {ProductDetailsMapper} from "../Structure/types";
import {
	CabinetErrorShortNamesMapping,
	CabinetQuestionsShortNames,
	TopErrorShortNamesMapping,
	TopQuestionsShortNames
} from "../Enums/Enums";

export class TopMapper {
	public static mapObject(details: ProductDetailsMapper): Tops {
		let top: Tops = {};

		Object.keys(TopQuestionsShortNames).forEach((sn: string) => {
			Object(top)[Object(TopQuestionsShortNames)[sn]] = details[sn].response
		});

		return top;
	}

	public static mapErrorObject(givenShortName: string, topErrors: TopValidationError): string {
		console.log(Object(topErrors)[Object(TopErrorShortNamesMapping)[givenShortName]]);
		const value = Object(topErrors)[Object(TopErrorShortNamesMapping)[givenShortName]];
		return value !== undefined ? value : '';
	}
}