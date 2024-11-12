import { createFeature, createReducer, on } from '@ngrx/store';
import { resizeChat } from './chat.actions';
import { feature_key } from '../../../configs/feature_key.config';

export interface ChatState {
  isResized: boolean;
}

export const initialState: ChatState = {
  isResized: false,
};

export const chatReducer = createReducer(
  initialState,
  on(resizeChat, (state, { isResized }) => ({
    ...state,
    isResized: isResized,
  }))
);

export const chatResizeFeature = createFeature({
  name: feature_key['resizeChatFeature'],
  reducer: chatReducer
});


export const {selectIsResized} = chatResizeFeature;