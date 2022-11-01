import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCondition } from '../../common';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { LoaiVanBan } from '../../model/loai-van-ban';
import { LoaiVanBanService } from './loai-van-ban.service';
import { QuanLyLoaiVanBanPopupService } from './quan-ly-loai-van-ban-popup.service';
import { LoaiVanBanDialogComponent } from './loai-van-ban-dialog/loai-van-ban-dialog.component';
import { LoaiVanBanDeleteComponent } from './loai-van-ban-delete/loai-van-ban-delete.component';

@Component({
  selector: 'app-quan-ly-loai-van-ban',
  templateUrl: './quan-ly-loai-van-ban.component.html',
  styleUrls: ['./quan-ly-loai-van-ban.component.css']
})
export class QuanLyLoaiVanBanComponent implements OnInit {
  page = 1;
  condition: BaseCondition<LoaiVanBan> = new BaseCondition<LoaiVanBan>();
  pageSize: number;
  totalRecords: number;
  loaiVanBans: LoaiVanBan[];
  options: Options;
  loaiVanBan: LoaiVanBan;
  searchText: string = "";

  constructor(private quanLyLoaiVanBanPopupService: QuanLyLoaiVanBanPopupService,
              private loaiVanBanService : LoaiVanBanService,
              private toastService: ToastrService
  ) { 
    this.loaiVanBanService.listen().subscribe((m: any) =>{
      this.loadAll();
    })
    this.searchText = "";
    this.condition = new BaseCondition<LoaiVanBan>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.loaiVanBan = new LoaiVanBan();
  }

  ngOnInit() {
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.quanLyLoaiVanBanPopupService
        .open(LoaiVanBanDialogComponent as Component, id);

    } else {
      this.quanLyLoaiVanBanPopupService
        .open(LoaiVanBanDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

    this.quanLyLoaiVanBanPopupService
      .open(LoaiVanBanDeleteComponent as Component, id);
  }


  loadAll(){
    this.loaiVanBanService.loaiVanBanGetSearchWithPaging().subscribe((data : any) => {
      this.loaiVanBans = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
    });
  }

  loadPages(page : string) {
    try {
      var condi : BaseCondition<LoaiVanBan> = new BaseCondition<LoaiVanBan>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.loaiVanBanService.loaiVanBanGetSearchWithPaging(condi).subscribe((data : any) => {
        this.loaiVanBans = data.itemList;
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
        field: "lvb.TenLoaiVanBan",
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
      this.loaiVanBanService.loaiVanBanGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.loaiVanBans = data.itemList;
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
