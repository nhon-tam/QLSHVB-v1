import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrganType } from '../../../model/organ-type.model';
import { QuanLyOrganTypePopupService } from '../quan-ly-loai-co-quan-popup.service';
import { OrganTypeService } from '../loai-co-quan.service';

@Component({
  selector: 'app-loai-co-quan-delete',
  templateUrl: './loai-co-quan-delete.component.html',
  styleUrls: ['./loai-co-quan-delete.component.css']
})
export class OrganTypeDeleteComponent implements OnInit {
  organType: OrganType;
  constructor(
    public activeModal: NgbActiveModal,
    private organTypePopupService: QuanLyOrganTypePopupService,
    private organTypeService: OrganTypeService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
    this.organType = new OrganType();
    if(this.organTypePopupService.result !=null){
      if(this.organTypePopupService.result.item != undefined){
        this.organType= this.organTypePopupService.result.item;
      }
    }
  }

  deleteOrganType(id : any) {
    this.organTypeService.deleteOrganType(id)
      .subscribe((result) => {
        if(result.isSuccess){
          this.toasts.success("Xóa thành công!!!");
          this.clear();
          this.onClose();
        }
        else  
          this.onDeleteError('Xóa thất bại, loại cơ quan đang được áp dụng!!!');
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
      });
  }

  
  clear() {
    this.activeModal.dismiss('cancel');
  }

  onClose(){
    this.organTypeService.filter('Register click');
  }

  
  onDeleteError(message){
    this.toasts.error(message);
  }

  onDeleteSuccess(message){
    this.toasts.info(message)
  }

}
