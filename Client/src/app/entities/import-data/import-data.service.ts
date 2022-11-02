import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { QuanLyCoQuanService } from '../quan-ly-co-quan/quan-ly-co-quan-service.service';
import { BaseCondition, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { DigitalSignature } from '../../model/digital-signature.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../../services/authentication.service';
import { ValidImport } from '../../model/valid-Import.model';

@Injectable({
  providedIn: 'root'
})
export class ImportDataService implements OnInit, OnDestroy{

  private _listners = new Subject();
  constructor(private _httpClient: HttpClient,
    private authenticationService: AuthenticationService)
  { }
  
  ngOnInit(): void {
    
  }

  public DownloadImportTemplate(): any {
    var accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('authorization','Bearer '+ accessToken);
    return this._httpClient.get(ApiUrl.apiUrl + "BulkData/DownloadImportTemplate", { responseType: 'blob', headers:headers})
    .pipe(
      map((res) => {
        return new Blob([res], { type: res.type })
      })
    )
  }

  public validFileupload (data: ValidImport, files?: FormData) {
    var accessToken = localStorage.getItem('access-token');
    const headers = new HttpHeaders().set('authorization','Bearer '+ accessToken);
    data.createdBy = this.authenticationService.getUserName;
    var formData = new FormData();
    var validData = JSON.stringify(data);
    if (files != undefined) {
      formData = files;
    }
    formData.append('validData', validData);
    return this._httpClient.post<any>(ApiUrl.apiUrl + "BulkData/ValidateBulkInsert" ,formData , { headers:headers});
  }

  listen () : Observable<any>{
    return this._listners.asObservable();
  }

  filter (filterBy: string){
    this.listen();
    this._listners.next(filterBy);
  }

  ngOnDestroy(): void {
    
  }
}
