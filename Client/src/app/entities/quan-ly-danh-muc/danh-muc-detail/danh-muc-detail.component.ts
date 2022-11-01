import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../../model/danh-muc.model';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { Subscription } from 'rxjs';
import { QuanLyDanhMucService } from '../quan-ly-danh-muc.service';
import { ActivatedRoute } from '@angular/router';
import { BaseCondition } from '../../../common';
import {QuanLyHopSoService} from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { HttpResponse } from '@angular/common/http';
import { QuanLyHopSoPopupService } from '../../quan-ly-hop-so/quan-ly-hop-so-popup.service';
import { HopSoDialogComponent } from '../../quan-ly-hop-so/hop-so-dialog/hop-so-dialog.component';
import { HopSoDeleteComponent } from '../../quan-ly-hop-so/hop-so-delete/hop-so-delete.component';

@Component({
  selector: 'app-danh-muc-detail',
  templateUrl: './danh-muc-detail.component.html',
  styleUrls: ['./danh-muc-detail.component.css']
})
export class DanhMucDetailComponent implements OnInit {
  danhMucID: number = 0;
  danhmuc: DanhMuc;
  danhmucs: DanhMuc[];
  hopsos: HopSo[];
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  isEdit = false;
  value1 = 'Default';
  defaultValue : string;
  data: any;
  condition: BaseCondition<HopSo>;

  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyDanhMucService: QuanLyDanhMucService,
    private route: ActivatedRoute,
    private quanLyHopSoService: QuanLyHopSoService,
    private hopSoPopupService: QuanLyHopSoPopupService,
  ) { 
    this.condition = new BaseCondition<HopSo>();
    this.quanLyHopSoService.listen().subscribe(( m : any) => {
      this.load(this.danhmuc.tabOfContID);
    })
  }

  ngOnInit() {
    this.route.snapshot.paramMap.get('id');
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
  }
  load(id){
    var params = id;
    this.quanLyDanhMucService.getDanhMucById(id)
      .subscribe((result) => {
        this.danhmuc = result.item;
      });
    if(params != undefined){
      this.getHopSoByDanhMucID(params);
    }
    
  }

  loadPages(page : string) {
    try{
      var condi : BaseCondition<DanhMuc> = new BaseCondition<DanhMuc>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.quanLyDanhMucService.getListHopSoByDanhMucId(condi).subscribe((data : any) => {
        this.hopsos = data.itemList;
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
  getHopSoByDanhMucID(params : any){
    var condition : BaseCondition<HopSo> = new BaseCondition<HopSo>();
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "sh.MucLucHoSoID",
        op: "",
        value: ""
      }
    ]
    this.danhMucID = parseInt(params);
    if (this.danhMucID != undefined) {
      this.condition.FilterRuleList[0].value = this.danhMucID.toString();
        this.condition.FilterRuleList[0].op = "and_contains";
    }
    this.quanLyDanhMucService.getListHopSoByDanhMucId(this.condition)
      .subscribe((res: any) => {
        this.hopsos = res.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = res.totalRows;
      })
  }

  openDialog(id?: number) {

    if (id) {
      this.hopSoPopupService
        .open(HopSoDialogComponent as Component, id);

    } else {
      this.hopSoPopupService
        .open(HopSoDialogComponent as Component);
    }

  }

  openDialogToAddHopSo(tableOfContID?: number) {
    if (tableOfContID != undefined && tableOfContID != null) {
      this.hopSoPopupService
        .open(HopSoDialogComponent as Component, 0, tableOfContID);

    } else {
      this.hopSoPopupService
        .open(HopSoDialogComponent as Component, 0);
    }

  }

  openDeleteDialog(id?: number) {
    if (id != undefined) {
      this.hopSoPopupService
      .open(HopSoDeleteComponent as Component, id);
        
    } else {
      this.hopSoPopupService
      .open(HopSoDeleteComponent as Component);
    }
  }
  ngOnDestroy(): void {
    // if(this.subscription){
    //   this.subscription.unsubscribe();
    // }
  }
}
