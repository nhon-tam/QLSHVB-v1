import { Component, OnInit } from '@angular/core';
import { HopSo } from '../../model/hop-so.model';
import { hopsos } from '../../model/hop-so.model';
import { QuanLyHopSoPopupService } from './quan-ly-hop-so-popup.service';
import { HopSoDialogComponent } from './hop-so-dialog/hop-so-dialog.component';
import { HopSoDeleteComponent } from './hop-so-delete/hop-so-delete.component';
import {QuanLyHopSoService} from './quan-ly-hop-so.service';
import { HttpResponse } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { DanhMuc } from '../../model/danh-muc.model';
import {QuanLyDanhMucService} from '../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { StatusService } from '../../services/common-status-service';
import { Status } from '../../model/common-status';
@Component({
  selector: 'app-quan-ly-hop-so',
  templateUrl: './quan-ly-hop-so.component.html',
  styleUrls: ['./quan-ly-hop-so.component.css']
})
export class QuanLyHopSoComponent implements OnInit {
  searchText: string = "";
  danhmuc: DanhMuc;
  hopsos: HopSo[];
  statuss: Status[];
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  lstDanhMuc: Array<Select2OptionData>;
  options: Options;
  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 30;
  condition: BaseCondition<HopSo>;
  tableOfContArr: Array<Select2OptionData>;
  arrayTableOfContValue: string[];
  arrayStatusValue: string[];
  statusArr : Array<Select2OptionData>;


  constructor(
    private hopSoPopupService: QuanLyHopSoPopupService, 
    private danhMucService: QuanLyDanhMucService,
    private quanLyHopSoService: QuanLyHopSoService,
    private spinner: NgxSpinnerService,
    private statusService: StatusService
  ) { 
      this.searchText = "";
      this.condition = new BaseCondition<HopSo>();
      this.tableOfContArr = new Array<Select2OptionData>();
      this.statusArr = new Array<Select2OptionData>();
      this.options = {
        width: "100%",
        closeOnSelect: true,
        multiple: true,
        tags: true
      }
      this.danhmuc = new DanhMuc();
      this.quanLyHopSoService.listen().subscribe((m: any) =>{
        this.loadPages(this.page);
      })
    }

  ngOnInit() {
    this.loadFilterOptionsDanhMuc();
    this.loadAll();
    this.getAllStatus();
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
  openDeleteDialog(id?: number) {
      this.hopSoPopupService
        .open(HopSoDeleteComponent as Component, id);
  }
  loadPages(page : number) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    var condi : BaseCondition<HopSo> = new BaseCondition<HopSo>();
    condi.PageIndex = page;
    this.quanLyHopSoService.getAllHopSoWithPaging(condi).subscribe((data : any) => {
      this.hopsos = data.itemList;
      this.page = page;
      this.totalRecords = data.totalRows;
      },(error) => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          this.hideSpinner("paging");
        }, 5000);
    }, () => {
      this.hideSpinner("paging");
    });
  }

  loadAll(){
    this.showSpinner("dataTable", "timer", "0.8");
    this.quanLyHopSoService.getAllHopSoWithPaging().subscribe((data : any) => {
      this.hopsos = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
        this.hideSpinner("dataTable");
      }, 5000);
    }, () => {
      this.hideSpinner("dataTable");
    });
  }

  loadFilterOptionsDanhMuc () {
      // this.showSpinner("filterOptions","timer", "0.8");
      this.danhMucService.getAllDanhMuc()
      .subscribe((result) => {
      //  this.organFilterData = result;
        var arrTypes = [];
        for (const item of result.itemList) {
          let value = { id: item.tabOfContID, text: item.tabOfContNumber }
          arrTypes.push(value);
        }
        this.tableOfContArr = arrTypes;
      }, 
      (error => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          // this.hideSpinner("filterOptions");
        }, 5000);
      }),
      () => {
        // this.hideSpinner("filterOptions");
      })

      this.statusService.getAllStatus()
      .subscribe((result) => {
      //  this.organFilterData = result;
        var arrTypes = [];
        for (const item of result.itemList) {
          let value = { id: item.statusID, text: item.note }
          arrTypes.push(value);
        }
        this.statusArr = arrTypes;
      }, 
      (error => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          // this.hideSpinner("filterOptions");
        }, 5000);
      }),
      () => {
        // this.hideSpinner("filterOptions");
      })
  }

  getAllStatus(){
    this.statusService.getAllStatus()
    .subscribe((result) => {
      if(result != undefined)
      {
        if(result.itemList != undefined && result.itemList !=null)
          this.statuss = result.itemList;
        else
          this.statuss = [];
      }
    },
    (error) => {
    }, () => {
    });
  }

  getFilterTypes(value : string[]) {
    if (value != undefined) {
    }
    
  }

  getFilterName(value : string[]) {

  }

  getFilterOrganAddress(value: string[]) {

  }
  onChange(searchText: string){
    this.searchText = searchText;
    this.getFilterOptions(this.arrayTableOfContValue,this.arrayStatusValue);
  }

  getFilterOptions (types: string[],statuss: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "sh.MucLucHoSoID",
        op: "",
        value: ""
      },
      {
        field: "sh.TieuDeHopSo ",
        op: "",
        value: ""
      },
      {
        field: "sh.MaHopSo",
        op: "",
        value: ""
      },
      {
        field: "sh.GhiChu",
        op: "",
        value: ""
      },
      {
        field: "sh.Status",
        op: "",
        value: ""
      }
    ]
    this.arrayTableOfContValue = types;
    if (this.arrayTableOfContValue != undefined) {
      this.condition.FilterRuleList[0].value = types.toString();
      if (types.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }

    this.arrayStatusValue = statuss;
    if (this.arrayStatusValue != undefined) {
      this.condition.FilterRuleList[4].value = statuss.toString();
      if (statuss.length == 1) {
        this.condition.FilterRuleList[4].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[4].op = "and_in_strings";
      }
    }

    if (this.searchText != "") {
      this.condition.FilterRuleList[1].value = this.searchText;
      this.condition.FilterRuleList[1].op = "start_and_or_contains";
      this.condition.FilterRuleList[2].value = this.searchText;
      this.condition.FilterRuleList[2].op = "or_contains";
      this.condition.FilterRuleList[3].value = this.searchText;
      this.condition.FilterRuleList[3].op = "end_and_or_contains";
    }

    if (this.searchText == "") {
      this.condition.FilterRuleList[1].value = this.searchText;
      this.condition.FilterRuleList[1].op = "";
      this.condition.FilterRuleList[2].value = this.searchText;
      this.condition.FilterRuleList[2].op = "";
      this.condition.FilterRuleList[3].value = this.searchText;
      this.condition.FilterRuleList[3].op = "";
    }
    if (types != undefined || this.searchText !=undefined) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
      this.quanLyHopSoService.getAllHopSoWithPaging(this.condition)
      .subscribe((data: any) => {
        this.hopsos = data.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = data.totalRows;
      }, (error) => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          this.hideSpinner("paging");
        }, 5000);
      }, () => {
        this.hideSpinner("paging");
      })
    }
  }

  showSpinner (name?: string, type?: string, opacity? : string) {
    this.spinner.show(
      name,
      {
        type: `${type}`,
        size: 'small',
        bdColor: `rgba(255,255,255, ${opacity})`,
        color: 'rgb(0,191,255)',
        fullScreen: false
      }
    );
  }

  hideSpinner (name? : string) {
    setTimeout(() => {
      this.spinner.hide(name);
    }, 100);
  }

  ngOnDestroy(): void {
  
  }
}
