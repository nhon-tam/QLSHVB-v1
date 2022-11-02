import { Injectable } from '@angular/core';
import { Document } from '../../model/document.model';
import { BaseCondition } from '../../common/BaseCondition';
import { HttpHeadersOptions, ApiUrl, CacheHeaders } from '../../common/Enviroment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { ReturnResult } from '../../common/ReturnResult';
import { DocumentType } from '../../model/document-type.model';
import { HoSo } from '../../model/ho-so.model';
import { Language } from '../../model/language.model';
import { Format } from '../../model/format.model';
import { ConfidenceLevel } from '../../model/confidence-level.model';
import { HopSo } from '../../model/hop-so.model';
import { DocumentSearch } from '../../model/document-search';

@Injectable({
  providedIn: 'root'
})
export class QuanLyTaiLieuService {
  documents: Document[];
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }

  public getDocumentById(id) {
    return this.httpClient.get<ReturnResult<Document>>(ApiUrl.apiUrl + 'Document/GetDocumentById/' + id, { headers: CacheHeaders.headers });
  }

  public getAllTaiLieuWithPaging(condi? : BaseCondition<Document>) {
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
    return this.httpClient.post<Document[]>(ApiUrl.apiUrl + 'Document/GetPagingWithSearchResults', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }

  public getDocumentTypeList(){
    return this.httpClient.get<ReturnResult<DocumentType>>(ApiUrl.apiUrl + "DocumentType/GetAllDocumentType");
  }

  public getAllDocument(){
    return this.httpClient.get<ReturnResult<Document>>(ApiUrl.apiUrl + "Document/GetAllDocument");
  }

  public getLanguageList(){
    return this.httpClient.get<ReturnResult<Language>>(ApiUrl.apiUrl + "Language/GetAllLanguage");
  }
  public getFormatList(){
    return this.httpClient.get<ReturnResult<Format>>(ApiUrl.apiUrl + "Format/GetAllFormat");
  }
  public getConfidenceLevelList(){
    return this.httpClient.get<ReturnResult<ConfidenceLevel>>(ApiUrl.apiUrl + "ConfidenceLevel/GetAllConfidenceLevel");
  }
  public updateDocument(document : Document, checked?: boolean, signatureName?: string, docPath?: string){
    document.updatedBy = this.authenticationService.getUserName;
    let signature: string = '';
    if (checked === true && signatureName !== '') {
      signature = `?checked=true&name=${signatureName}&docPath=${docPath}`;
    }
    return this.httpClient.post<ReturnResult<Document>>(ApiUrl.apiUrl + "Document/UpdateDocument" + signature, JSON.stringify(document), { headers: HttpHeadersOptions.headers })
  }
  public getGearBoxByTableOfContentId(id : string){
    return this.httpClient.get<HopSo[]>(ApiUrl.apiUrl + 'GearBox/GetGearBoxByTabOfContID/' + id);
  }
  

  public createDocument(document: Document, checked?: boolean, signatureName?: string, docPath?: string){
    document.createdBy = this.authenticationService.getUserName;
    let signature: string = '';
    if (checked === true && signatureName !== '') {
      signature = `?checked=true&name=${signatureName}&docPath=${docPath}`;
    }
    return this.httpClient.post<ReturnResult<Document>>(ApiUrl.apiUrl + "Document/CreateDocument" + signature, JSON.stringify(document), { headers: HttpHeadersOptions.headers })
  }
  public deleteDocument(id : number){
    var document ={
      documentId: id
    }
    return this.httpClient.post<Document>(ApiUrl.apiUrl + "Document/CreateDocument", JSON.stringify(document), { headers: HttpHeadersOptions.headers })
  }

  
  public getProfileList(){
    // viet api di
    return this.httpClient.get<HoSo[]>(ApiUrl.apiUrl + "Profile/GetAllProfile");
  }

  public getDocumentPaging(condi? : BaseCondition<DocumentSearch>){
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
    return this.httpClient.post<Document[]>(ApiUrl.apiUrl + 'Document/GetDocumentPaging', JSON.stringify(condition), { headers: HttpHeadersOptions.headers });
  }
}
