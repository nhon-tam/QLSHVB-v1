import { Component, OnInit } from '@angular/core';
import { Document } from '../../../model/document.model';
import { QuanLyTaiLieuPopupService } from '../quan-ly-tai-lieu-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyTaiLieuService } from '../quan-ly-tai-lieu.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tai-lieu-delete',
  templateUrl: './tai-lieu-delete.component.html',
  styleUrls: ['./tai-lieu-delete.component.css']
})
export class TaiLieuDeleteComponent implements OnInit {
  document: Document;
  constructor(
    private taiLieuPopupService: QuanLyTaiLieuPopupService,
    private activeModal: NgbActiveModal,
    private documentService: QuanLyTaiLieuService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
    this.document = this.taiLieuPopupService.result.item;
  }
  deleteTaiLieu(id : number) {
    this.documentService.deleteDocument(id)
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
    this.toasts.success("delete document successfully")
  }

}
