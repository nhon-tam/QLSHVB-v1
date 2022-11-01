import { Component, OnInit } from '@angular/core';
import { Phong, phongs } from '../../../model/phong.model';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuanLyPhongService } from '../quan-ly-phong.service';


@Component({
  selector: 'app-phong-delete',
  templateUrl: './phong-delete.component.html',
  styleUrls: ['./phong-delete.component.css']
})
export class PhongDeleteComponent implements OnInit {
  phong: Phong;
  constructor(
    public activeModal: NgbActiveModal,
    private phongPopupService: QuanLyPhongPopupService,
    private phongService: QuanLyPhongService,
    private toasts: ToastrService
  ) { this.phong = new Phong() }

  ngOnInit() {
    if(this.phongPopupService.result.item != undefined){
      this.phong = this.phongPopupService.result.item;
    }
  }
  deleteFont(id : number) {
    this.phongService.deletePhong(id)
      .subscribe((result) => {
        if(result.isSuccess){
          this.toasts.success("Xóa thành công!!!");
          this.clear();
          this.onClose();
        }
        else  
          this.onDeleteError('Xóa thất bại, phông đang được áp dụng!!!');
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
      });
      this.onClose();
  }
  clear() {
    this.activeModal.dismiss('cancel');
  }

  onClose(){
    this.phongService.filter('Register click');
  }

  
  onDeleteError(message){
    this.toasts.error(message);
  }

  onDeleteSuccess(message){
    this.toasts.info(message)
  }
}
