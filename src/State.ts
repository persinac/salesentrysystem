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

export interface CustomerValidationError {
	e_name?: string;
	e_phone_number?: string;
	e_shipping_address?: string;
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

export interface ProductHeaderValidationError {
	e_reference_number?: string;
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

export interface CabinetsValidationError {
	e_paint_color?: string;
	e_stain_color?: string;
	e_length?: string;
	e_width?: string;
	e_height?: string;
	e_quantity?: string;
}

export interface Cabinet {
	paint_color?: string;
	stain_color?: string;
	front_length?: number;
	front_width?: number;
	side_length?: number;
	side_width?: number;
	back_length?: number;
	back_width?: number;
	height?: number;
	quantity?: number;
	material_type?: string;
}

export interface TopValidationError {
	e_vendor?: string;
	e_vendor_po?: string;
	e_length?: string;
	e_width?: string;
	e_quantity?: string;
}

export interface Tops {
	vendor?: string;
	vendor_po?: string;
	length?: number;
	width?: number;
	quantity?: number;
}