import { createAction, props } from "@ngrx/store";

export const resizeChat = createAction(
    '[Chat] Resize Chat',
    props<{ isResized: boolean }>() 
  );