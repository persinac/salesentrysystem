import {
	MeasurementDetails,
	PartialSalesEntryState,
	PriceMatrix,
	PricingComponent,
	ProductDetails,
	Questions
} from "../State";
import {ShortNamePrefix} from "../Enums/ShortNamePrefix";

export class PriceBuilder {
	public static determinePriceKey(propertyName: string) {
		switch (true) {
			case propertyName.startsWith('top_size'):
			case propertyName.startsWith('top_quantity'):
			case propertyName.startsWith('top_wdth'):
			case propertyName.startsWith('top_lngth'):
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
			case propertyName.startsWith('ftr_dtd'):
				return 'ftr_dtd';
			case propertyName.startsWith('ftr_oco'):
				return 'ftr_oco';
			case propertyName.startsWith('ftr_applft'):
				return 'ftr_applft';
			case propertyName.startsWith('ftr_os2l'):
				return 'ftr_os2l';
			case propertyName.startsWith('ftr_os3l'):
				return 'ftr_os3l';
			case propertyName.startsWith('ftr_tls'):
				return 'ftr_tls';
			case propertyName.startsWith('hrdwr_drwr'):
				return 'hrdwr_drwr';
			case propertyName.startsWith('hrdwr_dr'):
				return 'hrdwr_dr';
			case propertyName.startsWith('pnt_clr'):
			case propertyName.startsWith('pnt_isc'): // custom paint - no record in price matrix table for custom, can add later
				return 'pnt_clr';
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
			case propertyName.startsWith('ftr_pot'):
			case propertyName.startsWith('ftr_wr'):
			case propertyName.startsWith('ftr_utn'):
			case propertyName.startsWith('ftr_spr'):
			case propertyName.startsWith('ftr_knf'):
			case propertyName.startsWith('ftr_cly'):
			case propertyName.startsWith('cab_size'):
				pc = this.buildGenericPrice(prices, value, componentPrice, priceKey, productDetail);
				break;
			case propertyName.startsWith('pnt_clr'):
			case propertyName.startsWith('pnt_isc'): // custom paint - no record in price matrix table for custom, can add later
				pc = this.buildGenericPrice(prices, 'pnt_clr', componentPrice, priceKey, productDetail);
				break;
			case propertyName.startsWith('ftr_dtd'):
			case propertyName.startsWith('ftr_oco'):
			case propertyName.startsWith('ftr_applft'):
			case propertyName.startsWith('ftr_os2l'):
			case propertyName.startsWith('ftr_os3l'):
			case propertyName.startsWith('ftr_tls'):
				pc = this.buildGenericPrice(prices, priceKey, componentPrice, priceKey, productDetail);
				break;
			case propertyName.startsWith(`hrdwr_drwr`):
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === value)[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				if (Number(state.drawers.quantity) > 1) {
					pc.id = pc.id || null;
					pc.pd_id = pc.pd_id || productDetail.pd_id;
					const price: number = myNewValue.special_drawer_sell_price * Number(state.drawers.quantity);

					pc.actual_price = price;
					pc.custom_price = price;
				}
				break;
			case propertyName.startsWith(`hrdwr_dr`):
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === value)[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				if (Number(state.door.quantity) > 1) {
					pc.id = pc.id || null;
					pc.pd_id = pc.pd_id || productDetail.pd_id;
					const price: number = myNewValue.special_door_sell_price * Number(state.door.quantity);

					pc.actual_price = price;
					pc.custom_price = price;
				}
				break;
			// case propertyName.startsWith('top_size'):
			// 	myNewValue = prices.filter((p: PriceMatrix) => p.short_name === value)[0];
			// 	if(componentPrice.has(priceKey)) {
			// 		pc = componentPrice.get(priceKey);
			// 	}
			//
			// 	if (Number(state.tops.quantity) > 1) {
			// 		pc.id = pc.id || null;
			// 		pc.pd_id = pc.pd_id || productDetail.pd_id;
			// 		let price: number = 0.00;
			//
			// 		state.tops.measurement.forEach((m: MeasurementDetails) => {
			// 			if (m.length !== undefined && m.width !== undefined) {
			// 				const temp_w: number = Number(m.width);
			// 				const temp_l: number = Number(m.length);
			//
			// 				price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price));
			// 			}
			// 		});
			// 		pc.actual_price = price;
			// 		pc.custom_price = price;
			// 	} else {
			// 		pc = this.buildGenericPrice(prices, value, componentPrice, priceKey, productDetail);
			// 	}
			// 	break;
			case propertyName.startsWith('top_size'):
			case propertyName.startsWith('top_quantity'):
			case propertyName.startsWith('top_lngth'):
			case propertyName.startsWith('top_wdth'):
				// find top_size question for FK
				// find the FK from the product details in 'state'
				// grab the value, that will determine if we multiply by l/w/h or use a straight value
				let topQuestion: Questions = state.questions.filter((q: Questions) => q.short_name === 'top_size')[0];
				let topSizeDetail = state.productDetails.filter((p: ProductDetails) => p.q_fk === topQuestion.q_id)[0];
				myNewValue = prices.filter((p: PriceMatrix) => p.short_name === topSizeDetail.response)[0];
				if(componentPrice.has(priceKey)) {
					pc = componentPrice.get(priceKey);
				}

				if(topSizeDetail.response.includes('multi') || topSizeDetail.response.includes('custom')) {
					if (Number(state.tops.quantity) > 0) {
						pc.id = pc.id || null;
						pc.pd_id = pc.pd_id || productDetail.pd_id;
						let price: number = 0.00;

						state.tops.measurement.forEach((m: MeasurementDetails, idx: number) => {
							if((idx+1) <= Number(state.tops.quantity)) {
								if (m.length !== undefined && m.width !== undefined) {
									const temp_w: number = Number(m.width);
									const temp_l: number = Number(m.length);

									price += ((temp_l * myNewValue.sell_price) + (temp_w * myNewValue.sell_price));
								}
							}
						});
						pc.actual_price = price;
						pc.custom_price = price;
					}
				} else {
					pc = this.buildGenericPrice(prices, value, componentPrice, priceKey, productDetail);
				}

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
		console.log(componentPrice);
		if(componentPrice.has(priceKey)) {
			pc = componentPrice.get(priceKey);
		}

		pc.id = pc.id || null;
		pc.pd_id = productDetail.pd_id;
		switch (typeof productDetail.response) {
			case "boolean":
				if(productDetail.response) {
					pc.actual_price = myNewValue.sell_price;
					pc.custom_price = myNewValue.sell_price;
				} else {
					pc.actual_price = 0;
					pc.custom_price = 0;
				}
				break;
			case "string":
				if(productDetail.response !== null && productDetail.response !== '') {
					pc.actual_price = myNewValue.sell_price;
					pc.custom_price = myNewValue.sell_price;
				} else {
					pc.actual_price = 0;
					pc.custom_price = 0;
				}
				break;
		}


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