import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, tap } from 'rxjs';
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

  getProfile() {
    return this.http
      .get<User>('/api/user/profile')
      .pipe(tap((user) => this.user$$.next(user)));
  }

  updateProfile(username: string, email: string) {
    return this.http
      .put<User>(`/api/user/profile`, {
        username,
        email,
      })
      .pipe(tap((user) => this.user$$.next(user)));
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

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
