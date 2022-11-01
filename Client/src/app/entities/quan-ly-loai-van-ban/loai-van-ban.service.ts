import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { BaseCondition, ReturnResult, ApiUrl, HttpUtilities, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Subject, Observable} from 'rxjs';
import { LoaiVanBan } from '../../model/loai-van-ban';
@Injectable({
  providedIn: 'root'
})
export class LoaiVanBanService implements OnInit, OnDestroy { 

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    
  }

  public loaiVanBanGetSearchWithPaging(condi? : BaseCondition<LoaiVanBan>) {
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
    return this.httpClient.post<LoaiVanBan[]>(ApiUrl.apiUrl + 'LoaiVanBan/LoaiVanBanGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  getAllLoaiVanBan() {
    return this.httpClient.get<ReturnResult<LoaiVanBan>>(ApiUrl.apiUrl + "LoaiVanBan/GetAllLoaiVanBan");
  }

  getLoaiVanBanById (id: number) {
    return this.httpClient.get<ReturnResult<LoaiVanBan>>(ApiUrl.apiUrl + "LoaiVanBan/GetLoaiVanBanByID/" + id);
  }

  insertNewLoaiVanBan (loaiVanBan: LoaiVanBan) {
    // coquan.createBy = this.authenticationService.getUserName;
    var body = JSON.stringify(loaiVanBan);
    return this.httpClient.post<ReturnResult<LoaiVanBan>>(ApiUrl.apiUrl + "LoaiVanBan/CreateLoaiVanBan", body, { headers: HttpHeadersOptions.headers });
 }

  updateLoaiVanBan (loaiVanBan: LoaiVanBan) {
    // coquan.updatedBy = this.authenticationService.getUserName;
    return this.httpClient.post<ReturnResult<LoaiVanBan>>(ApiUrl.apiUrl + "LoaiVanBan/UpdateLoaiVanBan", JSON.stringify(loaiVanBan), { headers: HttpHeadersOptions.headers });
  }

   // xóa cơ quan
   deleteLoaiVanBan (id: number) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<LoaiVanBan>>(ApiUrl.apiUrl + "LoaiVanBan/DeleteLoaiVanBan?id=" + id, { headers :HttpHeadersOptions.headers });
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
