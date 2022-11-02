import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyNhomNguoiDungPopupService } from '../quan-ly-nhom-nguoi-dung-popup.service';
import { UserGroupService } from '../../quan-ly-nhom-nguoi-dung/user-group.service';
import { ToastrService } from 'ngx-toastr';
import { UserGroup } from '../../../model/user-group.model';

@Component({
  selector: 'app-nhom-nguoi-dung-delete',
  templateUrl: './nhom-nguoi-dung-delete.component.html',
  styleUrls: ['./nhom-nguoi-dung-delete.component.css']
})
export class NhomNguoiDungDeleteComponent implements OnInit {
  userGroup: UserGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private nhomNDPopupService: QuanLyNhomNguoiDungPopupService,
    private nhomNguoiDungService: UserGroupService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
    this.userGroup = new UserGroup();
    if(this.nhomNDPopupService.result !=null){
      if(this.nhomNDPopupService.result.item != undefined){
        this.userGroup= this.nhomNDPopupService.result.item;
      }
    }
  }

  deleteUserGroup(id : any) {
    this.nhomNguoiDungService.deleteUserGroup(id)
      .subscribe((result) => {
        if(result.isSuccess)
          this.onDeleteSuccess('Xóa thành công!!!');
        else  
          this.onDeleteError('Xóa thất bại, nhóm quyền đang được áp dụng cho tài khoản!!!');
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
      });
      this.onClose();
      
  }

  onClose(){
    this.nhomNguoiDungService.filter('Register click');
    this.activeModal.close();
  }

  
  onDeleteError(message){
    this.toasts.success(message);
  }

  onDeleteSuccess(message){
    this.toasts.success(message)
  }

}
