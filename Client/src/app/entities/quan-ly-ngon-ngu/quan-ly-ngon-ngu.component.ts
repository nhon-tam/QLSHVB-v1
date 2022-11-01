import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCondition } from '../../common';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NgonNgu } from '../../model/ngon-ngu';
import { QuanLyNgonNguPopupService } from './quan-ly-ngon-ngu-popup.service';
import { NgonNguDialogComponent } from './ngon-ngu-dialog/ngon-ngu-dialog.component';
import { NgonNguDeleteComponent } from './ngon-ngu-delete/ngon-ngu-delete.component';
import {NgonNguService} from './ngon-ngu.service';
@Component({
  selector: 'app-quan-ly-ngon-ngu',
  templateUrl: './quan-ly-ngon-ngu.component.html',
  styleUrls: ['./quan-ly-ngon-ngu.component.css']
})
export class QuanLyNgonNguComponent implements OnInit {
  page = 1;
  condition: BaseCondition<NgonNgu> = new BaseCondition<NgonNgu>();
  pageSize: number;
  totalRecords: number;
  ngonNgus: NgonNgu[];
  options: Options;
  ngonNgu: NgonNgu;
  searchText: string = "";

  constructor(private quanLyNgonNguPopupService: QuanLyNgonNguPopupService,
              private NgonNguService : NgonNguService,
              private toastService: ToastrService
  ) { 
    this.NgonNguService.listen().subscribe((m: any) =>{
      this.loadAll();
    })
    this.searchText = "";
    this.condition = new BaseCondition<NgonNgu>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.ngonNgu = new NgonNgu();
  }

  ngOnInit() {
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.quanLyNgonNguPopupService
        .open(NgonNguDialogComponent as Component, id);

    } else {
      this.quanLyNgonNguPopupService
        .open(NgonNguDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

    this.quanLyNgonNguPopupService
      .open(NgonNguDeleteComponent as Component, id);
  }


  loadAll(){
    this.NgonNguService.NgonNguGetSearchWithPaging().subscribe((data : any) => {
      this.ngonNgus = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
    });
  }

  loadPages(page : string) {
    try {
      var condi : BaseCondition<NgonNgu> = new BaseCondition<NgonNgu>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.NgonNguService.NgonNguGetSearchWithPaging(condi).subscribe((data : any) => {
        this.ngonNgus = data.itemList;
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
        field: "nn.TenNgonNgu",
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
      this.NgonNguService.NgonNguGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.ngonNgus = data.itemList;
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
