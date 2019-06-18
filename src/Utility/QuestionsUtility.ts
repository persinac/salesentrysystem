import React from "react";

export interface SubHeaderQuantity {
	id: string;
	title: string;
}

class UniqueDimMapper {
	static readonly CAB_2 = new UniqueDimMapper('cab_2', 'Cabinet 2');
	static readonly CAB_3 = new UniqueDimMapper('cab_3', 'Cabinet 3');
	static readonly CAB_4 = new UniqueDimMapper('cab_4', 'Cabinet 4');

	private constructor(private key: string, public readonly title: string) {}

	toString() {
		return this.key;
	}
}

export class QuestionsUtility {
	public static determineQuantityQuestionSubHeader(id: string): SubHeaderQuantity {

		switch (id) {
			case UniqueDimMapper.CAB_2.toString():
				return {id: id, title: UniqueDimMapper.CAB_2.title};
			case UniqueDimMapper.CAB_3.toString():
				return {id: id, title: UniqueDimMapper.CAB_3.title};
			case UniqueDimMapper.CAB_4.toString():
				return {id: id, title: UniqueDimMapper.CAB_4.title};
			default:
				return {id: id, title: 'N/A'};
		}
	}
}