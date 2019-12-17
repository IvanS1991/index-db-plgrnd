import { Action } from '@ngrx/store';
import { Users, User } from 'src/app/models';

export enum StoreActionTypes {
  LoadUsers = '[Store] Load Users',
  SetUsers = '[Store] Set Users',
  AddUser = '[Store] Add User',
  RemoveUser = '[Store] Remove User'
}

export class LoadUsers implements Action {
  readonly type = StoreActionTypes.LoadUsers;

  constructor(public payload?) {}
}

export class SetUsers implements Action {
  readonly type = StoreActionTypes.SetUsers;

  constructor(public payload: Users) {}
}

export class AddUser implements Action {
  readonly type = StoreActionTypes.AddUser;

  constructor(public payload: User) {}
}

export class RemoveUser implements Action {
  readonly type = StoreActionTypes.RemoveUser;

  constructor(public payload: string) {}
}


export type StoreActions = LoadUsers | SetUsers | AddUser | RemoveUser;
