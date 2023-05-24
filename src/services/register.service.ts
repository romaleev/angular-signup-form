import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiEnvironment } from '../environments/api.environment';
import { RegisterForm } from '../models/register.form';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(user: RegisterForm): Observable<object> {
    return this.http.post(`${apiEnvironment.apiUrl}`, user);
  }
}
