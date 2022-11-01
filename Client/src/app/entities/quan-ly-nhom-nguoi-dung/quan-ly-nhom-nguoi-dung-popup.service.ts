import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { UserGroup } from '../../model/user-group.model';
import { UserGroupService } from './user-group.service';
import { ReturnResult } from '../../common';
import { QuanLyNhomNguoiDungComponent } from './quan-ly-nhom-nguoi-dung.component';
@Injectable({
  providedIn: 'root'
})
export class QuanLyNhomNguoiDungPopupService {
    private ngbModalRef: NgbModalRef;
    private roleId : number;
    private userGroup: UserGroup;
    public result : ReturnResult<UserGroup>;
    constructor(
        private modalService: NgbModal,
        private router: Router,
        private nhomNguoiDungService: UserGroupService,
    ) {
        this.ngbModalRef = null;
        this.userGroup = new UserGroup();
        this.result = new ReturnResult<UserGroup>();
    }

    public open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            if (id) {
                this.roleId = id;
                this.nhomNguoiDungService.getUserGroupById(id)
                    .subscribe((result) => {
                        this.result = result;
                        const userGroup : UserGroup = result.item;
                    }, (error) => {

                    }, () => {
                        this.ngbModalRef = this.UserModalRef(component, this.userGroup);
                        resolve(this.ngbModalRef);
                    });
               
            } else {
                this.result.item = undefined;
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.UserModalRef(component, new UserGroup());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }


    public UserModalRef(component: Component, user: UserGroup): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        return modalRef;
    }

}
