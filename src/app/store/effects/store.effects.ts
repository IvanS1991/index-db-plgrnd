import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { StoreActionTypes, StoreActions, SetUsers, LoadUsers } from '../actions/store.actions';
import { IndexDbService } from 'src/app/index-db/index-db.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Users, User } from 'src/app/models';



@Injectable()
export class StoreEffects {
  constructor(private actions$: Actions<StoreActions>, private indexDb: IndexDbService) {}

  @Effect()
  loadUsers$ = this.actions$.pipe(
    ofType(StoreActionTypes.LoadUsers),
    switchMap(() => {
      return this.indexDb.findAll<Users>('users');
    }),
    switchMap((users) => of(new SetUsers(users)))
  );

  @Effect()
  addUser$ = this.actions$.pipe(
    ofType(StoreActionTypes.AddUser),
    switchMap(({ payload }) => {
      return this.indexDb.addOne<User>('users', payload);
    }),
    switchMap(() => of(new LoadUsers()))
  );

  @Effect()
  removeUser$ = this.actions$.pipe(
    ofType(StoreActionTypes.RemoveUser),
    switchMap(({ payload }) => {
      return this.indexDb.deleteOne<User>('users', payload);
    }),
    switchMap(() => of(new LoadUsers()))
  );
}
