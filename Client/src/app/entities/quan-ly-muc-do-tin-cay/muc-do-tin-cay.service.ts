import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Subject, Observable} from 'rxjs';
import { MucDoTinCay } from '../../model/muc-do-tin-cay';
@Injectable({
  providedIn: 'root'
})
export class MucDoTinCayService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public MucDoTinCayGetSearchWithPaging(condi? : BaseCondition<MucDoTinCay>) {
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
    return this.httpClient.post<MucDoTinCay[]>(ApiUrl.apiUrl + 'MucDoTinCay/MucDoTinCayGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  getAllMucDoTinCay() {
    return this.httpClient.get<ReturnResult<MucDoTinCay>>(ApiUrl.apiUrl + "MucDoTinCay/GetAllMucDoTinCay");
  }

  getMucDoTinCayById (id: number) {
    return this.httpClient.get<ReturnResult<MucDoTinCay>>(ApiUrl.apiUrl + "MucDoTinCay/GetMucDoTinCayByID/" + id);
  }

  insertNewMucDoTinCay (mucDoTinCay: MucDoTinCay) {
    var body = JSON.stringify(mucDoTinCay);
    return this.httpClient.post<ReturnResult<MucDoTinCay>>(ApiUrl.apiUrl + "MucDoTinCay/CreateMucDoTinCay", body, { headers: HttpHeadersOptions.headers });
 }

  updateMucDoTinCay (mucDoTinCay: MucDoTinCay) {
    return this.httpClient.post<ReturnResult<MucDoTinCay>>(ApiUrl.apiUrl + "MucDoTinCay/UpdateMucDoTinCay", JSON.stringify(mucDoTinCay), { headers: HttpHeadersOptions.headers });
  }

   // xóa cơ quan
   deleteMucDoTinCay (id: number) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<MucDoTinCay>>(ApiUrl.apiUrl + "MucDoTinCay/DeleteMucDoTinCay?id=" + id, { headers :HttpHeadersOptions.headers });
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
