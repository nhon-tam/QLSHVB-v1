import { Component, OnInit } from '@angular/core';
import { Phong } from '../../../model/phong.model';
import { Subscription } from 'rxjs';
import { QuanLyPhongService } from '../quan-ly-phong.service';
import { ActivatedRoute } from '@angular/router';
import { DanhMuc, danhmucs } from '../../../model/danh-muc.model';
import { BaseCondition } from '../../../common/BaseCondition';
import { HttpResponse } from '@angular/common/http';
import { stringify } from 'querystring'; 
import { QuanLyDanhMucPopupService } from '../../quan-ly-danh-muc/quan-ly-danh-muc-popup.service';
import { DanhMucDialogComponent } from '../../quan-ly-danh-muc/danh-muc-dialog/danh-muc-dialog.component';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';


@Component({
  selector: 'app-phong-detail',
  templateUrl: './phong-detail.component.html',
  styleUrls: ['./phong-detail.component.css']
})
export class PhongDetailComponent implements OnInit {
  phong: Phong;
  danhmucs: DanhMuc[];
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  fontID: number = 0;
  isEdit = false;
  value1 = 'Default';
  defaultValue : string;
  data: any;
  condition: BaseCondition<DanhMuc>;

  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyPhongService: QuanLyPhongService, 
    private danhMucPopupService: QuanLyDanhMucPopupService,
    private danhMucService: QuanLyDanhMucService,
    private route: ActivatedRoute
  ) { 
    this.condition = new BaseCondition<DanhMuc>();
    this.danhMucService.listen().subscribe(( m : any) => {
      this.load(this.phong.fontID);
    })
  }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    var params = id;
    (this.quanLyPhongService.getPhongById(params))
      .subscribe((result) => {
        this.phong = result.item;
      });
    if(params != undefined){
      this.getDanhMucByFontID(params);
    }
  }

  getDanhMucByFontID(params : any){
    var condition : BaseCondition<DanhMuc> = new BaseCondition<DanhMuc>();
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "sp.PhongID",
        op: "",
        value: ""
      }
    ]
    this.fontID = parseInt(params);
    if (this.fontID != undefined) {
      this.condition.FilterRuleList[0].value = this.fontID.toString();
        this.condition.FilterRuleList[0].op = "and_contains";
    }
    this.quanLyPhongService.getListDanhMucByPhongId(this.condition)
      .subscribe((res: any) => {
        this.danhmucs = res.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = res.totalRows;
      })
  }
  
  loadPages(page : string) {
    try{
      var condi : BaseCondition<DanhMuc> = new BaseCondition<DanhMuc>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.quanLyPhongService.getListDanhMucByPhongId(condi).subscribe((data : any) => {
        this.danhmucs = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows;
      }, (error) => {
        this.pageSize = 5;
      }, () => {
      });
    }catch (e) {
      alert(JSON.stringify(e))
    }
  }

  openDialog(id?: number) {

    if (id) {
      this.danhMucPopupService
        .open(DanhMucDialogComponent as Component, id);

    } else {
      this.danhMucPopupService
        .open(DanhMucDialogComponent as Component);
    }

  }

  openDialogToAddDanhMuc(fontId?: number) {

    if (fontId != undefined && fontId != null) {
      this.danhMucPopupService
        .open(DanhMucDialogComponent as Component, 0, fontId);

    } else {
      this.danhMucPopupService
        .open(DanhMucDialogComponent as Component,0);
    }

  }

  ngOnDestroy(): void {
    // if(this.subscription){
    //   this.subscription.unsubscribe();
    // }
  }
}
