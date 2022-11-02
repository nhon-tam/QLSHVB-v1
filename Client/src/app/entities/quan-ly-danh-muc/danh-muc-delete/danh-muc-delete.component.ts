import { Component, OnInit } from '@angular/core';
import { DanhMuc, danhmucs } from '../../../model/danh-muc.model';
import { QuanLyDanhMucPopupService } from '../quan-ly-danh-muc-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-danh-muc-delete',
  templateUrl: './danh-muc-delete.component.html',
  styleUrls: ['./danh-muc-delete.component.css']
})
export class DanhMucDeleteComponent implements OnInit {
  danhmuc: DanhMuc;
  constructor(
    private danhMucPopupService: QuanLyDanhMucPopupService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    if(this.danhMucPopupService.result.item != undefined){
      this.danhmuc = this.danhMucPopupService.result.item;
    }
  }
  deleteDanhMuc(id : number) {
    if (id && id != undefined) {
      for (let i = 0; i < danhmucs.length; i ++) {
        if (danhmucs[i].tabOfContID == id) {
          danhmucs.splice(i, 1);
          break;
        }
      }
      this.activeModal.dismiss('cancel');
    }
  }

}
