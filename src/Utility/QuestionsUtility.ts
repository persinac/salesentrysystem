
export interface SubHeaderQuantity {
	id: string;
	title: string;
}

/***
 * This class acts as an object ENUM
 */
class UniqueDimMapper {
	static readonly CAB_1 = new UniqueDimMapper('cab_1', 'Cabinet 1');
	static readonly CAB_2 = new UniqueDimMapper('cab_2', 'Cabinet 2');
	static readonly CAB_3 = new UniqueDimMapper('cab_3', 'Cabinet 3');
	static readonly CAB_4 = new UniqueDimMapper('cab_4', 'Cabinet 4');
	static readonly TOP_1 = new UniqueDimMapper('top_1', 'Top 1');
	static readonly TOP_2 = new UniqueDimMapper('top_2', 'Top 2');

	private constructor(private key: string, public readonly title: string) {}

	toString() {
		return this.key;
	}
}

export class QuestionsUtility {
	public static determineQuantityQuestionSubHeader(id: string): SubHeaderQuantity {

		switch (id) {
			case UniqueDimMapper.CAB_1.toString():
				return {id: id, title: UniqueDimMapper.CAB_1.title};
			case UniqueDimMapper.CAB_2.toString():
				return {id: id, title: UniqueDimMapper.CAB_2.title};
			case UniqueDimMapper.CAB_3.toString():
				return {id: id, title: UniqueDimMapper.CAB_3.title};
			case UniqueDimMapper.CAB_4.toString():
				return {id: id, title: UniqueDimMapper.CAB_4.title};
			case UniqueDimMapper.TOP_1.toString():
				return {id: id, title: UniqueDimMapper.TOP_1.title};
			case UniqueDimMapper.TOP_2.toString():
				return {id: id, title: UniqueDimMapper.TOP_2.title};
			default:
				return {id: id, title: ''};
		}
	}
}