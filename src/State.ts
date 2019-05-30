export interface IAppState {
	authUser: any;
}

export interface Roles {
	isAdmin: boolean;
	isSales: boolean;
}

export interface QuestionValues {
	[name: string]: string;
}

export interface Questions {
	id: number;
	text: string;
	short_name: string;
	category_id: number;
	cat_fk: number;
}