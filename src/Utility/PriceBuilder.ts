import {MeasurementDetails, PartialSalesEntryState, PriceMatrix, PricingComponent, ProductDetails} from "../State";
import {ShortNamePrefix} from "../Enums/ShortNamePrefix";

export class PriceBuilder {
	public static determinePriceKey(propertyName: string) {
		switch (true) {
			case propertyName.startsWith('top_size'):
				return `${ShortNamePrefix.TOP}_size`;
			case propertyName.startsWith('ftr_pot'):
				return 'ftr_pot';
			case propertyName.startsWith('ftr_wr'):
				return 'ftr_wr';
			case propertyName.startsWith('ftr_utn'):
				return 'ftr_utn';
			case propertyName.startsWith('ftr_spr'):
				return 'ftr_spr';
			case propertyName.startsWith('ftr_knf'):
				return 'ftr_knf';
			case propertyName.startsWith('ftr_cly'):
				return 'ftr_cly';
			case propertyName.startsWith('cab_size'):
				return `${ShortNamePrefix.CABINET}_size`;
			case propertyName.startsWith('cab_quantity'):
			case propertyName.startsWith('cab_lngth'):
			case propertyName.startsWith('cab_wdth'):
				return `${ShortNamePrefix.CABINET}_size`;
			case propertyName.startsWith(`${ShortNamePrefix.DOOR}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.DOOR}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.DOOR}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.DOOR}_height`):
				return `${ShortNamePrefix.DOOR}_size`;
			case propertyName.startsWith(`${ShortNamePrefix.DRAWER}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.DRAWER}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.DRAWER}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.DRAWER}_height`):
				return `${ShortNamePrefix.DRAWER}_size`;
			case propertyName.startsWith(`${ShortNamePrefix.ROLLOUT_DRAWERS}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.ROLLOUT_DRAWERS}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.ROLLOUT_DRAWERS}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.ROLLOUT_DRAWERS}_height`):
				return `${ShortNamePrefix.ROLLOUT_DRAWERS}_size`;
			case propertyName.startsWith(`${ShortNamePrefix.LEGS}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.LEGS}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.LEGS}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.LEGS}_height`):
				return `${ShortNamePrefix.LEGS}_size`;
			case propertyName.startsWith(`${ShortNamePrefix.TOP}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.TOP}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.TOP}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.TOP}_height`):
				return `${ShortNamePrefix.TOP}_size`;
		}
	}

