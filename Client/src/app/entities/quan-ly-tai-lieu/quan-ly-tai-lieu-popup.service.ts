import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { Document } from '../../model/document.model';
import { QuanLyTaiLieuService } from './quan-ly-tai-lieu.service';
import { ReturnResult } from '../../common';

@Injectable({
  providedIn: 'root'
})
export class QuanLyTaiLieuPopupService {

  private ngbModalRef: NgbModalRef;
  private id : number;
  public result : ReturnResult<Document>;
  constructor(
      private modalService: NgbModal,
      private router: Router,
      private taiLieuService: QuanLyTaiLieuService
  ) {
      this.ngbModalRef = null;
      this.result = new ReturnResult<Document>();
  }
  private documents : Document[];
  public open(component: Component, id?: number | any): Promise<NgbModalRef> {
      return new Promise<NgbModalRef>((resolve, reject) => {
          const isOpen = this.ngbModalRef !== null;
          if (isOpen) {
              resolve(this.ngbModalRef);
          }

          if (id != null) {
              this.id = id;
              this.taiLieuService.getDocumentById(id)
                .subscribe((result) => {
                    this.result = result;
                    const document : Document = result.item;
                }, (error) => {

                }, () => {
                    this.ngbModalRef = this.documentModalRef(component, new Document());
                    resolve(this.ngbModalRef);
                });
                
          } else {
              this.result.item = undefined;
              setTimeout(() => {
                  this.ngbModalRef = this.documentModalRef(component, new Document());
                  resolve(this.ngbModalRef);
              }, 0);
          }
      });
  }
 public documentModalRef(component: Component, document: Document): NgbModalRef {
    const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
    return modalRef;
  }
}
