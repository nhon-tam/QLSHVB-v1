import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReturnResult } from '../../common';
import { MucDoTinCay } from '../../model/muc-do-tin-cay';
import { MucDoTinCayService } from './muc-do-tin-cay.service';
@Injectable({
  providedIn: 'root'
})
export class QuanLyMucDoTinCayPopupService {
    private ngbModalRef: NgbModalRef;
    private mucDoTinCayID : number;
    private mucDoTinCay: MucDoTinCay;
    public result : ReturnResult<MucDoTinCay>;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private service: MucDoTinCayService,
    ) {
        this.ngbModalRef = null;
        this.mucDoTinCay = new MucDoTinCay();
        this.result = new ReturnResult<MucDoTinCay>();
    }

    public open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.mucDoTinCayID = id;
                this.service.getMucDoTinCayById(id)
                    .subscribe((result) => {
                        this.result = result;
                        const mucDoTinCay : MucDoTinCay = result.item;
                        this.ngbModalRef = this.MucDoTinCayModalRef(component, mucDoTinCay);
                        resolve(this.ngbModalRef);
                    });
                this.ngbModalRef = this.MucDoTinCayModalRef(component, this.mucDoTinCay);
                resolve(this.ngbModalRef);
            } else {
                this.result.item = undefined;
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.MucDoTinCayModalRef(component, new MucDoTinCay());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    public MucDoTinCayModalRef(component: Component, MucDoTinCay: MucDoTinCay): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        return modalRef;
    }

}
