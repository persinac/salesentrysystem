import {Validation} from "./Validation";

export abstract class TopValidation extends Validation{

	protected constructor() {
		super();
	}

	public validate(): any {
		return true;
	}
}
