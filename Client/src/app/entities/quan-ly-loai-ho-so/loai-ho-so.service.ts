import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Subject, Observable} from 'rxjs';
import { LoaiHoSo } from '../../model/loai-ho-so';
@Injectable({
  providedIn: 'root'
})
export class LoaiHoSoService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public LoaiHoSoGetSearchWithPaging(condi? : BaseCondition<LoaiHoSo>) {
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
    return this.httpClient.post<LoaiHoSo[]>(ApiUrl.apiUrl + 'LoaiHoSo/LoaiHoSoGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  getAllLoaiHoSo() {
    return this.httpClient.get<ReturnResult<LoaiHoSo>>(ApiUrl.apiUrl + "LoaiHoSo/GetAllLoaiHoSo");
  }

  getLoaiHoSoById (id: number) {
    return this.httpClient.get<ReturnResult<LoaiHoSo>>(ApiUrl.apiUrl + "LoaiHoSo/GetLoaiHoSoByID/" + id);
  }

  insertNewLoaiHoSo (loaiHoSo: LoaiHoSo) {
    var body = JSON.stringify(loaiHoSo);
    return this.httpClient.post<ReturnResult<LoaiHoSo>>(ApiUrl.apiUrl + "LoaiHoSo/CreateLoaiHoSo", body, { headers: HttpHeadersOptions.headers });
 }

  updateLoaiHoSo (loaiHoSo: LoaiHoSo) {
    return this.httpClient.post<ReturnResult<LoaiHoSo>>(ApiUrl.apiUrl + "LoaiHoSo/UpdateLoaiHoSo", JSON.stringify(loaiHoSo), { headers: HttpHeadersOptions.headers });
  }

   // xóa cơ quan
   deleteLoaiHoSo (id: number) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<LoaiHoSo>>(ApiUrl.apiUrl + "LoaiHoSo/DeleteLoaiHoSo?id=" + id, { headers :HttpHeadersOptions.headers });
  }

  private _listners = new Subject();

  listen () : Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }
  
  ngOnDestroy(): void {
    
  }
}
