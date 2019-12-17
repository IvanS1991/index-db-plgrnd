
import { StoreActions, StoreActionTypes } from '../actions/store.actions';
import { Users } from 'src/app/models';

export const storeFeatureKey = 'store';

export interface State {
  users: Users;
}

export const initialState: State = {
  users: []
};

export function reducer(state = initialState, { payload, type }: StoreActions): State {
  switch (type) {

    case StoreActionTypes.SetUsers:
      return {
        ...state,
        users: payload
      };

    default:
      return state;
  }
}
