export type UserRole = 'admin' | 'manager' | 'user';

export interface User {
  _id: string;
  username: string;
  email: string;
  role: UserRole;
}
