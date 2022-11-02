import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { OrganType } from '../../model/organ-type.model';
import { OrganTypeService } from './loai-co-quan.service';
import { ReturnResult } from '../../common';
import { QuanLyOrganTypeComponent } from './quan-ly-loai-co-quan.component';
@Injectable({
  providedIn: 'root'
})
export class QuanLyOrganTypePopupService {
    private ngbModalRef: NgbModalRef;
    private organTypeID : number;
    private organType: OrganType;
    public result : ReturnResult<OrganType>;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private organTypeService: OrganTypeService,
    ) {
        this.ngbModalRef = null;
        this.organType = new OrganType();
        this.result = new ReturnResult<OrganType>();
    }

    public open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.organTypeID = id;
                this.organTypeService.getOrganTypeById(id)
                    .subscribe((result) => {
                        this.result = result;
                        const organType : OrganType = result.item;
                    }, (error) => {

                    }, () => {
                        this.ngbModalRef = this.OrganTypeModalRef(component, this.organType);
                        resolve(this.ngbModalRef);
                    });
            } else {
                this.result.item = undefined;
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.OrganTypeModalRef(component, new OrganType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    public OrganTypeModalRef(component: Component, user: OrganType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        return modalRef;
    }

}
