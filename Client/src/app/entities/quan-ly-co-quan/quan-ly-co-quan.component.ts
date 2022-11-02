import { Component, OnInit, OnDestroy } from '@angular/core';
import { CoQuan } from '../../model/co-quan.model';
import { coquans } from '../../model/co-quan.model';
import { ActivatedRoute } from '@angular/router';
import { QuanLyCoQuanPopupService } from './quan-ly-co-quan-popup.service';
import { CoQuanDialogComponent } from './co-quan-dialog/co-quan-dialog.component';
import { CoQuanDeleteComponent } from './co-quan-delete/co-quan-delete.component';
import { QuanLyCoQuanService } from './quan-ly-co-quan-service.service';
import { HttpResponse } from '@angular/common/http';
import { BaseCondition } from '../../common/BaseCondition';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { OrganFilter } from '../../model/organ-filter.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-quan-ly-co-quan',
  templateUrl: './quan-ly-co-quan.component.html',
  styleUrls: ['./quan-ly-co-quan.component.css']
})
export class QuanLyCoQuanComponent implements OnInit, OnDestroy {
  
  coquans: CoQuan[];
  coquan: CoQuan;
  page = 1; 
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<CoQuan>;
  options: Options;
  organFilterData: OrganFilter;

  color: string = "primary";
  mode: string = "indeterminate";
  value: number = 30;
  organTypesArr : Array<Select2OptionData>;
  organNameArr: Array<Select2OptionData>;
  organAddressArr: Array<Select2OptionData>;
  valueOrganTypes: Array<string>;
  arrayTypeValue: string[];
  arrayNameValue: string[];
  arrayAddressValue: string[];

  constructor(
    private route: ActivatedRoute,
    private coQuanPopupService: QuanLyCoQuanPopupService,
    private coQuanService: QuanLyCoQuanService,
    private spinner: NgxSpinnerService
  ) { 
    this.condition = new BaseCondition<CoQuan>();
    this.organTypesArr = new Array<Select2OptionData>();
    this.organNameArr = new Array<Select2OptionData>();
    this.organAddressArr = new Array<Select2OptionData>();
    this.organFilterData = new OrganFilter();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.coQuanService.listen().subscribe(( m : any) => {
      this.loadPages(this.page.toString());
    //  this.hideSpinner("dataTable");
    })
    
  }

  ngOnInit() {
    this.loadFilterOptionsOrgan();
    this.loadAll();
  }
  openDialog(id?: number) {
    if (id) {
      this.coQuanPopupService
        .open(CoQuanDialogComponent as Component, id);
    } else {
      this.coQuanPopupService
        .open(CoQuanDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {
      this.coQuanPopupService
        .open(CoQuanDeleteComponent as Component, id);
  }

  loadPages(page : string) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    try {
      var condi : BaseCondition<CoQuan> = new BaseCondition<CoQuan>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.coQuanService.getAllCoQuanWithPaging(condi).subscribe((data : any) => {
        this.coquans = data.itemList;
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
      alert(JSON.stringify(e));
    }
  }
  loadAll(){
    this.showSpinner("dataTable", "timer", "0.8");
    this.coQuanService.getAllCoQuanWithPaging().subscribe((data : any) => {
      this.coquans = data.itemList;
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
      this.showSpinner("filterOptions","timer", "0.8");
    });
  }

  // deleteCoQuan(id: any) {
  //   if (confirm("Bạn có muốn xóa cơ quan có id = " + id + " ?"))
  //   {
      
  //   }
  // }
  loadFilterOptionsOrgan () {
    
    this.coQuanService.getAllOrgan()
      .subscribe((result) => {
      //  this.organFilterData = result;
        var arrTypes = [];
        for (const item of result.organTypes) {
          let value = { id: item, text: item }
          arrTypes.push(value);
        }
        this.organTypesArr = arrTypes;
        arrTypes = [];
        for (const item of result.organName) {
          let value = { id: item, text: item }
          arrTypes.push(value);
        }
        this.organNameArr = arrTypes;
        arrTypes = [];
        for (const item of result.organAddress) {
          let value = { id: item, text: item }
          arrTypes.push(value);
        }
        this.organAddressArr = arrTypes;
        
      }, 
      (error => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          this.hideSpinner("filterOptions");
        }, 5000);
      }),
      () => {
        this.hideSpinner("filterOptions");
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

  getFilterOptions (types: string[], name : string[], address: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "lcq.TenLoaiCoQuan",
        op: "",
        value: ""
      },
      {
        field: "cq.TenCoQuan",
        op: "",
        value: ""
      },
      {
        field: "dc.DiaChiChiTiet",
        op: "",
        value: ""
      }
    ]
    this.arrayTypeValue = types;
    this.arrayNameValue = name;
    this.arrayAddressValue = address;
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
    if (this.arrayAddressValue != undefined) {
      this.condition.FilterRuleList[2].value = address.toString();
      if (address.length == 1) {
        this.condition.FilterRuleList[2].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[2].op = "and_in_strings";
      }
    }
    
    if (types != undefined || name != undefined || address != undefined) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
      this.coQuanService.getAllCoQuanWithPaging(this.condition)
      .subscribe((data) => {
        this.coquans = data["itemList"];
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = data["totalRows"];
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

