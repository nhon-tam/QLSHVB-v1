import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCondition } from '../../common';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { TinhTrangVatLy } from '../../model/tinh-trang-vat-ly';
import {TinhTrangVatLyService} from './tt-vat-ly.service';
import { TinhTrangVatLyDialogComponent } from './tt-vat-ly-dialog/tt-vat-ly-dialog.component';
import { TinhTrangVatLyDeleteComponent } from './tt-vat-ly-delete/tt-vat-ly-delete.component';
import { QuanLyTinhTrangVatLyPopupService } from './quan-ly-tt-vat-ly-popup.service';
@Component({
  selector: 'app-quan-ly-tt-vat-ly',
  templateUrl: './quan-ly-tt-vat-ly.component.html',
  styleUrls: ['./quan-ly-tt-vat-ly.component.css']
})
export class QuanLyTinhTrangVatLyComponent implements OnInit {
  page = 1;
  condition: BaseCondition<TinhTrangVatLy> = new BaseCondition<TinhTrangVatLy>();
  pageSize: number;
  totalRecords: number;
  tinhTrangVatLys: TinhTrangVatLy[];
  options: Options;
  tinhTrangVatLy: TinhTrangVatLy;
  searchText: string = "";

  constructor(private quanLyTinhTrangVatLyPopupService: QuanLyTinhTrangVatLyPopupService,
              private TinhTrangVatLyService : TinhTrangVatLyService,
              private toastService: ToastrService
  ) { 
    this.TinhTrangVatLyService.listen().subscribe((m: any) =>{
      this.loadAll();
    })
    this.searchText = "";
    this.condition = new BaseCondition<TinhTrangVatLy>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.tinhTrangVatLy = new TinhTrangVatLy();
  }

  ngOnInit() {
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.quanLyTinhTrangVatLyPopupService
        .open(TinhTrangVatLyDialogComponent as Component, id);

    } else {
      this.quanLyTinhTrangVatLyPopupService
        .open(TinhTrangVatLyDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

    this.quanLyTinhTrangVatLyPopupService
      .open(TinhTrangVatLyDeleteComponent as Component, id);
  }


  loadAll(){
    this.TinhTrangVatLyService.TinhTrangVatLyGetSearchWithPaging().subscribe((data : any) => {
      this.tinhTrangVatLys = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
      console.log('Lấy dữ liệu thành công.');
    });
  }

  loadPages(page : string) {
    try {
      var condi : BaseCondition<TinhTrangVatLy> = new BaseCondition<TinhTrangVatLy>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.TinhTrangVatLyService.TinhTrangVatLyGetSearchWithPaging(condi).subscribe((data : any) => {
        this.tinhTrangVatLys = data.itemList;
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
        field: "tt.TinhTrang",
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
      this.TinhTrangVatLyService.TinhTrangVatLyGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.tinhTrangVatLys = data.itemList;
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
