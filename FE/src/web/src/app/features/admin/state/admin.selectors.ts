import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.state';

export const selectAdminState = createFeatureSelector<AdminState>('admin');

export const selectUsers = createSelector(
  selectAdminState,
  (state: AdminState | undefined) => state?.userList || []
);

export const selectLoading = createSelector(
  selectAdminState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectAdminState,
  (state) => state.error
);