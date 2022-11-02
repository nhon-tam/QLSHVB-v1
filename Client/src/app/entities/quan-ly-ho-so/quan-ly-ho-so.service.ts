import { Injectable } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BaseCondition, ReturnResult, ApiUrl, HttpHeadersOptions } from '../../common';
import { AuthenticationService } from '../../services/authentication.service';
import { FileUpload } from '../../model/file.model';
import { Document } from '../../model/document.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class QuanLyHoSoService {
  hosos: HoSo[];
  constructor(private _httpClient: HttpClient, private authenticationService: AuthenticationService) { }

  public getHoSoById(id) {
    
  };
  public getListVanBanByHoSoId (id: number) {
    
  }
  public getProfileByGearBoxId(gearBoxId: string){
    return this._httpClient.get<ReturnResult<HoSo>>(ApiUrl.apiUrl + "Profile/GetProfileByGearBoxId/" + gearBoxId);
  }

  public DownloadFile(fileId: any) : Observable<any>
  {
    var accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('authorization','Bearer '+ accessToken);
    return this._httpClient.get(ApiUrl.apiUrl + "File/DownloadFile?fileId=" + fileId, {
      responseType: 'arraybuffer', headers:headers} );
  }


  public DownloadProfileAttachment(fileId: number): any {
    return this._httpClient.get(ApiUrl.apiUrl + "File/DownloadProfileAttachment?fileId=" + fileId, { responseType: 'blob'})
    .pipe(
      map((res) => {
        return new Blob([res], { type: res.type })
      })
    )
  }

  public getAllProfilesWithPaging(condi?: BaseCondition<HoSo>) {
    var condition = {};
    if (condi != undefined) {
      condition = {
        PageIndex: condi.PageIndex,
        PageSize: condi.PageSize,
        FilterRuleList: condi.FilterRuleList
      }
    }
    else {
      condition = {
        PageIndex: 1,
        PageSize: 5
      }
    }
    return this._httpClient.post<ReturnResult<HoSo>>(ApiUrl.apiUrl + "Profile/ProfilesGetSearchWithPaging", JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public insertSingleProfile (data: HoSo, files?: FormData) {
    // upload file
    data.createdBy = this.authenticationService.getUserName;
    var formData = new FormData();
    var profile = JSON.stringify(data);
    if (files != undefined) {
      formData = files;
    }
    formData.append('profile', profile);
    return this._httpClient.post<ReturnResult<any>>(ApiUrl.apiUrl + "Profile/ProfilesAddNewAndUploadFile", formData);
  }

  public updateSingleProfile (data: HoSo, files?: FormData) {
    // upload file
    data.createdBy = this.authenticationService.getUserName;
    var formData = new FormData();
    var profile = JSON.stringify(data);
    if (files != undefined) {
      formData = files;
    }
    formData.append('profile', profile);
    return this._httpClient.post<ReturnResult<any>>(ApiUrl.apiUrl + "Profile/ProfileUpdate", formData);
  }

  public getAllProfiles () {
    return this._httpClient.get<any>(ApiUrl.apiUrl + "Profile/GetAllProfiles");
  }

  public getAllGearBoxAndProfileType () {
    return this._httpClient.get<any>(ApiUrl.apiUrl + "Profile/GetAllProfileTypeAndGearBox");
  }

  public getProfilesById (id : any) {
    return this._httpClient.get<ReturnResult<HoSo>>(ApiUrl.apiUrl + "Profile/GetProfilesById?profileId=" + id);
  }
  public getComputerFilesByProfileId (id : any) {
    return this._httpClient.get<ReturnResult<FileUpload>>(ApiUrl.apiUrl + "Profile/GetComputerFileByProfileId/" + id);
  }
  
  public GetListFilesByProfileId (condi?: BaseCondition<HoSo>) {
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
    return this._httpClient.post<ReturnResult<FileUpload>>(ApiUrl.apiUrl + "Profile/GetListFilesByProfileId", JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public getDocumentsByProfileId (condi?: BaseCondition<HoSo>) {
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
    return this._httpClient.post<ReturnResult<Document>>(ApiUrl.apiUrl + "Profile/GetDocumentsByProfileId", JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  private _listners = new Subject();

  listen(): Observable<any>{
    return this._listners.asObservable();
  }

  filter(filterBy: string){
    this._listners.next(filterBy);
  }
  

}
