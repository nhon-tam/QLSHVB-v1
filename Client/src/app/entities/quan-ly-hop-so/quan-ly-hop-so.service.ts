import { Injectable } from '@angular/core';
import { HopSo, hopsos } from '../../model/hop-so.model';
import { HoSo } from '../../model/ho-so.model';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { DanhMuc, danhMucSelect2 } from '../../model/danh-muc.model';
import { Phong, fontSelect2 } from '../../model/phong.model';
import { Observable, Subject } from 'rxjs';
import { ProfileDTO } from '../../model/hosodto';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHopSoService {
  hopsos: HopSo[];
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  
  public getListHoSoByHopSoId (condi? : BaseCondition<HoSo>) {
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
  return this.httpClient.post<HoSo[]>(ApiUrl.apiUrl + 'GearBox/GetProfileByGearBoxID', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public getAllHopSoWithPaging(condi? : BaseCondition<HopSo>) {
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
    return this.httpClient.post<HopSo[]>(ApiUrl.apiUrl + 'GearBox/GetPagingWithSearchResults', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  insertNewHopSo (hopso: HopSo) {
    var body = JSON.stringify(hopso);
    return this.httpClient.post<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/CreateGearBox", body, { headers: HttpHeadersOptions.headers });
  }
  getGearBoxByTableOfContentId (tabOfContID: number) {
    return this.httpClient.get<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/GetGearBoxByTabOfContID/" + tabOfContID);
  }

  getFillDataByProfileID(profileID: number){
    return this.httpClient.get<ReturnResult<ProfileDTO>>(ApiUrl.apiUrl + "Profile/GetFillDataByProfileID/" + profileID);
  }
  getGearBoxByTabOfContForEditID(tabOfContID: number){
    return this.httpClient.get<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/GetGearBoxByTabOfContForEditID/" + tabOfContID);
  }
  getHopSoById (gearBoxID: number) {
    return this.httpClient.get<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/GetGearBoxByID/" + gearBoxID);
  }

  updateHopSo (hopso: HopSo) {
    return this.httpClient.post<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/UpdateGearBox", JSON.stringify(hopso), { headers: HttpHeadersOptions.headers });
  }

  getListHopSoByDanhMucId (condi? : BaseCondition<HopSo>){
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex : condi.PageIndex,
        PageSize: 5,
        IN_WHERE: ""
      }
    }
    else {
      condition = {
        PageIndex : 1,
        PageSize: 5,
        IN_WHERE: ""
      }
    }
   //  var reqOptions = HttpUtilities.convert(condi);
   var reqOptions = JSON.stringify(condi);
    const options = HttpUtilities.createRequestOption(reqOptions);
    return this.httpClient.get<HopSo[]>(ApiUrl.apiUrl + 'GearBox/GetPagingWithSearchResults', { headers: { 'Access-Control-Allow-Origin': '*' }, params: condition, observe: 'response' });
  }
  getAllHoSo (){
    return this.httpClient.get<ReturnResult<HopSo>>(ApiUrl.apiUrl + "Profile/GetAllProfile");
  }
  deleteHopSo (id: string) {
    var body = {
      id: id
    }
    var params = JSON.stringify(body);
    return this.httpClient.post<ReturnResult<HopSo>>(ApiUrl.apiUrl + "GearBox/DeleteGearBox?id=" + id, { headers :HttpHeadersOptions.headers });
  }

  getFontByOrganId (id: string) {
    var params = {
      organID: id
    }
    return this.httpClient.get<Phong[]>(ApiUrl.apiUrl + "GearBox/GetFontsByOrganID", { params: params });
  }

  getFontsByOrganIDSelect2 (id: string) {
    var params = {
      organID: id
    }
    return this.httpClient.get<fontSelect2[]>(ApiUrl.apiUrl + "GearBox/GetFontsByOrganIDSelect2", { params: params });
  }

  getTabByFontIDSelect2 (id: string) {
    var params = {
      fontID: id
    }
    return this.httpClient.get<danhMucSelect2[]>(ApiUrl.apiUrl + "GearBox/GetTableOfContentsByFontIDSelect2", { params: params });
  }

  getTabByFontId (id: any) {
    var params = {
      fontID: id
    }
    return this.httpClient.get<DanhMuc[]>(ApiUrl.apiUrl + "GearBox/GetTableOfContentsByFontID", { params: params });
  }

  public _listners = new Subject();

  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }

  onDistroy(): void{
    
  }
}
