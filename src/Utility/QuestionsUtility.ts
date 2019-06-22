import {ShortNamePrefix} from "../Enums/ShortNamePrefix";

export interface SubHeaderQuantity {
	id: string;
	title: string;
}

/***
 * This class acts as an object ENUM
 */
class UniqueDimMapper {
	static readonly CAB_1 = new UniqueDimMapper(`${ShortNamePrefix.CABINET}_1`, 'Cabinet 1');
	static readonly CAB_2 = new UniqueDimMapper(`${ShortNamePrefix.CABINET}_2`, 'Cabinet 2');
	static readonly CAB_3 = new UniqueDimMapper(`${ShortNamePrefix.CABINET}_3`, 'Cabinet 3');
	static readonly CAB_4 = new UniqueDimMapper(`${ShortNamePrefix.CABINET}_4`, 'Cabinet 4');
	static readonly TOP_1 = new UniqueDimMapper(`${ShortNamePrefix.TOP}_1`, 'Top 1');
	static readonly TOP_2 = new UniqueDimMapper(`${ShortNamePrefix.TOP}_2`, 'Top 2');
	static readonly DOOR_1 = new UniqueDimMapper(`${ShortNamePrefix.DOOR}_1`, 'Door 1');
	static readonly DOOR_2 = new UniqueDimMapper(`${ShortNamePrefix.DOOR}_2`, 'Door 2');
	static readonly DOOR_3 = new UniqueDimMapper(`${ShortNamePrefix.DOOR}_3`, 'Door 3');
	static readonly DOOR_4 = new UniqueDimMapper(`${ShortNamePrefix.DOOR}_4`, 'Door 4');
	static readonly DOOR_5 = new UniqueDimMapper(`${ShortNamePrefix.DOOR}_5`, 'Door 5');
	static readonly DOOR_6 = new UniqueDimMapper(`${ShortNamePrefix.DOOR}_6`, 'Door 6');
	static readonly DOOR_7 = new UniqueDimMapper(`${ShortNamePrefix.DOOR}_7`, 'Door 7');
	static readonly DOOR_8 = new UniqueDimMapper(`${ShortNamePrefix.DOOR}_8`, 'Door 8');

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
			case UniqueDimMapper.DOOR_1.toString():
				return {id: id, title: UniqueDimMapper.DOOR_1.title};
			case UniqueDimMapper.DOOR_2.toString():
				return {id: id, title: UniqueDimMapper.DOOR_2.title};
			case UniqueDimMapper.DOOR_3.toString():
				return {id: id, title: UniqueDimMapper.DOOR_3.title};
			case UniqueDimMapper.DOOR_4.toString():
				return {id: id, title: UniqueDimMapper.DOOR_4.title};
			case UniqueDimMapper.DOOR_5.toString():
				return {id: id, title: UniqueDimMapper.DOOR_5.title};
			case UniqueDimMapper.DOOR_6.toString():
				return {id: id, title: UniqueDimMapper.DOOR_6.title};
			case UniqueDimMapper.DOOR_7.toString():
				return {id: id, title: UniqueDimMapper.DOOR_7.title};
			case UniqueDimMapper.DOOR_8.toString():
				return {id: id, title: UniqueDimMapper.DOOR_8.title};
			default:
				return {id: id, title: ''};
		}
	}
}