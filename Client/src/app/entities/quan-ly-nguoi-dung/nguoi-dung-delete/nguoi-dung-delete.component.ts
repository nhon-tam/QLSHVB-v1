import { Component, OnInit } from '@angular/core';
import { QuanLyNguoiDungPopupService } from '../quan-ly-nguoi-dung-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../model/user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-nguoi-dung-delete',
  templateUrl: './nguoi-dung-delete.component.html',
  styleUrls: ['./nguoi-dung-delete.component.css']
})
export class NguoiDungDeleteComponent implements OnInit {

  user: User;
  constructor(
    private nguoiDungPopupService: QuanLyNguoiDungPopupService,
    private userService: UserService,
    public activeModal: NgbActiveModal,
    private toasts: ToastrService
  ) {
    this.user = new User();
   }

  ngOnInit() {
    if(this.nguoiDungPopupService.result.item != undefined){
      this.user = this.nguoiDungPopupService.result.item;
    }
  }
  deleteHopSo(id : any) {
    this.userService.deleteUser(id)
      .subscribe((result) => {
          
        if(result.isSuccess){
          this.toasts.success("Xóa thành công!!!");
          this.clear();
          this.onClose();
        }
        else  
          this.onDeleteError('Xóa thất bại, người dùng đang được áp dụng!!!');
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
    this.userService.filter('Register click');
  }

  
  onDeleteError(message){
    this.toasts.error(message);
  }

  onDeleteSuccess(message){
    this.toasts.info(message)
  }

}

