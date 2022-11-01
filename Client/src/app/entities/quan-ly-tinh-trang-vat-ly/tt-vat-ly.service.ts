import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Subject, Observable} from 'rxjs';
import { TinhTrangVatLy } from '../../model/tinh-trang-vat-ly';
@Injectable({
  providedIn: 'root'
})
export class TinhTrangVatLyService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public TinhTrangVatLyGetSearchWithPaging(condi? : BaseCondition<TinhTrangVatLy>) {
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
    return this.httpClient.post<TinhTrangVatLy[]>(ApiUrl.apiUrl + 'TinhTrangVatLy/TinhTrangVatLyGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  getAllTinhTrangVatLy() {
    return this.httpClient.get<ReturnResult<TinhTrangVatLy>>(ApiUrl.apiUrl + "TinhTrangVatLy/GetAllTinhTrangVatLy");
  }

  getTinhTrangVatLyById (id: number) {
    return this.httpClient.get<ReturnResult<TinhTrangVatLy>>(ApiUrl.apiUrl + "TinhTrangVatLy/GetTinhTrangVatLyByID/" + id);
  }

  insertNewTinhTrangVatLy (tinhTrangVatLy: TinhTrangVatLy) {
    var body = JSON.stringify(tinhTrangVatLy);
    return this.httpClient.post<ReturnResult<TinhTrangVatLy>>(ApiUrl.apiUrl + "TinhTrangVatLy/CreateTinhTrangVatLy", body, { headers: HttpHeadersOptions.headers });
 }

  updateTinhTrangVatLy (tinhTrangVatLy: TinhTrangVatLy) {
    return this.httpClient.post<ReturnResult<TinhTrangVatLy>>(ApiUrl.apiUrl + "TinhTrangVatLy/UpdateTinhTrangVatLy", JSON.stringify(tinhTrangVatLy), { headers: HttpHeadersOptions.headers });
  }

   // xóa cơ quan
   deleteTinhTrangVatLy (id: number) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<TinhTrangVatLy>>(ApiUrl.apiUrl + "TinhTrangVatLy/DeleteTinhTrangVatLy?id=" + id, { headers :HttpHeadersOptions.headers });
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
