import {ProductDetailsMapper, ProductComponent, ProductComponentErrors} from "../Structure/types";
import {ProductDetails, Questions} from "../State";
import {
	CabinetErrorShortNamesMapping,
	CabinetQuestionsShortNames, DoorsErrorShortNamesMapping,
	DoorsQuestionsShortNames,
	DrawersErrorShortNamesMapping,
	DrawersQuestionsShortNames,
	TopErrorShortNamesMapping,
	TopQuestionsShortNames,
	TypeGuards
} from "../Enums/Enums";

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
			return merged_details
		}

	public static mapProductComponent(details: ProductDetailsMapper, object: ProductComponent): ProductComponent {
		let enumKeys: string[] = [];
		let returnObject: any;
		switch (object.type) {
			case TypeGuards.CABINET:
				enumKeys = Object.keys(CabinetQuestionsShortNames);
				returnObject = Object(CabinetQuestionsShortNames);
				break;
			case TypeGuards.TOPS:
				enumKeys = Object.keys(TopQuestionsShortNames);
				returnObject = Object(TopQuestionsShortNames);
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
		console.log(errors);
		switch (errors.type) {
			case TypeGuards.CABINET_VALIDATION_ERROR:
				value = Object(errors)[Object(CabinetErrorShortNamesMapping)[givenShortName]];
				break;
			case TypeGuards.TOP_VALIDATION_ERROR:
				value = Object(errors)[Object(TopErrorShortNamesMapping)[givenShortName]];
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
}