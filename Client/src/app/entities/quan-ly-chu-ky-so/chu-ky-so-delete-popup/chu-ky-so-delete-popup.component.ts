import { Component, OnInit } from '@angular/core';
import { DigitalSignature } from '../../../model/digital-signature.model';
import { ChuKySoPopupService } from '../chu-ky-so-popup-service.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyChuKySoService } from '../quan-ly-chu-ky-so.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-chu-ky-so-delete-popup',
  templateUrl: './chu-ky-so-delete-popup.component.html',
  styleUrls: ['./chu-ky-so-delete-popup.component.css']
})
export class ChuKySoDeletePopupComponent implements OnInit {

  signature: DigitalSignature;
  constructor(private popupService: ChuKySoPopupService,
      public activeModal: NgbActiveModal,
      private service: QuanLyChuKySoService,
      private toast: ToastrService
      ) { }

  ngOnInit(): void {
    this.signature = this.popupService.result.item;
  }

  deleteSignature(id : any, name?: string) {
    this.service.signatureDelete(id, name)
      .subscribe((result) => {
        if (result.isSuccess) {
          this.onClose();
          this.activeModal.dismiss('successfully');
          this.toast.info("Xóa thành công", "Thông báo");
        }
        else {
          this.toast.warning(result.errorMessage, "Thông báo");
        }
      }, (error) => {
        this.toast.error("Xóa thất bại", "Thông báo");
      }, () => {

      })
  }
  onClose() {
    this.service.filter('Register click');
  }

}
