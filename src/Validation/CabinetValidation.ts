import {Validation} from "./Validation";

export abstract class CabinetValidation extends Validation{

	protected constructor() {
		super();
	}

	public validate(): any {
		return true;
	}
}
