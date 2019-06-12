export enum CabinetQuestionsShortNames {
	cab_quantity = "quantity",
	cab_fl = "front_length",
	cab_fw = "front_width",
	cab_sl = "side_length",
	cab_sw = "side_width",
	cab_bl = "back_length",
	cab_bw = "back_width",
	cab_mt = "material_type"
}

export enum CabinetErrorShortNamesMapping {
	cab_quantity = "e_quantity",
	cab_fl = "e_length",
	cab_fw = "e_width",
	// cab_sl = "side_length",
	// cab_sw = "side_width",
	cab_bl = "e_length",
	cab_bw = "e_width",
	// cab_mt = "e_material_type"
}

// maps to interface: Tops
export enum TopQuestionsShortNames {
	// top_quantity = "quantity",
	top_vndr = "vendor",
	top_vndr_po = "vendor_po",
	top_lngth = "length",
	top_wdth = "width"
}

// maps to interface: TopValidationError
export enum TopErrorShortNamesMapping {
	// cab_quantity = "e_quantity",
	top_vndr = "e_vendor",
	top_vndr_po = "e_vendor_po",
	top_lngth = "e_length",
	top_wdth = "e_width"
}