import { Component, OnInit } from '@angular/core';
import { HoSo } from '../../../model/ho-so.model';
import { QuanLyHoSoPopupService } from '../quan-ly-ho-so-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ho-so-delete',
  templateUrl: './ho-so-delete.component.html',
  styleUrls: ['./ho-so-delete.component.css']
})
export class HoSoDeleteComponent implements OnInit {
  hoso: HoSo;
  constructor(
    private hoSoPopupService: QuanLyHoSoPopupService,
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(
  ) {
  //  this.hoso = this.hoSoPopupService.getHoSoById();
  }
  deleteHoSo(id : number) {
    
      this.activeModal.dismiss('cancel');
    }

}
