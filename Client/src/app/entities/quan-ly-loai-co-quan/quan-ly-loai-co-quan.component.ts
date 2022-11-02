import { Component, OnInit, ViewChild } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan/quan-ly-co-quan-popup.service';
import { OrganTypeService } from './loai-co-quan.service';
import { BaseCondition } from '../../common';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { OrganType } from '../../model/organ-type.model';
import { QuanLyOrganTypePopupService } from './quan-ly-loai-co-quan-popup.service';
import { OrganTypeDialogComponent } from './loai-co-quan-dialog/loai-co-quan-dialog.component';
import { OrganTypeDeleteComponent } from './loai-co-quan-delete/loai-co-quan-delete.component';

@Component({
  selector: 'app-quan-ly-loai-co-quan',
  templateUrl: './quan-ly-loai-co-quan.component.html',
  styleUrls: ['./quan-ly-loai-co-quan.component.css']
})
export class QuanLyOrganTypeComponent implements OnInit {
  page = 1;
  condition: BaseCondition<OrganType> = new BaseCondition<OrganType>();
  pageSize: number;
  totalRecords: number;
  organTypes: OrganType[];
  options: Options;
  organType: OrganType;
  searchText: string = "";


  constructor(private quanLyOrganTypePopupService: QuanLyOrganTypePopupService,
              private organTypeService : OrganTypeService,
              private toastService: ToastrService
  ) { 
    this.organTypeService.listen().subscribe((m: any) =>{
      this.loadAll();
    })
    this.searchText = "";
    this.condition = new BaseCondition<OrganType>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.organType = new OrganType();
  }

  ngOnInit() {
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.quanLyOrganTypePopupService
        .open(OrganTypeDialogComponent as Component, id);

    } else {
      this.quanLyOrganTypePopupService
        .open(OrganTypeDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

    this.quanLyOrganTypePopupService
      .open(OrganTypeDeleteComponent as Component, id);
  }


  loadAll(){
    this.organTypeService.organTypeGetSearchWithPaging().subscribe((data : any) => {
      this.organTypes = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
    });
  }

  loadPages(page : string) {
    try {
      var condi : BaseCondition<OrganType> = new BaseCondition<OrganType>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.organTypeService.organTypeGetSearchWithPaging(condi).subscribe((data : any) => {
        this.organTypes = data.itemList;
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
        field: "lcq.TenLoaiCoQuan",
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
      this.organTypeService.organTypeGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.organTypes = data.itemList;
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
