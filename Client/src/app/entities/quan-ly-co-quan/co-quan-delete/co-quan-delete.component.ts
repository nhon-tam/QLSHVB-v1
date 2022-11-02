import { Component, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../../model/co-quan.model';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyCoQuanService } from '../quan-ly-co-quan-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-co-quan-delete',
  templateUrl: './co-quan-delete.component.html',
  styleUrls: ['./co-quan-delete.component.css']
})
export class CoQuanDeleteComponent implements OnInit {
  coQuan: CoQuan;
  constructor(
    public activeModal: NgbActiveModal,
    private coQuanPopupService: QuanLyCoQuanPopupService,
    private coQuanService: QuanLyCoQuanService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
 //   this.coQuan = this.coQuanPopupService.getCoQuanById();
      this.coQuan= this.coQuanPopupService.result.item;
  }
  deleteCoQuan(id : any) {
    this.coQuanService.deleteCoQuan(id)
      .subscribe((result) => {
        
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
        this.activeModal.dismiss("deleted");
        this.onDeleteSuccess();
      });
  }
  onDeleteSuccess(){
    this.toasts.success("delete success")
  }

}
