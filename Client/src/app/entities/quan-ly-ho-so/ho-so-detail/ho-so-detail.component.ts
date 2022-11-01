import { Component, OnInit } from '@angular/core';
 import { Document } from '../../../model/document.model';
import { HoSo } from '../../../model/ho-so.model';
import { Subscription } from 'rxjs';
import { QuanLyHoSoService } from '../quan-ly-ho-so.service';
import { ActivatedRoute } from '@angular/router';
import { FilePopupService } from '../file-details/file-popup-service.service';
import { FileDetailsComponent } from '../file-details/file-details.component';
import { BaseCondition } from '../../../common';
import { TaiLieuDialogComponent } from '../../quan-ly-tai-lieu/tai-lieu-dialog/tai-lieu-dialog.component';
import { QuanLyTaiLieuPopupService } from '../../quan-ly-tai-lieu/quan-ly-tai-lieu-popup.service';

@Component({
  selector: 'app-ho-so-detail',
  templateUrl: './ho-so-detail.component.html',
  styleUrls: ['./ho-so-detail.component.css']
})
export class HoSoDetailComponent implements OnInit {
  hoso: HoSo;
  documents: Document[];
  page = 1;
  profileId: any;
  condition: BaseCondition<HoSo> = new BaseCondition<HoSo>();
  totalRecords: number = 0;
  pageSize: number = 5;
  lstDocuments: Document[] = new Array<Document>();

  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private service: QuanLyHoSoService,
    private route: ActivatedRoute,
    private dialog: FilePopupService,
    private taiLieuPopupService: QuanLyTaiLieuPopupService
  ) { }

  ngOnInit() {
    this.hoso = new HoSo();
    this.subscription = this.route.params.subscribe((params) => {
      let id = params['id'];
      this.profileId = id;
      this.getProfileById(id);
      this.getDocumentsByProfileId(id);
    });
  }
  load(id){
  //  this.hoso= this.quanLyHoSoService.getHoSoById(id);
  //  this.vanbans= this.quanLyHoSoService.getListVanBanByHoSoId(id);
  }


  openDialog(id?: number) {
      this.taiLieuPopupService
        .open(TaiLieuDialogComponent as Component, id);
  }

  getProfileById (id: any) {
    this.service.getProfilesById(id)
      .subscribe((result) => {
        this.hoso = result.item;
        this.profileId = this.hoso.profileId;
      },
      (error) => {
        console.log(error);
      },
      () => {

      });
  }

  loadPages(page : number) {
    var hoso: HoSo = new HoSo();
    hoso.profileId = this.profileId;
    this.condition.PageIndex = page;
    this.condition.PageSize = 5;
    this.condition.Item = hoso;
    this.service.getDocumentsByProfileId(this.condition)
      .subscribe((result) => {
        this.lstDocuments = result.itemList;
        this.totalRecords = result.totalRows;
        this.page = page;
      },
      (error) => {
        console.log(error);
      }, () => {

      });
  }

  getDocumentsByProfileId (id: any) {
    var hoso: HoSo = new HoSo();
    hoso.profileId = id;
    this.condition.PageIndex = 1;
    this.condition.PageSize = 5;
    this.condition.Item = hoso;
    this.service.getDocumentsByProfileId(this.condition)
      .subscribe((result) => {
        this.lstDocuments = result.itemList;
        this.totalRecords = result.totalRows;
      },
      (error) => {
        console.log(error);
      }, () => {

      });
  }

  openFileDetailDialog(id? : any) {
      this.dialog.open(FileDetailsComponent as Component,  id);
  }

}
