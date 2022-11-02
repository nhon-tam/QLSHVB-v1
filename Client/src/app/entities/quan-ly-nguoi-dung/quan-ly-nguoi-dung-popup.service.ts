import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { UserService } from './user.service';
import { ReturnResult } from '../../common';
@Injectable({
  providedIn: 'root'
})
export class QuanLyNguoiDungPopupService {
  private ngbModalRef: NgbModalRef;
  private id : number;
  private user: User;
  public result : ReturnResult<User>;
  constructor(
      private modalService: NgbModal,
      private router: Router,
      private service: UserService

  ) {
      this.ngbModalRef = null;
      this.user = new User();
      this.result = new ReturnResult<User>();
  }

  public open(component: Component, id?: number | any): Promise<NgbModalRef> {
      return new Promise<NgbModalRef>((resolve, reject) => {
          const isOpen = this.ngbModalRef !== null;
          if (isOpen) {
              resolve(this.ngbModalRef);
          }
          if (id) {
            this.id = id;
            this.service.getUserByID(id)
            .subscribe((result) => {
                this.result = result;
                const user : User = result.item;
                this.user = result.item;
            }, (error) => {

            }, () => {
                this.ngbModalRef = this.UserModalRef(component, this.user);
                resolve(this.ngbModalRef);
            });
        } else {
            this.result.item = undefined;
            setTimeout(() => {
                this.ngbModalRef = this.UserModalRef(component, new User());
                resolve(this.ngbModalRef);
            }, 0);
        }
      });
  }

 public UserModalRef(component: Component, user: User): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
      return modalRef;
  }
}
