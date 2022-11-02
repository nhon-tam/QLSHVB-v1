import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { DanhMuc, danhmucs } from '../../model/danh-muc.model';
import { Phong, phongs } from '../../model/phong.model';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication.service';
import { BaseCondition, HttpUtilities, ApiUrl, ReturnResult, HttpHeadersOptions } from '../../common';
import { QuanLyDanhMucService } from './quan-ly-danh-muc.service';

@Injectable({
  providedIn: 'root'
})
export class QuanLyDanhMucPopupService {
    private ngbModalRef: NgbModalRef;
    private id : number;
    public fontID : number;
    public result : ReturnResult<DanhMuc>;
    danhmuc: DanhMuc;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private httpClient : HttpClient, 
        private authenticationService: AuthenticationService,
        private danhMucService: QuanLyDanhMucService
    ) {
        this.ngbModalRef = null;
        this.ngbModalRef = null;
        this.result = new ReturnResult<DanhMuc>();
        this.fontID = 0;
    }
    private DanhMucs : DanhMuc[];
    public open(component: Component, id?: number | any, fontID: number = 0): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id && id != 0) {
                this.id = id;
                this.danhMucService.getDanhMucById(id)
                .subscribe((result) => {
                    this.result = result;
                    const danhmuc : DanhMuc = result.item;
                }, (error) => {

                }, () => {
                    this.ngbModalRef = this.DanhMucModalRef(component, this.danhmuc);
                    resolve(this.ngbModalRef);
            });
            } else {
                if(fontID != 0){
                    this.fontID = fontID;
                }
                this.result.item = undefined;
                setTimeout(() => {
                    this.ngbModalRef = this.DanhMucModalRef(component, new DanhMuc());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }
    public DanhMucModalRef(component: Component, danhmuc: DanhMuc): NgbModalRef {
            const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
            return modalRef;
    }
}
