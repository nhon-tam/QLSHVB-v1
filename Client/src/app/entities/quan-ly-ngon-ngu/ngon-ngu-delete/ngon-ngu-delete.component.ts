import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrganType } from '../../../model/organ-type.model';
import { NgonNgu } from '../../../model/ngon-ngu';
import { QuanLyNgonNguPopupService } from '../quan-ly-ngon-ngu-popup.service';
import { NgonNguService } from '../ngon-ngu.service';

@Component({
  selector: 'app-ngon-ngu-delete',
  templateUrl: './ngon-ngu-delete.component.html',
  styleUrls: ['./ngon-ngu-delete.component.css']
})
export class NgonNguDeleteComponent implements OnInit {
  ngonNgu: NgonNgu;
  constructor(
    public activeModal: NgbActiveModal,
    private popupService: QuanLyNgonNguPopupService,
    private service: NgonNguService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
    this.ngonNgu = new NgonNgu();
    if(this.popupService.result !=null){
      if(this.popupService.result.item != undefined){
        this.ngonNgu= this.popupService.result.item;
      }
    }
  }

  deleteNgonNgu(id : any) {
    this.service.deleteNgonNgu(id)
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
