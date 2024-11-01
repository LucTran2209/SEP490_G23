import { createReducer } from "@ngrx/store";
import { StatusProcess } from "../../../../interfaces/anonymous.interface";
import { ProductItemResponse, ProductRentalOrderProcess } from "../../../../interfaces/product.interface";

interface orderState {
    status: StatusProcess,
    address: string,
    timeStart: string,
    timeEnd: string,
    totalPrice: number,
    paymentMethod: number,
    note: string,
    orderDetail: ProductRentalOrderProcess[]
}

const initialState: orderState = {
    address: "",
    note: "",
    paymentMethod: 0,
    status: 'idle',
    timeEnd: "",
    timeStart: "",
    totalPrice: 0,
    orderDetail: []
}

export const ordeProductRentalReducer = createReducer(
    initialState,
)