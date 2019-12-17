 
import { ActionReducerMap } from '@ngrx/store';
import * as fromStore from './store/reducers/store.reducer';

export interface AppState {
  store: fromStore.State;
}

export const reducers: ActionReducerMap<AppState> = {
  store: fromStore.reducer,
};