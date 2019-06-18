import {
	Cabinet,
	CabinetsValidationError, CabinetMeasurement,
	Doors,
	DoorsValidationError,
	DrawerFronts, DrawerFrontsValidationError,
	Drawers,
	DrawersValidationError,
	Legs,
	LegsValidationError,
	ProductDetails,
	Shelving,
	ShelvingValidationError,
	Tops,
	TopValidationError,
	TotalSize,
	TotalSizeValidationError
} from "../State";

export type ProductDetailsMapper = Record<string, ProductDetails>;

export type ProductComponent = Cabinet | CabinetMeasurement |
	Doors | Drawers | DrawerFronts |
	Legs | Shelving | Tops | TotalSize;

export type ProductComponentErrors =
	CabinetsValidationError | DoorsValidationError |
	DrawersValidationError | DrawerFrontsValidationError |
	LegsValidationError |	ShelvingValidationError |
	TopValidationError | TotalSizeValidationError;