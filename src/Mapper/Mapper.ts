import {ProductDetailsMapper} from "../Structure/types";
import {ProductDetails, Questions} from "../State";

export class Mapper {
	public static unionQuestionsDetails(
		productDetails: ProductDetails[],
		questions: Questions[],
		categoryId: number): ProductDetailsMapper {
		let merged_details: ProductDetailsMapper = {};
		productDetails.forEach((pd: ProductDetails) => {
			let question;
			if(pd.cat_fk === categoryId) {
				question = questions.find((q: Questions) => q.q_id === pd.q_fk);
				// cab_details.set(question.short_name, pd);
				merged_details[question.short_name] = pd;
			}
		});
		return merged_details
	}
}