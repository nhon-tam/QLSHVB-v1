import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReturnResult } from '../../common';
import { NgonNgu } from '../../model/ngon-ngu';
import { NgonNguService } from './ngon-ngu.service';
@Injectable({
  providedIn: 'root'
})
export class QuanLyNgonNguPopupService {
    private ngbModalRef: NgbModalRef;
    private ngonNguID : number;
    private ngonNgu: NgonNgu;
    public result : ReturnResult<NgonNgu>;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private service: NgonNguService,
    ) {
        this.ngbModalRef = null;
        this.ngonNgu = new NgonNgu();
        this.result = new ReturnResult<NgonNgu>();
    }

    public open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.ngonNguID = id;
                this.service.getNgonNguById(id)
                    .subscribe((result) => {
                        this.result = result;
                        const ngonNgu : NgonNgu = result.item;
                        this.ngbModalRef = this.NgonNguModalRef(component, ngonNgu);
                        resolve(this.ngbModalRef);
                    });
                this.ngbModalRef = this.NgonNguModalRef(component, this.ngonNgu);
                resolve(this.ngbModalRef);
            } else {
                this.result.item = undefined;
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.NgonNguModalRef(component, new NgonNgu());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    public NgonNguModalRef(component: Component, NgonNgu: NgonNgu): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        return modalRef;
    }

}
