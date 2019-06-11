import {Validation} from "./Validation";

export abstract class DrawerValidation extends Validation{

	protected constructor() {
		super();
	}

	public validate(): any {
		return true;
	}
}
