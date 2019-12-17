import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStore from '../reducers/store.reducer';

export const selectStoreState = createFeatureSelector<fromStore.State>(
  'store'
);

export const selectUsers = createSelector(selectStoreState, (state) => state.users);