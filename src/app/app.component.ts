import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Users } from './models';
import { Store, select } from '@ngrx/store';
import { State } from './store/reducers/store.reducer';
import { selectUsers } from './store/selectors/store.selectors';
import { LoadUsers, AddUser, RemoveUser } from './store/actions/store.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public form = this.formBuilder.group({
    name: [''],
    age: [''],
    country: [''],
  });
  public users: Users;

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(new LoadUsers());

    this.store.pipe(select(selectUsers)).subscribe((users) => {
      this.users = users
    });
  }

  private get uid(): string {
    return Math.round(Math.random() * (16777215 - 1048576) + 1048576).toString(
      16
    );
  }

  public addUser() {
    const name = this.form.get('name').value;
    const age = this.form.get('age').value;
    const country = this.form.get('country').value;
    const id = this.uid;
    
    this.store.dispatch(new AddUser({ name, age, country, id }));
  }

  public removeUser(id: string) {
    this.store.dispatch(new RemoveUser(id));
  }
}
