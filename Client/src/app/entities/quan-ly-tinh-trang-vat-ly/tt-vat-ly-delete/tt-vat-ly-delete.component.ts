import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrganType } from '../../../model/organ-type.model';
import { TinhTrangVatLy } from '../../../model/tinh-trang-vat-ly';
import { TinhTrangVatLyService } from '../tt-vat-ly.service';
import { QuanLyTinhTrangVatLyPopupService } from '../quan-ly-tt-vat-ly-popup.service';

@Component({
  selector: 'app-tt-vat-ly-delete',
  templateUrl: './tt-vat-ly-delete.component.html',
  styleUrls: ['./tt-vat-ly-delete.component.css']
})
export class TinhTrangVatLyDeleteComponent implements OnInit {
  tinhTrangVatLy: TinhTrangVatLy;
  constructor(
    public activeModal: NgbActiveModal,
    private popupService: QuanLyTinhTrangVatLyPopupService,
    private service: TinhTrangVatLyService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
    this.tinhTrangVatLy = new TinhTrangVatLy();
    if(this.popupService.result !=null){
      if(this.popupService.result.item != undefined){
        this.tinhTrangVatLy= this.popupService.result.item;
      }
    }
  }

  deleteTinhTrangVatLy(id : any) {
    this.service.deleteTinhTrangVatLy(id)
      .subscribe((result) => {
        if(result.isSuccess)
          this.onDeleteSuccess('Xóa thành công!!!');
        else  
          this.onDeleteError('Xóa thất bại, loại hồ sơ đang được áp dụng!!!');
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
      });
      this.onClose();
  }

  onClose(){
    this.service.filter('Register click');
    this.activeModal.close();
  }

  
  onDeleteError(message){
    this.toasts.success(message);
  }

  onDeleteSuccess(message){
    this.toasts.success(message)
  }

}
