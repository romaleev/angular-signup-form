import { apiEnvironment } from '#src/environments';
import { RegisterForm } from '#src/models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(user: RegisterForm): Observable<object> {
    return this.http.post(`${apiEnvironment.apiUrl}`, user);
  }

  getUserInfo(): Observable<object> {
    return this.http.get(`${apiEnvironment.apiUrl}`);
  }
}
