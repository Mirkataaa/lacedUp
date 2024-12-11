import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService implements OnDestroy {
  public user$$ = new BehaviorSubject<User | null>(null);
  public user$ = this.user$$.asObservable();

  private userSubscription: Subscription | null = null;

  constructor(private http: HttpClient) {
    this.userSubscription = this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  private user: User | null = null;

  get isLogged(): boolean {
    return !!this.user;
  }

  hasRole(role: string): boolean {
    return this.user?.role === role;
  }

  getProfile() {
    return this.http
      .get<User>('/api/user/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  setUser(user: User): void {
    this.user$$.next(user);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>('/api/user/all').pipe(
      tap((users) => {
        console.log('Fetched users:', users);
      })
    );
  }

  updateUserRole(
    userId: string,
    role: string
  ): Observable<{ message: string; user: User }> {
    return this.http
      .put<{ message: string; user: User }>(`/api/user/${userId}/role`, {
        role,
      })
      .pipe(
        tap((response) => {
          console.log('Role updated:', response);
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<{ user: User }>('/api/user/login', { email, password })
      .pipe(
        tap((response) => {
          this.user$$.next(response.user);
        })
      );
  }

  register(
    username: string,
    email: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<User>('/api/user/register', {
        username,
        email,
        password,
        rePassword,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }

  logout() {
    return this.http.get('/api/user/logout').pipe(
      tap(() => {
        this.user$$.next(null);
      })
    );
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`/api/user/${userId}`);
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
