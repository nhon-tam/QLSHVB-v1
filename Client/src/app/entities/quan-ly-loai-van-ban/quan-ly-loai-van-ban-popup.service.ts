import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReturnResult } from '../../common';
import { LoaiVanBan } from '../../model/loai-van-ban';
import { LoaiVanBanService } from './loai-van-ban.service';
@Injectable({
  providedIn: 'root'
})
export class QuanLyLoaiVanBanPopupService {
    private ngbModalRef: NgbModalRef;
    private loaiVanBanID : number;
    private loaiVanBan: LoaiVanBan;
    public result : ReturnResult<LoaiVanBan>;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private service: LoaiVanBanService,
    ) {
        this.ngbModalRef = null;
        this.loaiVanBan = new LoaiVanBan();
        this.result = new ReturnResult<LoaiVanBan>();
    }

    public open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.loaiVanBanID = id;
                this.service.getLoaiVanBanById(id)
                    .subscribe((result) => {
                        this.result = result;
                        const loaiVanBan : LoaiVanBan = result.item;
                    }, (error) => {

                    }, () => {
                        this.ngbModalRef = this.OrganTypeModalRef(component, this.loaiVanBan);
                        resolve(this.ngbModalRef);
                    });
            } else {
                this.result.item = undefined;
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.OrganTypeModalRef(component, new LoaiVanBan());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    public OrganTypeModalRef(component: Component, loaiVanBan: LoaiVanBan): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        return modalRef;
    }

}
