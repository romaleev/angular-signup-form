import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiEnvironment } from '#src/environments/api.environment';
import { RegisterForm } from '#src/models/register.form';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  constructor(private http: HttpClient) {}

  register(user: RegisterForm): Observable<object> {
    return this.http.post(`${apiEnvironment.apiUrl}`, user);
  }
}
