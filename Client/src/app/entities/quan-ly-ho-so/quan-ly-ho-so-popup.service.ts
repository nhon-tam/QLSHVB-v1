import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { HoSo } from '../../model/ho-so.model';
import { QuanLyHoSoService } from './quan-ly-ho-so.service';
import { ReturnResult } from '../../common';

@Injectable({
  providedIn: 'root'
})
export class QuanLyHoSoPopupService {
  private ngbModalRef: NgbModalRef;
  private id : number;
  public gearBoxID: number;
  public profile: ReturnResult<HoSo>;
  constructor(
      private modalService: NgbModal,
      private router: Router,
      private service: QuanLyHoSoService
  ) 
  {
      this.ngbModalRef = null;
      this.gearBoxID = 0;
  }
  public open(component: Component, id?: number | any, gearBoxID: number = 0): Promise<NgbModalRef> {
      return new Promise<NgbModalRef>((resolve, reject) => {
          const isOpen = this.ngbModalRef !== null;
          if (isOpen) {
              resolve(this.ngbModalRef);
          }
          if (id && id != 0) {
                this.service.getProfilesById(id)
                .subscribe((result) => {
                    if (result.isSuccess)
                    {
                        this.profile = result;
                    }
                }, (error) => {

                }, () => {
                    this.ngbModalRef = this.hoSoModalRef(component, new HoSo());
                    resolve(this.ngbModalRef);
                }); 
          } else {
            if(gearBoxID != 0){
                this.gearBoxID = gearBoxID;
            }
              this.profile = undefined;
              // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
              setTimeout(() => {
                  this.ngbModalRef = this.hoSoModalRef(component, new HoSo());
                  resolve(this.ngbModalRef);
              }, 0);
          }
      });
  }

 public hoSoModalRef(component: Component, hoso: HoSo): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static', windowClass:'animated slideInUp'});
      return modalRef;
  }

  public getProfiles(id : number) {
    
  }
}
