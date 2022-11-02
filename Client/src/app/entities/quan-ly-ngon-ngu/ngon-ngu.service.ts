import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Subject, Observable} from 'rxjs';
import { NgonNgu } from '../../model/ngon-ngu';
@Injectable({
  providedIn: 'root'
})
export class NgonNguService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public NgonNguGetSearchWithPaging(condi? : BaseCondition<NgonNgu>) {
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
    return this.httpClient.post<NgonNgu[]>(ApiUrl.apiUrl + 'NgonNgu/NgonNguGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  getAllNgonNgu() {
    return this.httpClient.get<ReturnResult<NgonNgu>>(ApiUrl.apiUrl + "NgonNgu/GetAllNgonNgu");
  }

  getNgonNguById (id: number) {
    return this.httpClient.get<ReturnResult<NgonNgu>>(ApiUrl.apiUrl + "NgonNgu/GetNgonNguByID/" + id);
  }

  insertNewNgonNgu (ngonNgu: NgonNgu) {
    var body = JSON.stringify(ngonNgu);
    return this.httpClient.post<ReturnResult<NgonNgu>>(ApiUrl.apiUrl + "NgonNgu/CreateNgonNgu", body, { headers: HttpHeadersOptions.headers });
 }

  updateNgonNgu (ngonNgu: NgonNgu) {
    return this.httpClient.post<ReturnResult<NgonNgu>>(ApiUrl.apiUrl + "NgonNgu/UpdateNgonNgu", JSON.stringify(ngonNgu), { headers: HttpHeadersOptions.headers });
  }

   // xóa cơ quan
   deleteNgonNgu (id: number) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<NgonNgu>>(ApiUrl.apiUrl + "NgonNgu/DeleteNgonNgu?id=" + id, { headers :HttpHeadersOptions.headers });
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
