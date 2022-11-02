import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserGroup } from '../../model/user-group.model';
import {Subject, Observable} from 'rxjs';
import { OrganType } from '../../model/organ-type.model';
@Injectable({
  providedIn: 'root'
})
export class OrganTypeService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public organTypeGetSearchWithPaging(condi? : BaseCondition<OrganType>) {
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
  return this.httpClient.post<OrganType[]>(ApiUrl.apiUrl + 'OrganType/OrganTypeGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  getAllOrganType() {
    return this.httpClient.get<ReturnResult<OrganType>>(ApiUrl.apiUrl + "OrganType/GetAllOrganType");
  }

  getOrganTypeById (id: number) {
    return this.httpClient.get<ReturnResult<OrganType>>(ApiUrl.apiUrl + "OrganType/GetOrganTypeByID/" + id);
  }

  insertNewOrganType (userGroup: OrganType) {
    // coquan.createBy = this.authenticationService.getUserName;
    var body = JSON.stringify(userGroup);
    return this.httpClient.post<ReturnResult<OrganType>>(ApiUrl.apiUrl + "OrganType/CreateOrganType", body, { headers: HttpHeadersOptions.headers });
 }

  updateOrganType (userGroup: OrganType) {
    // coquan.updatedBy = this.authenticationService.getUserName;
    return this.httpClient.post<ReturnResult<OrganType>>(ApiUrl.apiUrl + "OrganType/UpdateOrganType", JSON.stringify(userGroup), { headers: HttpHeadersOptions.headers });
  }

   // xóa cơ quan
   deleteOrganType (id: number) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<OrganType>>(ApiUrl.apiUrl + "OrganType/DeleteOrganType?id=" + id, { headers :HttpHeadersOptions.headers });
  }

  private _listners = new Subject();

  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }
  
  ngOnDestroy(): void {
    
  }
}
