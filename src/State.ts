import {TypeGuards} from "./Enums/InterfaceErrorMapping";

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

/***
* Begin specific component grouping
***/
export interface Baseboards {
	type: string;
	length?: number;
	width?: number;
	quantity?: number;
}

export interface Cabinet {
	type: string;
	paint_color?: string;
	stain_color?: string;
	length?: number;
	width?: number;
	height?: number;
	quantity?: number;
	material_type?: string;
}

export interface Doors {
	type: string;
	vendor?: string;
	vendor_po?: string;
	paint_color?: string;
	stain_color?: string;
	length?: number;
	width?: number;
	height?: number;
	quantity?: number;
	material_type?: string;
}

export interface Drawers {
	type: string;
	vendor?: string;
	vendor_po?: string;
	length?: number;
	width?: number;
	height?: number;
	quantity?: number;
	material_type?: string;
}

export interface DrawerFronts {
	type: string;
	vendor?: string;
	vendor_po?: string;
	length?: number;
	width?: number;
	height?: number;
	quantity?: number;
}

export interface Legs {
	type: string;
	vendor?: string;
	vendor_po?: string;
	paint_color?: string;
	stain_color?: string;
	length?: number;
	width?: number;
	height?: number;
	quantity?: number;
}

export interface Shelving {
	type: string;
	length?: number;
	width?: number;
	quantity?: number;
}

export interface Tops {
	type: string;
	vendor?: string;
	vendor_po?: string;
	length?: number;
	width?: number;
	quantity?: number;
}

export interface TotalSize {
	type: string;
	length?: number;
	depth?: number;
	height?: number;
}

/***
 * Begin specific ERROR component grouping
 ***/
export interface BaseboardsValidationError {
	type: string;
	e_length?: string;
	e_width?: string;
	e_quantity?: string;
}

export interface CabinetsValidationError {
	type: string;
	e_paint_color?: string;
	e_stain_color?: string;
	e_length?: string;
	e_width?: string;
	e_height?: string;
	e_quantity?: string;
}

export interface DoorsValidationError {
	type: string;
	e_vendor?: string;
	e_vendor_po?: string;
	e_paint_color?: string;
	e_stain_color?: string;
	e_length?: string;
	e_width?: string;
	e_height?: string;
	e_quantity?: string;
	e_material_type?: string;
}

export interface DrawersValidationError {
	type: string;
	e_vendor?: string;
	e_vendor_po?: string;
	e_length?: string;
	e_width?: string;
	e_height?: string;
	e_quantity?: string;
	e_material_type?: string;
}

export interface DrawerFrontsValidationError {
	type: string;
	e_vendor?: string;
	e_vendor_po?: string;
	e_length?: string;
	e_width?: string;
	e_height?: string;
	e_quantity?: string;
}

export interface LegsValidationError {
	type: string;
	e_vendor?: string;
	e_vendor_po?: string;
	e_paint_color?: string;
	e_stain_color?: string;
	e_length?: string;
	e_width?: string;
	e_height?: string;
	e_quantity?: string;
}

export interface ShelvingValidationError {
	type: string;
	e_length?: string;
	e_width?: string;
	e_quantity?: string;
}

export interface TopValidationError {
	type: string;
	e_vendor?: string;
	e_vendor_po?: string;
	e_length?: string;
	e_width?: string;
	e_quantity?: string;
}

export interface TotalSizeValidationError {
	type: string;
	e_length?: string;
	e_depth?: string;
	e_height?: string;
}

export interface SalesEntryState {
	email: string;
	error: any;
	password: string;
	roles: Roles;
	data: any;
	containerHeight: string;
	navbarHeight: string;
	page: number;
	customer?: Customer;
	customerErrors?: CustomerValidationError;
	productHeader?: ProductHeader;
	productHeaderErrors?: ProductHeaderValidationError;
	productDetails?: ProductDetails[];
	questions?: Questions[];
	categories?: any;
	secondary_categories?: any;
	productId?: number;
	cabinetErrors?: CabinetsValidationError;
	topErrors?: TopValidationError;
	drawerErrors?: DrawersValidationError;
	doorErrors?: DoorsValidationError;
}