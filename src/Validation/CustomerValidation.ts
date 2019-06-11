import {Validation} from "./Validation";

export abstract class CustomerValidation extends Validation{

	protected constructor() {
		super();
	}

	public validate(): any {
		return true;
	}
}
