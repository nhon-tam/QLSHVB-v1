import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { User, UserDTO } from '../../model/user.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserGroup } from '../../model/user-group.model';
import { Observable, Subject } from 'rxjs';
import { AuthenticationService } from '../../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient,private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    
  }

  public userGetSearchWithPaging(condi? : BaseCondition<User>) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex : condi.PageIndex,
        PageSize: 5,
        FilterRuleList: condi.FilterRuleList
      }
    }
    else {
      condition = {
        PageIndex : 1,
        PageSize: 5
      }

    }
  //  var body = JSON.stringify(condi);
  //  return this.httpClient.get<CoQuan[]>(ApiUrl.apiUrl + 'CoQuan/GetCoQuanWithPaging', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  return this.httpClient.post<User[]>(ApiUrl.apiUrl + 'User/UserGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  // createNewUser(u: User) {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type':  'application/json'
  //     })
  //   }
  //   var user = JSON.stringify(u);
  //   return this.httpClient.post<User>(ApiUrl.apiUrl + "User/Create", user, httpOptions)
  //     .pipe(map((result) => {
  //       return result;
  //     }));
  // }
  getAllRole() {
    return this.httpClient.get<ReturnResult<UserGroup>>(ApiUrl.apiUrl + "Role/GetAllRole");
  }

  getAllUser() {
    return this.httpClient.get<ReturnResult<UserDTO>>(ApiUrl.apiUrl + "User/GetAllUser");
  }

  getUserByID (id: number) {
    return this.httpClient.get<ReturnResult<User>>(ApiUrl.apiUrl + "User/GetUserByID/" + id);
  }

  insertNewUser (user: User) {
    user.createBy = this.authenticationService.getUserName;
    var body = JSON.stringify(user);
    return this.httpClient.post<ReturnResult<User>>(ApiUrl.apiUrl + "User/CreateUser", body, { headers: HttpHeadersOptions.headers });
  }

  updateUser (user: User) {
    user.updateBy = this.authenticationService.getUserName;
    return this.httpClient.post<ReturnResult<User>>(ApiUrl.apiUrl + "User/UpdateUser", JSON.stringify(user), { headers: HttpHeadersOptions.headers });
  }

  deleteUser (id: string) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<User>>(ApiUrl.apiUrl + "User/DeleteUser?id=" + id, { headers :HttpHeadersOptions.headers });
  }

  public _listners = new Subject();

  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }
  
  ngOnDestroy(): void {
    
  }
  
}
