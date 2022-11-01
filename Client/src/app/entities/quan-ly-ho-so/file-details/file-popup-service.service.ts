import { Injectable, Component } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { FileDetailsComponent } from './file-details.component';
import { FileUpload } from '../../../model/file.model';
import { HoSo } from '../../../model/ho-so.model';
import { BaseCondition, ReturnResult } from '../../../common';
import { QuanLyHoSoService } from '../quan-ly-ho-so.service';

@Injectable({
  providedIn: 'root'
})
export class FilePopupService {
  private ngbModalRef: NgbModalRef;
  public lstFile : FileUpload[] = new Array<FileUpload>();
  public result : ReturnResult<FileUpload> = new ReturnResult<FileUpload>();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private service: QuanLyHoSoService
  ) { this.ngbModalRef = null; }

  public open(component: Component, id?: number | any): Promise<NgbModalRef> {
    return new Promise<NgbModalRef>((resolve, reject) => {
        const isOpen = this.ngbModalRef !== null;
        if (isOpen) {
            resolve(this.ngbModalRef);
        }
          // lấy thông tin danh sách file của hồ sơ
          var condition: BaseCondition<HoSo> = new BaseCondition<HoSo>();
          var hoso = new HoSo();
          hoso.profileId = id;
          condition.Item = hoso;
          condition.PageIndex = 1;
          condition.PageSize = 5;
          this.service.GetListFilesByProfileId(condition)
            .subscribe((result) => {
            //  this.lstFile = result.itemList;
              this.result = result;
            }, (error) => {

            }, () => {
              this.ngbModalRef = this.fileModalRef(component, new FileUpload());
              resolve(this.ngbModalRef);
            })
    });
  }

  public fileModalRef(component: Component, files: FileUpload): NgbModalRef {
      const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static', windowClass:'animated slideInUp'});
      return modalRef;
  }
}
