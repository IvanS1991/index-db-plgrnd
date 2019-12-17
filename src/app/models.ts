export interface User {
  id: string;
  name: string;
  age: number;
  country: string;
}
export type Users = Array<User>;