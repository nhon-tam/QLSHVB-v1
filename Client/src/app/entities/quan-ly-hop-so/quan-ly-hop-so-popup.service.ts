import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HopSo, hopsos } from '../../model/hop-so.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import {QuanLyHopSoService} from '../quan-ly-hop-so/quan-ly-hop-so.service';
@Injectable({
  providedIn: 'root'
})
export class QuanLyHopSoPopupService {
    private ngbModalRef: NgbModalRef;
    private id : number;
    public tableOfContID: number;
    public result : ReturnResult<HopSo>;
    hopso: HopSo;
  constructor(
      private modalService: NgbModal,
      private router: Router,
      private httpClient : HttpClient, 
      private authenticationService: AuthenticationService,
      private hopSoService: QuanLyHopSoService

  ) {
    this.ngbModalRef = null;
    this.ngbModalRef = null;
    this.result = new ReturnResult<HopSo>();
    this.tableOfContID = 0;
  }
    private hopsos : HopSo[];
    public open(component: Component, id?: number | any, tableOfContID: number = 0): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            return new Promise<NgbModalRef>((resolve, reject) => {
                const isOpen = this.ngbModalRef !== null;
                if (isOpen) {
                    resolve(this.ngbModalRef);
                }

                if (id && id != 0) {
                    this.id = id;
                    this.hopSoService.getHopSoById(id)
                    .subscribe((result) => {
                        this.result = result;
                        const hopso : HopSo = result.item;
                    }, (error) => {

                    }, () => {
                        this.ngbModalRef = this.hopSoModalRef(component, this.hopso);
                        resolve(this.ngbModalRef);
                    });
                } else {
                    if(tableOfContID != 0){
                        this.tableOfContID = tableOfContID;
                    }
                    this.result.item = undefined;
                    setTimeout(() => {
                        this.ngbModalRef = this.hopSoModalRef(component, new HopSo());
                        resolve(this.ngbModalRef);
                    }, 0);
                }
            });
        });
    }
    public hopSoModalRef(component: Component, hopso: HopSo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        return modalRef;
    }
}
