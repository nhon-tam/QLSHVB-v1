import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrganType } from '../../../model/organ-type.model';
import { MucDoTinCay } from '../../../model/muc-do-tin-cay';
import { MucDoTinCayService } from '../muc-do-tin-cay.service';
import { QuanLyMucDoTinCayPopupService } from '../muc-do-tin-cay-popup.service';

@Component({
  selector: 'app-muc-do-tin-cay-delete',
  templateUrl: './muc-do-tin-cay-delete.component.html',
  styleUrls: ['./muc-do-tin-cay-delete.component.css']
})
export class MucDoTinCayDeleteComponent implements OnInit {
  mucDoTinCay: MucDoTinCay;
  constructor(
    public activeModal: NgbActiveModal,
    private popupService: QuanLyMucDoTinCayPopupService,
    private service: MucDoTinCayService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
    this.mucDoTinCay = new MucDoTinCay();
    if(this.popupService.result !=null){
      if(this.popupService.result.item != undefined){
        this.mucDoTinCay= this.popupService.result.item;
      }
    }
  }

  deleteMucDoTinCay(id : any) {
    this.service.deleteMucDoTinCay(id)
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
