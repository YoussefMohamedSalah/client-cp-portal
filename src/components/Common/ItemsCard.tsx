import MultilineTextInput from 'components/UI/FormInputs/MultilineTextInput';
import TextInput from 'components/UI/FormInputs/TextInput';
import React from 'react'
import { DocumentFinances } from 'types/DocumentFinances';
import { ItemProps } from 'types/ItemProps'

interface Props<T extends ItemProps> {
	items: T[];
	finances?: DocumentFinances;
	isVat?: boolean;
	toggleVat?: (vat: boolean) => void;
	onChangeDiscount?: (discount: string) => void
	onChangeItem: (index: number, type: any, value: string) => void;
	onRemoveItem: (index: number) => void;
	onAddItem: () => void;
};

function ItemsCard<T extends ItemProps>({ isVat, items, finances, toggleVat, onChangeDiscount, onChangeItem, onRemoveItem, onAddItem }: Props<T>) {
	return (
		<div className="card mt-2">
			<div className="card-header">
				<div className="d-flex flex-column justify-content-center align-items-center">
					<button
						type="button"
						className="btn btn-success text-white mb-2"
						onClick={onAddItem}
					>
						Items
						<i className="icofont-plus-circle fs-6 ps-2" />
					</button>
				</div>
			</div>
			<div className="card-body">
				{items && items.length > 0 && items?.map((item, index) =>
					<div key={index} className="row justify-content-center align-items-center row g-3 mb-3">
						<div className="col-lg-11">
							<div className="container">
								<div className="row justify-content-center align-items-center row">
									<div className="col-lg-4 p-lg-0 pe-lg-1 pb-2">
										<div className="d-flex align-items-center">
											<span className="badge bg-success p-2 m-2">
												{index + 1}
											</span>
											<div className="w-100">
												<MultilineTextInput
													label="Description"
													key={'description'}
													placeholder="Description"
													rows={1}
													value={item.description}
													onChange={(value: string) =>
														onChangeItem(
															index,
															"description",
															value
														)
													}
												/>
											</div>{" "}
										</div>
									</div>
									<div className="col-lg-2 col-6 p-lg-0 pe-lg-1 pb-2">
										<TextInput
											type="text"
											placeholder="Item"
											label={'Item'}
											value={item.item}
											onChange={(value: string) =>
												onChangeItem(index, "item", value)
											}
										/>
									</div>
									<div className="col-lg-2 col-6 p-lg-0 pe-lg-1 pb-2">
										<TextInput
											type="number"
											placeholder="Quantity"
											label={'Quantity'}
											value={item.count}
											onChange={(value: string) =>
												onChangeItem(index, "count", value)
											}
										/>
									</div>
									<div className="col-lg-2 col-6 p-lg-0 pe-lg-1 pb-2">
										<TextInput
											type="number"
											placeholder="PRICE"
											label={'PRICE'}
											value={item.price}
											onChange={(value: string) =>
												onChangeItem(index, "price", value)
											}
										/>
									</div>
									<div className="col-lg-2 col-6 p-lg-0 d-flex justify-content-center align-items-center flex-column">
										<span
											style={{ padding: "10px", minWidth: "6rem", maxWidth: "10rem" }}
											className="badge fs-6 text-dark bg-light"
										>
											<TextInput
												type="number"
												placeholder="Total Value"
												label={'Total Value'}
												disabled={true}
												value={item.total}
												onChange={(value: string) =>
													onChangeItem(index, "price", value)
												}
											/>
										</span>
									</div>
								</div>
							</div>
						</div>
						{/* btns */}
						<div className="col-lg-1 col-6 p-lg-0 d-flex justify-content-evenly align-items-center">
							<button
								type="button"
								className="btn btn-danger text-white"
								onClick={() => onRemoveItem(index)}
							>
								<i className="fa fa-trash" />
							</button>
						</div>
					</div>
				)}
				{finances && (
					<>
						<div className="row">
							<div className="col-lg-4 col-sm-5 me-auto ps-lg-5">
								<table className="table table-clear">
									<tbody>
										<tr>
											<td>
												<strong>Subtotal</strong>
											</td>
											<td className="text-end">
												{finances.modelSubTotal} SAR
											</td>
										</tr>
										<tr>
											<td>
												<strong>
													VAT ({finances.modelVatPercentage || 0}%)
												</strong>
											</td>
											<td className="text-end">
												<div className="d-flex justify-content-end">
													<div className="pe-3">
														{toggleVat && (
															<div className="form-check">
																<input
																	type="checkbox"
																	checked={isVat}
																	onChange={() => toggleVat(!isVat)}
																/>
																<label className="form-check-label" htmlFor="flexCheckChecked">
																	Include VAT
																</label>
															</div>
														)}
													</div>
													<div>
														{finances.modelTotalVat ? `${Number(finances.modelTotalVat).toFixed(2)} SAR` : '0 SAR'}
													</div>
												</div>
											</td>
										</tr>
										{/* Discount */}
										<tr>
											<td>
												<strong>Discount</strong>
											</td>
											<td className="text-end">
												<input
													className="form-control"
													id="exampleFormControlTextarea1"
													type="text"
													placeholder="DISCOUNT"
													value={finances.modelTotalDiscount}
													disabled={!onChangeDiscount}
													onChange={e => onChangeDiscount ? onChangeDiscount(e.target.value) : () => { }}
												/>
											</td>
										</tr>
										{/* END */}
										<tr>
											<td>
												<strong>Total</strong>
											</td>
											<td className="text-end">
												<strong>
													{Number(finances.modelTotal).toFixed(2)} SAR
												</strong>
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	)
}

export default ItemsCard
