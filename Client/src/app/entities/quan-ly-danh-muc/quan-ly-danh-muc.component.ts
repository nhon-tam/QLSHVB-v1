import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../model/danh-muc.model';
import { QuanLyDanhMucPopupService } from './quan-ly-danh-muc-popup.service';
import { DanhMucDialogComponent } from './danh-muc-dialog/danh-muc-dialog.component';
import { DanhMucDeleteComponent } from './danh-muc-delete/danh-muc-delete.component';
import { ActivatedRoute } from '@angular/router';
import {QuanLyDanhMucService} from './quan-ly-danh-muc.service';
import { BaseCondition } from '../../common/BaseCondition';
import { Phong } from '../../model/phong.model';
import { QuanLyPhongService } from './../quan-ly-phong/quan-ly-phong.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { QuanLyCoQuanService } from '../quan-ly-co-quan/quan-ly-co-quan-service.service';
import { OrganFilter } from '../../model/organ-filter.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-quan-ly-danh-muc',
  templateUrl: './quan-ly-danh-muc.component.html',
  styleUrls: ['./quan-ly-danh-muc.component.css']
})
export class QuanLyDanhMucComponent implements OnInit {

  // @ViewChild("modalPhong") public modalPhong: ModalDirective;
  phong: Phong;
  searchText: string ="";
  danhmucs: DanhMuc[];
  page = 1;
  danhmuc: DanhMuc;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  lstOrgan: Array<Select2OptionData>;
  options: Options;
  optionsFont :Options;
  lstFont: Array<Select2OptionData>;
  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 30;
  organFilterData: OrganFilter;
  condition: BaseCondition<DanhMuc>;
  organArr : Array<Select2OptionData>;
  fontArr: Array<Select2OptionData>;
  organAddressArr: Array<Select2OptionData>;
  valueOrganTypes: Array<string>;
  arrayTypeValue: string[];
  arrayNameValue: string[];

  constructor(
    private route: ActivatedRoute,
    private danhMucPopupService: QuanLyDanhMucPopupService,
    private danhMucService: QuanLyDanhMucService,
    private phongService: QuanLyPhongService,
    private coQuanService: QuanLyCoQuanService,
    private spinner : NgxSpinnerService
    ) {
    this.searchText = "";
    this.condition = new BaseCondition<DanhMuc>();
    this.organArr = new Array<Select2OptionData>();
    this.fontArr = new Array<Select2OptionData>();
    this.organFilterData = new OrganFilter();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.phong = new Phong();
    this.optionsFont = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
    }
    this.danhMucService.listen().subscribe((m: any) => {
      this.loadPages(this.page.toString());
    })
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

  openDeleteDialog(id?: number) {

    this.danhMucPopupService
      .open(DanhMucDeleteComponent as Component, id);
  }

  ngOnInit() {
    this.loadFilterOptionsOrgan();
    this.loadAll();
  }
  
  loadPages(page : string) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    try {
      var condi : BaseCondition<DanhMuc> = new BaseCondition<DanhMuc>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.danhMucService.getAllDanhMucWithPaging(condi).subscribe((data : any) => {
        this.danhmucs = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows
        }, (error) => {
          setTimeout(() => {
            alert("Lỗi: " + JSON.stringify(error));
            this.hideSpinner("paging");
          }, 5000);
      }, () => {
        this.hideSpinner("paging");
      });
    }
    catch (e) {
      alert(JSON.stringify(e))
    }
  }

  loadAll(){
    this.showSpinner("dataTable", "timer", "0.8");
    this.danhMucService.getAllDanhMucWithPaging().subscribe((data : any) => {
      this.danhmucs = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    },  (error) => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
        this.hideSpinner("dataTable");
      }, 5000);
    }, () => {
      this.hideSpinner("dataTable");
      // this.showSpinner("filterOptions","timer", "0.8");
    });
  }

  loadFilterOptionsOrgan () {
    this.phongService.getAllCoQuan()
      .subscribe((result) => {
        var arrTypes = [];
        var rs = result.itemList;
        for (const item of rs) {
          let value = { id: item.tenCoQuan, text: item.tenCoQuan }
          arrTypes.push(value);
        }
        this.organArr = arrTypes;
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

      this.danhMucService.getAllPhong()
      .subscribe((result) => {
        var arrTypes = [];
        for (const item of result.itemList) {
          let value = { id: item.fontName, text: item.fontName }
          arrTypes.push(value);
        }
        this.fontArr = arrTypes;
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
    this.getFilterOptions(this.arrayTypeValue,this.arrayNameValue);
  }

  getFilterOptions (types: string[], name : string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "cq.TenCoQuan",
        op: "",
        value: ""
      },
      {
        field: "sp.TenPhong",
        op: "",
        value: ""
      },
      {
        field: "sm.TenMucLucHoSo",
        op: "",
        value: ""
      },
      {
        field: "sm.MucLucSo",
        op: "",
        value: ""
      },
      {
        field: "sm.GhiChu",
        op: "",
        value: ""
      }
    ]
    this.arrayTypeValue = types;
    this.arrayNameValue = name;
    if (this.arrayTypeValue != undefined) {
      this.condition.FilterRuleList[0].value = types.toString();
      if (types.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }
    if (this.arrayNameValue != undefined) {
      this.condition.FilterRuleList[1].value = name.toString();
      if (name.length == 1) {
        this.condition.FilterRuleList[1].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[1].op = "and_in_strings";
      }
    }

    if (this.searchText != "") {
      var length = this.condition.FilterRuleList.length;
      this.condition.FilterRuleList[2].value = this.searchText;
      this.condition.FilterRuleList[2].op = "start_and_or_contains";
      this.condition.FilterRuleList[3].value = this.searchText;
      this.condition.FilterRuleList[3].op = "or_contains";
      this.condition.FilterRuleList[4].value = this.searchText;
      this.condition.FilterRuleList[4].op = "end_and_or_contains";
    }

    if (this.searchText == "") {
      var length = this.condition.FilterRuleList.length;
      this.condition.FilterRuleList[2].value = this.searchText;
      this.condition.FilterRuleList[2].op = "";
      this.condition.FilterRuleList[3].value = this.searchText;
      this.condition.FilterRuleList[3].op = "";
      this.condition.FilterRuleList[4].value = this.searchText;
      this.condition.FilterRuleList[4].op = "";
    }
    if (types != undefined || name != undefined || this.searchText !=undefined) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
      this.danhMucService.getAllDanhMucWithPaging(this.condition)
      .subscribe((data: any) => {
        this.danhmucs = data.itemList;
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