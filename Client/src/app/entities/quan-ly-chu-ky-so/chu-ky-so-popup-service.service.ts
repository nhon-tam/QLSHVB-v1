import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ReturnResult } from '../../common';
import { DigitalSignature } from '../../model/digital-signature.model';
import { QuanLyChuKySoService } from './quan-ly-chu-ky-so.service';

@Injectable()
export class ChuKySoPopupService {
  private ngbModalRef: NgbModalRef;
  public result : ReturnResult<DigitalSignature>;
  id: number;
  constructor(
      private modalService: NgbModal,
      private router: Router,
      private service: QuanLyChuKySoService
  ) {
      this.ngbModalRef = null;
      this.result = new ReturnResult<DigitalSignature>();
  }
  public open(component: Component, id?: number | any): Promise<NgbModalRef> {
      return new Promise<NgbModalRef>((resolve, reject) => {
          const isOpen = this.ngbModalRef !== null;
          if (isOpen) {
              resolve(this.ngbModalRef);
          }
          if (id != null) {
              this.id = id;
              this.service.signatureGetById(id)
                .subscribe((result) => {
                    this.result = result;  
                },
                (error) => {

                }, () => {
                  this.ngbModalRef = this.coQuanModalRef(component, new DigitalSignature());
                  resolve(this.ngbModalRef);
                });
                
          } else {
              this.result.item = undefined;
              setTimeout(() => {
                  this.ngbModalRef = this.coQuanModalRef(component, new DigitalSignature());
                  resolve(this.ngbModalRef);
              }, 0);
          }
      });
  }

  public openChangeStatus(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
        const isOpen = this.ngbModalRef !== null;
        if (isOpen) {
            resolve(this.ngbModalRef);
        }
        if (id != null) {
            this.id = id;
            this.service.signatureGetById(id)
              .subscribe((result) => {
                  this.result = result;  
              },
              (error) => {

              }, () => {
                this.ngbModalRef = this.coQuanModalRef(component, new DigitalSignature());
                resolve(this.ngbModalRef);
              });
              
        } else {
            this.result.item = undefined;
            setTimeout(() => {
                this.ngbModalRef = this.coQuanModalRef(component, new DigitalSignature());
                resolve(this.ngbModalRef);
            }, 0);
        }
    });
}
  
 public coQuanModalRef(component: Component, digital: DigitalSignature): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
      return modalRef;
  }
}
