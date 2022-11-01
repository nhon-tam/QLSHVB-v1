import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCondition } from '../../common';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import {MucDoTinCayService} from './muc-do-tin-cay.service';
import { MucDoTinCay } from '../../model/muc-do-tin-cay';
import { QuanLyMucDoTinCayPopupService } from './muc-do-tin-cay-popup.service';
import { MucDoTinCayDialogComponent } from './muc-do-tin-cay-dialog/muc-do-tin-cay-dialog.component';
import { MucDoTinCayDeleteComponent } from './muc-do-tin-cay-delete/muc-do-tin-cay-delete.component';
@Component({
  selector: 'app-muc-do-tin-cay',
  templateUrl: './muc-do-tin-cay.component.html',
  styleUrls: ['./muc-do-tin-cay.component.css']
})
export class QuanLyMucDoTinCayComponent implements OnInit {
  page = 1;
  condition: BaseCondition<MucDoTinCay> = new BaseCondition<MucDoTinCay>();
  pageSize: number;
  totalRecords: number;
  mucDoTinCays: MucDoTinCay[];
  options: Options;
  mucDoTinCay: MucDoTinCay;
  searchText: string = "";

  constructor(private quanLyMucDoTinCayPopupService: QuanLyMucDoTinCayPopupService,
              private MucDoTinCayService : MucDoTinCayService,
              private toastService: ToastrService
  ) { 
    this.MucDoTinCayService.listen().subscribe((m: any) =>{
      this.loadPages(this.page.toString());
    })
    this.searchText = "";
    this.condition = new BaseCondition<MucDoTinCay>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.mucDoTinCay = new MucDoTinCay();
  }

  ngOnInit() {
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.quanLyMucDoTinCayPopupService
        .open(MucDoTinCayDialogComponent as Component, id);

    } else {
      this.quanLyMucDoTinCayPopupService
        .open(MucDoTinCayDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

    this.quanLyMucDoTinCayPopupService
      .open(MucDoTinCayDeleteComponent as Component, id);
  }


  loadAll(){
    this.MucDoTinCayService.MucDoTinCayGetSearchWithPaging().subscribe((data : any) => {
      this.mucDoTinCays = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
    });
  }

  loadPages(page : string) {
    try {
      var condi : BaseCondition<MucDoTinCay> = new BaseCondition<MucDoTinCay>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.MucDoTinCayService.MucDoTinCayGetSearchWithPaging(condi).subscribe((data : any) => {
        this.mucDoTinCays = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows
      }, (error) => {
      }, () => {

      });
    }
    catch (e) {
      alert(JSON.stringify(e))
    }
  }


  getUserById(userID: number) {
    
  }

  onChange(searchText: string){
    this.searchText = searchText;
    this.getFilterOptions();
  }

  getFilterOptions () {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "mdtc.LoaiMucDoTinCay",
        op: "",
        value: ""
      }
    ]
    if (this.searchText != "") {
      var length = this.condition.FilterRuleList.length;
      this.condition.FilterRuleList[0].value = this.searchText;
      this.condition.FilterRuleList[0].op = "and_contains";
    }

    if (this.searchText == "") {
      var length = this.condition.FilterRuleList.length;
      this.condition.FilterRuleList[0].value = this.searchText;
      this.condition.FilterRuleList[0].op = "";
    }
    if (this.searchText !=undefined) {
      this.MucDoTinCayService.MucDoTinCayGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.mucDoTinCays = data.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = data.totalRows;
      }, (error) => {
      }, () => {
        
      })
    }
  }
  ngOnDestroy(): void {
      this.loadAll();
  }
}
