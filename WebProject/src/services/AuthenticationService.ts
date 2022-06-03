import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
// import { UserDisplay } from './models/user-display.model';
// import { Login } from './models/login.model';
// import { Token } from './models/token.model';
// import { Registration } from './models/registration.model';
import { User } from '../model/User';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  // login(login:Login) :Observable<Token> {
  //   return this.http.post<Token>(environment.serverURL + '/api/users/login', login);
  // }

  register(user: User): Observable<Object> {
    console.log('servis ', user);
    return this.http.post<Object>(
      environment.server + '/api/authentication/registration',
     user
    );
  }
  login(user: User): Observable<Object> {
    console.log('servis ', user);
    return this.http.post<Object>(
      environment.server + '/api/authentication/login',
     user
    );
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(
  //     environment.serverURL + '/api/register/registration'
  //   );
  // }

  // getUserByUsername(username:string) : Observable<UserDisplay> {
  //   return this.http.get<UserDisplay>(environment.serverURL + `/api/users/${username}`);
  // }
}
