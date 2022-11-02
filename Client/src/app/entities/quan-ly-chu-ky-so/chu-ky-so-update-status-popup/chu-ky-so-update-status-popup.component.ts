import { Component, OnInit } from '@angular/core';
import { DigitalSignature } from '../../../model/digital-signature.model';
import { ChuKySoPopupService } from '../chu-ky-so-popup-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyChuKySoService } from '../quan-ly-chu-ky-so.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chu-ky-so-update-status-popup',
  templateUrl: './chu-ky-so-update-status-popup.component.html',
  styles: []
})
export class ChuKySoUpdateStatusPopupComponent implements OnInit {
  signature: DigitalSignature;
  constructor(private popupService: ChuKySoPopupService,
      public activeModal: NgbActiveModal,
      private service: QuanLyChuKySoService,
      private toast: ToastrService
      ) { }

  ngOnInit(): void {
    this.signature = this.popupService.result.item;
  }

  updateStatus(id : any, status?: any) {
    this.service.signatureUpdateStatus(id)
      .subscribe((result) => {
        if (result.isSuccess) {
          this.onClose();
          this.activeModal.dismiss('successfully');
          this.toast.info("Cập nhật thành công", "Thông báo");
        }
        else {
          this.toast.error("Cập nhật thất bại", "Thông báo");
        }
      }, (error) => {
        this.toast.error("Cập nhật thất bại", "Thông báo");
      }, () => {

      })
  }

  onClose() {
    this.service.filter('Register click');
  }

}
