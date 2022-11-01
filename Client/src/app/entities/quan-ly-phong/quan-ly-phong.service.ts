import { Injectable } from '@angular/core';
import { Phong, phongs } from '../../model/phong.model';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { CoQuan, coquans, organ, organSelect2 } from '../../model/co-quan.model';
import { Observable, Subject } from 'rxjs';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { async } from 'rxjs/internal/scheduler/async';
import { Language } from '../../model/language.model';

@Injectable({
  providedIn: 'root'
})
export class QuanLyPhongService {
  phongs: Phong[]
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  public getListPhongByCoQuanId (id: number) {
    var phong : Phong[] = [];
    for (let i = 0; i < phongs.length; i ++) {
      if (phongs[i].organID == id) {
        phong.push(phongs[i]);
      }
    }
    return phong;
  }
  
  public getAllPhongWithPaging(condi? : BaseCondition<Phong>) {
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
  return this.httpClient.post<Phong[]>(ApiUrl.apiUrl + 'Font/GetFontWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  insertNewPhong (phong: Phong) {
    var body = JSON.stringify(phong);
    return this.httpClient.post<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/InsertFont", body, { headers: HttpHeadersOptions.headers });
  }

  getCoQuanById (id: number) {
    return this.httpClient.get<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/GetCoQuanById/" + id);
  }

  updatePhong (phong: Phong) {
    return this.httpClient.post<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/UpdateFont", JSON.stringify(phong), { headers: HttpHeadersOptions.headers });
  }

  getPhongById (id: number) {
    return this.httpClient.get<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/GetFontByID/" + id);
  }
  
  getListDanhMucByPhongId (condi? : BaseCondition<DanhMuc>){
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
  return this.httpClient.post<DanhMuc[]>(ApiUrl.apiUrl + 'TableOfContents/GetTableOfContentsByFontID', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }
  
  getAllCoQuan (){
    return this.httpClient.get<ReturnResult<organ>>(ApiUrl.apiUrl + "Organ/GetAllOrgan");
  }

  GetAllOrganSelect2 (){
    return this.httpClient.get<organSelect2[]>(ApiUrl.apiUrl + "Organ/GetAllOrganSelect2");
  }

  deletePhong (id: number) {
    return this.httpClient.post<ReturnResult<Phong>>(ApiUrl.apiUrl + "Font/DeleteFont?id=" + id, { headers :HttpHeadersOptions.headers });
  }
  
  public getLanguageList(){
    return this.httpClient.get<ReturnResult<Language>>(ApiUrl.apiUrl + "Language/GetAllLanguage");
  }

  private _listners = new Subject();

  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }
  

  onDistroy(): void{
  }
}

