import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Token } from '../model/Token';
import { User } from 'src/model/User';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

   getAuthenticatedUser(): Observable<Object> {
       var token=localStorage.getItem('token')
        var t:Token=new Token();
        t.tokenString=token || "";
       if(typeof(token)==typeof(''))
            console.log('daaaaaaaaaaaaaaaaaaaaaa')
       console.log('sending token: ',token)
        return this.http.post<Object>(
        environment.server + '/api/users/getAuthenticatedUser',t);
  }
  getAllDeliverers(): Observable<User[]> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') || ""
    );
    const headers = { headers: header };

        return this.http.get<User[]>(
     environment.server + '/api/users/getalldeliverers',headers);
}
  changeProfile(user: User): Observable<User> {

    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') || ""
    );
    const headers = { headers: header };

  
    console.log('changeProfile ', user);
    return this.http.post<User>(
      environment.server + '/api/users/changeProfile',user,headers
    );
  }
  changeUserState(user: User): Observable<User> {
    const header = new HttpHeaders().set(
      'Authorization',
      localStorage.getItem('token') || ""
    );
    const headers = { headers: header };
    console.log('admitting ', user);
    return this.http.post<User>(
      environment.server + '/api/users/changeUserState',user,headers
    );
  }

}
