// maps to interface: Cabinets
// maps to interface: Shelving
export enum BaseboardsQuestionsShortNames {
	bb_lngth = "length",
	bb_wdth = "width",
	bb_qty = "quantity",
}

export enum CabinetQuestionsShortNames {
	cab_quantity = "quantity",
	cab_height = "height",
	cab_lngth = "length",
	cab_wdth = "width",
	cab_mt = "material_type"
}

// maps to interface: Doors
export enum DoorsQuestionsShortNames {
	dr_qty = "quantity",
	dr_lngth = "length",
	dr_wdth = "width",
	dr_mt = "material_type",
	dr_vndr = "vendor",
	dr_vndr_po = "vendor_po",
}

// maps to interface: Drawers
export enum DrawersQuestionsShortNames {
	dwr_qty = "quantity",
	dwr_lngth = "length",
	dwr_wdth = "width",
	dwr_mt = "material_type",
	dwr_vndr = "vendor",
	dwr_vndr_po = "vendor_po",
}

// maps to interface: DrawerFronts
export enum DrawerFrontsQuestionsShortNames {
	dwrfrnts_qty = "quantity",
	dwrfrnts_lngth = "length",
	dwrfrnts_wdth = "width",
	dwrfrnts_vndr = "vendor",
	dwrfrnts_vndr_po = "vendor_po",
}

// maps to interface: Legs
export enum LegsQuestionsShortNames {
	legs_qty = "quantity",
	legs_lngth = "length",
	legs_wdth = "width",
	legs_vndr = "vendor",
	legs_vndr_po = "vendor_po",
}

// maps to interface: Shelving
export enum ShelvingQuestionsShortNames {
	shlv_lngth = "length",
	shlv_wdth = "width",
	shlv_qty = "quantity",
}

// maps to interface: Tops
export enum TopQuestionsShortNames {
	// top_quantity = "quantity",
	top_vndr = "vendor",
	top_vndr_po = "vendor_po",
	top_lngth = "length",
	top_wdth = "width"
}

// maps to interface: TotalSize
export enum TotalSizeQuestionsShortNames {
	total_length = "length",
	total_depth = "depth",
	total_height = "height",
}

// maps to interface: ShelvingValidationError
export enum BaseboardsErrorShortNamesMapping {
	bb_lngth = "e_length",
	bb_wdth = "e_width",
	bb_qty = "e_quantity",
}

// maps to interface: CabinetValidationError
export enum CabinetErrorShortNamesMapping {
	cab_quantity = "e_quantity",
	cab_lngth = "e_length",
	cab_wdth = "e_width",
	cab_height = "e_height",
	// cab_mt = "e_material_type"
}

// maps to interface: DoorsValidationError
export enum DoorsErrorShortNamesMapping {
	dr_qty = "e_quantity",
	dr_lngth = "e_length",
	dr_wdth = "e_width",
	dr_mt = "e_material_type",
	dr_vndr = "e_vendor",
	dr_vndr_po = "e_vendor_po",
}

// maps to interface: DrawersValidationError
export enum DrawersErrorShortNamesMapping {
	dwr_qty = "e_quantity",
	dwr_lngth = "e_length",
	dwr_wdth = "e_width",
	dwr_mt = "e_material_type",
	dwr_vndr = "e_vendor",
	dwr_vndr_po = "e_vendor_po",
}

// maps to interface: DrawersValidationError
export enum DrawerFrontsErrorShortNamesMapping {
	dwrfrnts_qty = "e_quantity",
	dwrfrnts_lngth = "e_length",
	dwrfrnts_wdth = "e_width",
	dwrfrnts_vndr = "e_vendor",
	dwrfrnts_vndr_po = "e_vendor_po",
}

// maps to interface: LegsValidationError
export enum LegsErrorShortNamesMapping {
	legs_qty = "e_quantity",
	legs_lngth = "e_length",
	legs_wdth = "e_width",
	legs_vndr = "e_vendor",
	legs_vndr_po = "e_vendor_po",
}

// maps to interface: ShelvingValidationError
export enum ShelvingErrorShortNamesMapping {
	shlv_lngth = "e_length",
	shlv_wdth = "e_width",
	shlv_qty = "e_quantity",
}

// maps to interface: TopValidationError
export enum TopErrorShortNamesMapping {
	top_vndr = "e_vendor",
	top_vndr_po = "e_vendor_po",
	top_lngth = "e_length",
	top_wdth = "e_width"
}

// maps to interface: TotalSizeValidationError
export enum TotalSizeErrorShortNamesMapping {
	total_length = "e_length",
	total_depth = "e_depth",
	total_height = "e_height",
}

export enum TypeGuards {
	BASEBOARDS = 'BASEBOARDS',
	CABINET = 'CABINET',
	DOORS = 'DOORS',
	DRAWERS = 'DRAWERS',
	DRAWERFRONTS = 'DRAWERFRONTS',
	LEGS = 'LEGS',
	SHELVING = 'SHELVING',
	TOPS = 'TOPS',
	TOTAL_SIZE = 'TOTAL_SIZE',
	BASEBOARDS_VALIDATION_ERROR = 'BASEBOARDS_VALIDATION_ERROR',
	CABINET_VALIDATION_ERROR = 'CABINET_VALIDATION_ERROR',
	DOORS_VALIDATION_ERROR = 'DOORS_VALIDATION_ERROR',
	DRAWERS_VALIDATION_ERROR = 'DRAWERS_VALIDATION_ERROR',
	DRAWERFRONTS_VALIDATION_ERROR = 'DRAWERFRONTS_VALIDATION_ERROR',
	LEGS_VALIDATION_ERROR = 'LEGS_VALIDATION_ERROR',
	SHELVING_VALIDATION_ERROR = 'SHELVING_VALIDATION_ERROR',
	TOP_VALIDATION_ERROR = 'TOP_VALIDATION_ERROR',
	TOTAL_SIZE_VALIDATION_ERROR = 'TOTAL_SIZE_VALIDATION_ERROR'
}