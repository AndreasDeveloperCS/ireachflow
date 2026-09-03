import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserRole } from '../models/user';

export interface RegisterPayload {
  organizationName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private initialized = false;

  constructor(private http: HttpClient) {}

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  hasRole(...roles: UserRole[]): boolean {
    const user = this.currentUserSubject.value;
    return !!user && roles.includes(user.role);
  }

  register(payload: RegisterPayload): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}auth/register`, payload)
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  login(payload: LoginPayload): Observable<User> {
    return this.http
      .post<User>(`${environment.apiUrl}auth/login`, payload)
      .pipe(tap((user) => this.currentUserSubject.next(user)));
  }

  logout(): Observable<unknown> {
    return this.http
      .post(`${environment.apiUrl}auth/logout`, {})
      .pipe(tap(() => this.currentUserSubject.next(null)));
  }

  /** Fetches the current session from the httpOnly cookie. Safe to call repeatedly. */
  fetchCurrentUser(): Observable<User | null> {
    return this.http.get<User>(`${environment.apiUrl}auth/me`).pipe(
      tap((user) => this.currentUserSubject.next(user)),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of(null);
      }),
    );
  }

  /** Called once from APP_INITIALIZER so guards see a resolved session on first navigation. */
  init(): Observable<User | null> {
    if (this.initialized) {
      return of(this.currentUserSubject.value);
    }
    this.initialized = true;
    return this.fetchCurrentUser();
  }
}
