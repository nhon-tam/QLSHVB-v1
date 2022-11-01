import { Component, OnInit } from '@angular/core';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { QuanLyHopSoPopupService } from '../quan-ly-hop-so-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyHopSoService } from '../quan-ly-hop-so.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hop-so-delete',
  templateUrl: './hop-so-delete.component.html',
  styleUrls: ['./hop-so-delete.component.css']
})
export class HopSoDeleteComponent implements OnInit {

  hopso: HopSo;
  constructor(
    private hopSoPopupService: QuanLyHopSoPopupService,
    public activeModal: NgbActiveModal,
    private hopSoService: QuanLyHopSoService,
    private toasts: ToastrService
  ) {
    this.hopso = new HopSo();
   }

  ngOnInit() {
    if(this.hopSoPopupService.result.item != undefined){
      this.hopso = this.hopSoPopupService.result.item;
    }
  }
  deleteHopSo(id : any) {
    this.hopSoService.deleteHopSo(id)
      .subscribe((result) => {
          
        if(result.isSuccess){
          this.toasts.success("Xóa thành công!!!");
          this.clear();
          this.onClose();
        }
        else  
          this.onDeleteError('Xóa thất bại, hộp số đang được áp dụng!!!');
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
    this.hopSoService.filter('Register click');
  }

  
  onDeleteError(message){
    this.toasts.error(message);
  }

  onDeleteSuccess(message){
    this.toasts.info(message)
  }

}
