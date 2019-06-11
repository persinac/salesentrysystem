import {Validation} from "./Validation";

export abstract class DoorsValidation extends Validation{

	protected constructor() {
		super();
	}

	public validate(): any {
		return true;
	}
}
