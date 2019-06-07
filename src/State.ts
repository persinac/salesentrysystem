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
	q_id: number;
	text: string;
	short_name: string;
	category_id: number;
	cat_fk: number;
}

export interface Customer {
	customer_id?: number;
	name?: string;
	primary_email?: string;
	secondary_email?: string;
	phone_number?: string;
	shipping_address?: string;
	created_on?: Date;
	created_by?: string;
	updated_on?: Date;
	updated_by?: string;
}

export interface ProductHeader {
	ph_id?: number;
	group_id?: number;
	order_num?: number;
	status?: string;
	crafting_required?: boolean;
	notes?: string;
	reference_number?: string;
	created_on?: Date;
	created_by?: string;
	updated_on?: Date;
	updated_by?: string;
}

export interface ProductDetails {
	pd_id?: number;
	ph_fk?: number;
	cat_fk?: number;
	q_fk?: number;
	response?: string;
	created_on?: Date;
	created_by?: string;
	updated_on?: Date;
	updated_by?: string;
}