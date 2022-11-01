import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { User } from '../model/user.model';
import { ApiUrl } from '../common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit, OnDestroy {
  private behaviorUserSubject: BehaviorSubject<User>;
  private currentUser : Observable<User>;
  constructor(private httpClient: HttpClient) {
    this.behaviorUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.behaviorUserSubject.asObservable();
  }

  ngOnInit(): void {
    
  }

  public get getCurrentUser() : User {
    return this.behaviorUserSubject.value;
  }

  public get getUserName() : string {
    return JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  public get getRoleName() : string {
    return JSON.parse(localStorage.getItem('role')).roleName;
  }

  login(UserName : string, Password: string) {
    var account = {
      UserName: UserName,
      Password: Password
    }
    var headers : HttpHeaders = new HttpHeaders({
      "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Access-Control-Allow-Headers": "*",
        "X-Content-Type-Options": "nosniff",
        "Access-Control-Expose-Headers": "xsrf-token"
    }
    );
    return this.httpClient.post<any>(ApiUrl.apiUrl + "Login/Login", JSON.stringify(account), { headers: headers })
      .pipe(map(user => {
        if (user.isSuccess == true) {
          localStorage.setItem('currentUser', JSON.stringify(user.item));
          localStorage.setItem('access-token', user.item.token["jwtToken"]);
          localStorage.setItem('expiration', user.item.token["expiration"]);
          localStorage.setItem('user', user.item["userName"]);
          this.behaviorUserSubject.next(user.item);
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('access-token');
    localStorage.removeItem('expiration');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    this.behaviorUserSubject.next(null);
  }

  ngOnDestroy(): void {
    
  }

}
