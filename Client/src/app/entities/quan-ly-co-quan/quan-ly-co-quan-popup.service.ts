import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { CoQuan, coquans } from '../../model/co-quan.model';
import { ReturnResult } from '../../common';
import { QuanLyCoQuanService } from './quan-ly-co-quan-service.service';

@Injectable()
export class QuanLyCoQuanPopupService {
  private ngbModalRef: NgbModalRef;
  private id : number;
  public result : ReturnResult<CoQuan>;
  constructor(
      private modalService: NgbModal,
      private router: Router,
      private coQuanService: QuanLyCoQuanService
  ) {
      this.ngbModalRef = null;
      this.result = new ReturnResult<CoQuan>();
  }
  private coquans : CoQuan[];
  public open(component: Component, id?: number | any): Promise<NgbModalRef> {
      return new Promise<NgbModalRef>((resolve, reject) => {
          const isOpen = this.ngbModalRef !== null;
          if (isOpen) {
              resolve(this.ngbModalRef);
          }

          if (id != null) {
              this.id = id;
              this.coQuanService.getCoQuanById(id)
                .subscribe((result) => {
                    this.result = result;
                }, (error) => {

                },
                () => {
                    this.ngbModalRef = this.coQuanModalRef(component, new CoQuan());
                    resolve(this.ngbModalRef);
                });
          } else {
              this.result.item = undefined;
              setTimeout(() => {
                  this.ngbModalRef = this.coQuanModalRef(component, new CoQuan());
                  resolve(this.ngbModalRef);
              }, 0);
          }
      });
  }
  
 public coQuanModalRef(component: Component, coquan: CoQuan): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
      return modalRef;
  }
}
