import { Injectable } from '@angular/core';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Status } from '../model/common-status';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  statuss: Status[];
  constructor(private httpClient : HttpClient, private authenticationService: AuthenticationService) { }
  
  
  getAllStatus (){
    return this.httpClient.get<ReturnResult<Status>>(ApiUrl.apiUrl + "Status/GetAllStatus");
  }

  onDistroy(): void{
    
  }
}
