import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { User } from '../../model/user.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserGroup } from '../../model/user-group.model';
import {Subject, Observable} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserGroupService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public userGroupGetSearchWithPaging(condi? : BaseCondition<UserGroup>) {
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
  return this.httpClient.post<UserGroup[]>(ApiUrl.apiUrl + 'Role/UserGroupGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  createNewUser(u: UserGroup) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    }
    var user = JSON.stringify(u);
    return this.httpClient.post<UserGroup>(ApiUrl.apiUrl + "Role/Create", user, httpOptions)
      .pipe(map((result) => {
        return result;
      }));
  }
  getAllRole() {
    return this.httpClient.get<ReturnResult<UserGroup>>(ApiUrl.apiUrl + "Role/GetAllRole");
  }

  getRoleName (id : string) {
    return this.httpClient.get<ReturnResult<UserGroup>>(ApiUrl.apiUrl + "Role/GetRoleByUserName/" + id);
  }

  getUserGroupById (id: number) {
    return this.httpClient.get<ReturnResult<UserGroup>>(ApiUrl.apiUrl + "Role/GetRoleByID/" + id);
  }

  insertNewUserGroup (userGroup: UserGroup) {
    // coquan.createBy = this.authenticationService.getUserName;
    var body = JSON.stringify(userGroup);
    return this.httpClient.post<ReturnResult<UserGroup>>(ApiUrl.apiUrl + "Role/CreateRole", body, { headers: HttpHeadersOptions.headers });
 }

  updateUserGroup (userGroup: UserGroup) {
    // coquan.updatedBy = this.authenticationService.getUserName;
    return this.httpClient.post<ReturnResult<UserGroup>>(ApiUrl.apiUrl + "Role/UpdateRole", JSON.stringify(userGroup), { headers: HttpHeadersOptions.headers });
  }

   // xóa cơ quan
   deleteUserGroup (id: number) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<UserGroup>>(ApiUrl.apiUrl + "Role/DeleteRole?id=" + id, { headers :HttpHeadersOptions.headers });
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
