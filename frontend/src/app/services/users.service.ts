import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  listOrganizationMembers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}users`);
  }
}
