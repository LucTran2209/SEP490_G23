import { createFeature, createReducer, on } from "@ngrx/store";
import { StatusProcess } from "../../../interfaces/anonymous.interface";
import * as OrderRequestActions from './order-request.actions';
import { HttpStatusCode } from "../../../configs/status-code.config";
import { feature_key } from "../../../configs/feature_key.config";
export interface OrderRequestState {
    status: StatusProcess,
    message: string | null
    statusCode: HttpStatusCode,
    errMessage: string | null
}

const initialState: OrderRequestState = {
    status: 'idle',
    message: '',
    errMessage: '',
    statusCode: HttpStatusCode.UNKNOWN_ERROR
}

const reducer = createReducer(
    initialState,
    on(OrderRequestActions.requestOrderInit,(state, action) => ({...state, status: 'loading' as StatusProcess})),
    on(OrderRequestActions.requestOrderInit, (state, action) => ({...state, status: 'loaded' as StatusProcess, statusCode: HttpStatusCode.OK})),
    on(OrderRequestActions.requestOrderInit, (state, action) => ({...state,message:'', status: 'error' as StatusProcess, statusCode: HttpStatusCode.INTERNAL_SERVER_ERROR})),
)

export const orderRequestFeature = createFeature({
    name: feature_key['orderRequestFeature'],
    reducer,
})

export const {} = orderRequestFeature;