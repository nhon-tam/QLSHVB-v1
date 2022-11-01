import { Injectable } from '@angular/core';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';
import { HopSo, hopsos } from '../../model/hop-so.model';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { Phong, phongs } from '../../model/phong.model';
import { organ, organSelect2 } from '../../model/co-quan.model';
import {Subject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class QuanLyDanhMucService {
  danhmucs: DanhMuc[];
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  getListHopSoByDanhMucId (condi? : BaseCondition<HopSo>){
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
  return this.httpClient.post<HopSo[]>(ApiUrl.apiUrl + 'GearBox/GetGearBoxByTabOfContID', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }
  

  public getAllDanhMucWithPaging(condi? : BaseCondition<DanhMuc>) {
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
  return this.httpClient.post<DanhMuc[]>(ApiUrl.apiUrl + 'TableOfContents/GetPagingWithSearchResults', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  insertNewDanhMuc (danhmuc: DanhMuc) {
    var body = JSON.stringify(danhmuc);
    return this.httpClient.post<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/InsertTableOfContents", body, { headers: HttpHeadersOptions.headers });
  }

  getDanhMucById (tableOfContentsID: number) {
    return this.httpClient.get<ReturnResult<HopSo>>(ApiUrl.apiUrl + "TableOfContents/GetTableOfContentsByID/" + tableOfContentsID);
  }

  updateDanhMuc (danhmuc: DanhMuc) {
    return this.httpClient.post<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/UpdateTableOfContents", JSON.stringify(danhmuc), { headers: HttpHeadersOptions.headers });
  }

  getListDanhMucByPhongId (phongID : number){
    return this.httpClient.get<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/GetTableOfContentsByFontID/" +phongID);
  }
  getAllPhong (){
    return this.httpClient.get<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/GetAllFont");
  }
  getAllCoQuan (){
    return this.httpClient.get<ReturnResult<organ>>(ApiUrl.apiUrl + "Organ/GetAllOrgan");
  }

  GetAllOrganSelect2 (){
    return this.httpClient.get<organSelect2[]>(ApiUrl.apiUrl + "Organ/GetAllOrganSelect2");
  }
  
  deleteDanhMuc (id: string) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/DeleteTableOfContents?id=" + id, { headers :HttpHeadersOptions.headers });
  }
  getAllDanhMuc() {
    return this.httpClient.get<ReturnResult<DanhMuc>>(ApiUrl.apiUrl + "TableOfContents/GetAllTableOfContents");
  }

  private _listners = new Subject();

  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }
  
  onDestroy(): void{

  }
}
