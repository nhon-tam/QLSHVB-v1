import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReturnResult } from '../../common';
import { TinhTrangVatLy } from '../../model/tinh-trang-vat-ly';
import { TinhTrangVatLyService } from './tt-vat-ly.service';
@Injectable({
  providedIn: 'root'
})
export class QuanLyTinhTrangVatLyPopupService {
    private ngbModalRef: NgbModalRef;
    private tinhTrangVatLyId : number;
    private tinhTrangVatLy: TinhTrangVatLy;
    public result : ReturnResult<TinhTrangVatLy>;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private service: TinhTrangVatLyService,
    ) {
        this.ngbModalRef = null;
        this.tinhTrangVatLy = new TinhTrangVatLy();
        this.result = new ReturnResult<TinhTrangVatLy>();
    }

    public open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.tinhTrangVatLyId = id;
                this.service.getTinhTrangVatLyById(id)
                    .subscribe((result) => {
                        this.result = result;
                        const tinhTrangVatLy : TinhTrangVatLy = result.item;
                        this.ngbModalRef = this.TinhTrangVatLyModalRef(component, tinhTrangVatLy);
                        resolve(this.ngbModalRef);
                    });
                this.ngbModalRef = this.TinhTrangVatLyModalRef(component, this.tinhTrangVatLy);
                resolve(this.ngbModalRef);
            } else {
                this.result.item = undefined;
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.TinhTrangVatLyModalRef(component, new TinhTrangVatLy());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    public TinhTrangVatLyModalRef(component: Component, TinhTrangVatLy: TinhTrangVatLy): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        return modalRef;
    }

}
