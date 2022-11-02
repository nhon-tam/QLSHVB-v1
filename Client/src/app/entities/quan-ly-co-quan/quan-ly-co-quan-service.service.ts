import { Injectable, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { Phong, phongs } from '../../model/phong.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../../services/authentication.service';
import { OrganType } from '../../model/organ-type.model';
import { Tinh } from '../../model/tinh.model';
import { Huyen } from '../../model/huyen.model';
import { Xa } from '../../model/xa.model';
import { OrganFilter } from '../../model/organ-filter.model';
import { HoSo } from '../../model/ho-so.model';
// import { Select2OptionData } from 'ng-select2';

@Injectable({
  providedIn: 'root'
})
export class QuanLyCoQuanService {
  coquans: CoQuan[];
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }

  public getListPhongByCoQuanId (id: number) {
    
  }
  public getAllCoQuanWithPaging(condi? : BaseCondition<CoQuan>) {
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
  return this.httpClient.post<CoQuan[]>(ApiUrl.apiUrl + 'CoQuan/GetCoQuanWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

   insertNewCoQuan (coquan: CoQuan) {
      coquan.createBy = this.authenticationService.getUserName;
      if (coquan.huyenID == 0) { coquan.huyenID = undefined };
      if (coquan.xaPhuongID == 0) { coquan.xaPhuongID = undefined };
      var body = JSON.stringify(coquan);
      return this.httpClient.post<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/InsertCoQuan", body, { headers: HttpHeadersOptions.headers });
   }

  getCoQuanById (id: number) {
    return this.httpClient.get<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/GetCoQuanById/" + id);
  }

  updateCoQuan (coquan: CoQuan) {
    coquan.updatedBy = this.authenticationService.getUserName;
    if (coquan.huyenID == 0) coquan.huyenID = undefined;
    if (coquan.xaPhuongID == 0) coquan.xaPhuongID = undefined;
    return this.httpClient.post<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/UpdateCoQuan", JSON.stringify(coquan), { headers: HttpHeadersOptions.headers });
  }

  // lấy danh sách loại cơ quan
  getListOrganType() {
    return this.httpClient.get<OrganType[]>(ApiUrl.apiUrl + "OrganType/GetAllOrganType");
  }

  // lấy danh sách các tỉnh
  getListProvince() {
    return this.httpClient.get<Tinh[]>(ApiUrl.apiUrl + "Address/GetAllProvince");
  }

  // lấy danh sách quận huyện với tinhID
  getDistrictByProvinceId (id: string) {
    var params = {
      provinceId: id
    }
    return this.httpClient.get<Huyen[]>(ApiUrl.apiUrl + "Address/GetDistrictByProvinceID", { params: params });
  }

  getWardByDistrictId (id: string) {
    var params = {
      districtId: id
    }
    return this.httpClient.get<Xa[]>(ApiUrl.apiUrl + "Address/GetWardByDistrictID", { params: params });
  }

  getWardByProvinceId (id : any) {
    var params = {
      provinceId: id
    }
    return this.httpClient.get<Xa[]>(ApiUrl.apiUrl + "Address/GetAllWardsByProvinceId", { params: params });
  }

  // xóa cơ quan
  deleteCoQuan (id: string) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<CoQuan>>(ApiUrl.apiUrl + "CoQuan/DeleteCoQuan?id=" + id, { headers :HttpHeadersOptions.headers });
  }

  // filter
  getAllOrgan () {
    return this.httpClient.get<OrganFilter>(ApiUrl.apiUrl + "CoQuan/GetAllCoQuan");
  }

  getFontsByOrganId(condi?: BaseCondition<CoQuan>) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex: condi.PageIndex,
        PageSize: condi.PageSize,
        Item: condi.Item
      }
    }
    else {
      condition = {
        PageIndex: 1,
        PageSize: 5
      }
    }
    return this.httpClient.post<ReturnResult<Phong>>(ApiUrl.apiUrl + "CoQuan/GetFontsByOrganId", JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  
  private _listners = new Subject();

  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }
  
  
}
