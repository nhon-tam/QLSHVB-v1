import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrganType } from '../../../model/organ-type.model';
import { LoaiHoSoService } from '../loai-ho-so.service';
import { QuanLyLoaiHoSoPopupService } from '../quan-ly-loai-ho-so-popup.service';
import { LoaiHoSo } from '../../../model/loai-ho-so';

@Component({
  selector: 'app-loai-ho-so-delete',
  templateUrl: './loai-ho-so-delete.component.html',
  styleUrls: ['./loai-ho-so-delete.component.css']
})
export class LoaiHoSoDeleteComponent implements OnInit {
  loaiHoSo: LoaiHoSo;
  constructor(
    public activeModal: NgbActiveModal,
    private popupService: QuanLyLoaiHoSoPopupService,
    private service: LoaiHoSoService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
    this.loaiHoSo = new LoaiHoSo();
    if(this.popupService.result !=null){
      if(this.popupService.result.item != undefined){
        this.loaiHoSo= this.popupService.result.item;
      }
    }
  }

  deleteLoaiHoSo(id : any) {
    this.service.deleteLoaiHoSo(id)
      .subscribe((result) => {
        if(result.isSuccess) {
          this.onClose();
          this.onDeleteSuccess('Xóa thành công!!!');
        }
        else {
          this.onDeleteError('Xóa thất bại, loại hồ sơ đang được áp dụng!!!');
        }
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
        
      });
      
  }

  onClose(){
    this.service.filter('Register click');
    this.activeModal.close();
  }

  
  onDeleteError(message){
    this.toasts.info(message);
  }

  onDeleteSuccess(message){
    this.toasts.info(message)
  }

}