	public static buildPrice(
		value: any,
		propertyName: string,
		priceKey: string,
		productDetail: ProductDetails, 
		prices: PriceMatrix[],
		componentPrice: Map<string, PricingComponent>,
		state: PartialSalesEntryState
	): PricingComponent {
		let pc: PricingComponent = {};
		let myNewValue: PriceMatrix;

		switch (true) {
			case propertyName.startsWith('top_size'):
			case propertyName.startsWith('ftr_pot'):
			case propertyName.startsWith('ftr_wr'):
			case propertyName.startsWith('ftr_utn'):
			case propertyName.startsWith('ftr_spr'):
			case propertyName.startsWith('ftr_knf'):
			case propertyName.startsWith('ftr_cly'):
			case propertyName.startsWith('cab_size'):
				pc = this.buildGenericPrice(prices, value, componentPrice, priceKey, productDetail);
				break;
			case propertyName.startsWith('cab_quantity'):
			case propertyName.startsWith('cab_lngth'):
			case propertyName.startsWith('cab_wdth'):
				// multi cabs is an ad hoc calculation, there likely won't be an entry in the price matrix?
				// maybe there should be... but for now, there isn't one since we will be saving the
				// calculated price in the db itself
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === 'cab_length_option')[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				if (Number(state.cabinet.quantity) > 1) {
					pc.id = pc.id || null;
					pc.pd_id = pc.pd_id || productDetail.pd_id;
					let price: number = 0.00;

					state.cabinet.measurement.forEach((m: MeasurementDetails) => {
						if (m.length !== undefined && m.width !== undefined) {
							const temp_w: number = Number(m.width);
							const temp_l: number = Number(m.length);

							price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price));
						}
					});
					pc.actual_price = price;
					pc.custom_price = price;
				}
				break;
			case propertyName.startsWith(`${ShortNamePrefix.DOOR}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.DOOR}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.DOOR}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.DOOR}_height`):
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === `${ShortNamePrefix.DOOR}_option`)[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				if (Number(state.door.quantity) > 1) {
					pc.id = pc.id || null;
					pc.pd_id = pc.pd_id || productDetail.pd_id;
					let price: number = 0.00;

					console.log(state.door.measurement);
					state.door.measurement.forEach((m: MeasurementDetails, idx: number) => {
						if (m.length !== undefined && m.width !== undefined && m.height !== undefined) {
							console.log(idx);
							console.log(myNewValue.sell_price);
							const temp_w: number = Number(m.width);
							const temp_l: number = Number(m.length);
							const temp_h: number = Number(m.height);

							if (idx > 3) {
								price += 50.00;
							} else {
								price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price) + (temp_h * myNewValue.sell_price));
							}
						}
					});
					pc.actual_price = price;
					pc.custom_price = price;
				}
				break;
			case propertyName.startsWith(`${ShortNamePrefix.DRAWER}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.DRAWER}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.DRAWER}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.DRAWER}_height`):
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === `${ShortNamePrefix.DRAWER}_option`)[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				if (Number(state.drawers.quantity) > 1) {
					pc.id = pc.id || null;
					pc.pd_id = pc.pd_id || productDetail.pd_id;
					let price: number = 0.00;

					state.drawers.measurement.forEach((m: MeasurementDetails) => {
						if (m.length !== undefined && m.width !== undefined && m.height !== undefined) {
							const temp_w: number = Number(m.width);
							const temp_l: number = Number(m.length);
							const temp_h: number = Number(m.height);

							price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price) + (temp_h * myNewValue.sell_price));
						}
					});
					pc.actual_price = price;
					pc.custom_price = price;
				}
				break;
			case propertyName.startsWith(`${ShortNamePrefix.ROLLOUT_DRAWERS}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.ROLLOUT_DRAWERS}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.ROLLOUT_DRAWERS}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.ROLLOUT_DRAWERS}_height`):
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === `${ShortNamePrefix.ROLLOUT_DRAWERS}_option`)[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				if (Number(state.rollout_drawers.quantity) > 1) {
					pc.id = pc.id || null;
					pc.pd_id = pc.pd_id || productDetail.pd_id;
					let price: number = 0.00;

					state.rollout_drawers.measurement.forEach((m: MeasurementDetails) => {
						if (m.length !== undefined && m.width !== undefined && m.height !== undefined) {
							const temp_w: number = Number(m.width);
							const temp_l: number = Number(m.length);
							const temp_h: number = Number(m.height);

							price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price) + (temp_h * myNewValue.sell_price));
						}
					});
					pc.actual_price = price;
					pc.custom_price = price;
				}
				break;
			case propertyName.startsWith(`${ShortNamePrefix.LEGS}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.LEGS}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.LEGS}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.LEGS}_height`):
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === `${ShortNamePrefix.LEGS}_option`)[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				console.log(state.legs);
				if (Number(state.legs.quantity) > 0) {
					pc.id = pc.id || null;
					pc.pd_id = pc.pd_id || productDetail.pd_id;
					let price: number = 0.00;

					state.legs.measurement.forEach((m: MeasurementDetails) => {
						if (m.length !== undefined && m.width !== undefined) {
							const temp_w: number = Number(m.width);
							const temp_l: number = Number(m.length);

							price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price));
						}
					});
					pc.actual_price = price;
					pc.custom_price = price;
				}
				break;
			case propertyName.startsWith(`${ShortNamePrefix.TOP}_quantity`):
			case propertyName.startsWith(`${ShortNamePrefix.TOP}_lngth`):
			case propertyName.startsWith(`${ShortNamePrefix.TOP}_wdth`):
			case propertyName.startsWith(`${ShortNamePrefix.TOP}_height`):
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === `${ShortNamePrefix.TOP}_option`)[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				if (Number(state.tops.quantity) > 1) {
					pc.id = pc.id || null;
					pc.pd_id = pc.pd_id || productDetail.pd_id;
					let price: number = 0.00;

					state.tops.measurement.forEach((m: MeasurementDetails) => {
						if (m.length !== undefined && m.width !== undefined && m.height !== undefined) {
							const temp_w: number = Number(m.width);
							const temp_l: number = Number(m.length);
							const temp_h: number = Number(m.height);

							price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price) + (temp_h * myNewValue.sell_price));
						}
					});
					pc.actual_price = price;
					pc.custom_price = price;
				}
				break;
		}
		console.log(pc);

		return pc;
	}

	public static buildGenericPrice(prices: PriceMatrix[], valueToMatch: string, componentPrice: Map<string, PricingComponent>, priceKey: string, productDetail: ProductDetails): PricingComponent {
		let pc: PricingComponent = {};
		let myNewValue: PriceMatrix;
		myNewValue = prices.filter((p: PriceMatrix) => p.short_name === valueToMatch)[0];

		if(componentPrice.has(priceKey)) {
			pc = componentPrice.get(priceKey);
		}

		pc.id = pc.id || null;
		pc.pd_id = productDetail.pd_id;
		pc.actual_price = myNewValue.sell_price;
		pc.custom_price = myNewValue.sell_price;

		return pc;
	}

	public static measurementWidthSum(measurements: MeasurementDetails[]): number {
		let sum: number = 0;
		measurements.forEach((v: MeasurementDetails) => {
			if (v.width !== null && v.width !== undefined) {
				sum = Number(sum) + Number(v.width);
			}
		});
		return sum;
	}
}