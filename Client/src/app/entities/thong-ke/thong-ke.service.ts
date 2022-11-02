import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { ApiUrl, BaseCondition, HttpHeadersOptions } from '../../common';
import { ThongKe, FilterDTO } from '../../model/thong-ke';
import { LogActivity } from '../../model/log-activity';
import { HoSoDTO } from '../../model/ho-so-dto';
import { VanBanDTO } from '../../model/van-ban-dto';

@Injectable({
  providedIn: 'root'
})
export class ThongKeService {

  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  
  getLinkExportFont (){
    return  (ApiUrl.apiUrl + "ExportFont/FontExport");
  }

  getLinkExportHopSo (){
    return  (ApiUrl.apiUrl + "ExportGearBox/GearBoxExport");
  }

  getLinkExportHoSo() {
    return  (ApiUrl.apiUrl + "ExportProfile/ExportProfile");
  }
  
  getLinkExportThongKe() {
    return  (ApiUrl.apiUrl + "ExportTK/ExportTK");
  }

  public getAllThongKeWithPaging(condi? : BaseCondition<ThongKe>) {
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
  return this.httpClient.post<ThongKe[]>(ApiUrl.apiUrl + 'ThongKe/GetFontWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public GetDataExportProfile(condi? : BaseCondition<HoSoDTO>) {
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
  return this.httpClient.post<HoSoDTO[]>(ApiUrl.apiUrl + 'ExportProfile/GetDataExportProfile', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public GetDataStatisticsPagingWithSearchResults(condi? : BaseCondition<FilterDTO>) {
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
  return this.httpClient.post<FilterDTO[]>(ApiUrl.apiUrl + 'Export/GetDataStatisticsPagingWithSearchResults', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public getAlllogActivityWithPaging(condi? : BaseCondition<LogActivity>) {
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
  return this.httpClient.post<LogActivity[]>(ApiUrl.apiUrl + 'LogActivity/LogActivityGetSearchWithPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public GetDataExportDocument(condi? : BaseCondition<VanBanDTO>) {
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
  return this.httpClient.post<VanBanDTO[]>(ApiUrl.apiUrl + 'ExportDocument/GetDataExportDocument', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }


}
