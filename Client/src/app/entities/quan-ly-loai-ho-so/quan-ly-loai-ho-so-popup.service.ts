import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReturnResult } from '../../common';
import { LoaiHoSo } from '../../model/loai-ho-so';
import { LoaiHoSoService } from './loai-ho-so.service';
@Injectable({
  providedIn: 'root'
})
export class QuanLyLoaiHoSoPopupService {
    private ngbModalRef: NgbModalRef;
    private loaiHoSoID : number;
    private loaiHoSo: LoaiHoSo;
    public result : ReturnResult<LoaiHoSo>;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private service: LoaiHoSoService,
    ) {
        this.ngbModalRef = null;
        this.loaiHoSo = new LoaiHoSo();
        this.result = new ReturnResult<LoaiHoSo>();
    }

    public open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.loaiHoSoID = id;
                this.service.getLoaiHoSoById(id)
                    .subscribe((result) => {
                        this.result = result;
                        const LoaiHoSo : LoaiHoSo = result.item;
                        
                    }, (error) => {

                    }, () => {
                        this.ngbModalRef = this.LoaiHoSoModalRef(component, new LoaiHoSo());
                        resolve(this.ngbModalRef);
                    });
                // this.ngbModalRef = this.LoaiHoSoModalRef(component, this.loaiHoSo);
                // resolve(this.ngbModalRef);
            } else {
                this.result.item = undefined;
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.LoaiHoSoModalRef(component, new LoaiHoSo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    public LoaiHoSoModalRef(component: Component, LoaiHoSo: LoaiHoSo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        return modalRef;
    }

}
