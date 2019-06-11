import {Validation} from "./Validation";

export abstract class FeatureLuxuryValidation extends Validation{

	protected constructor() {
		super();
	}

	public validate(): any {
		return true;
	}
}
