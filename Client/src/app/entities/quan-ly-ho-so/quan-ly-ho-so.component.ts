import { Component, OnInit } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { QuanLyHoSoPopupService } from './quan-ly-ho-so-popup.service';
import { HoSoDialogComponent } from './ho-so-dialog/ho-so-dialog.component';
import { HoSoDeleteComponent } from './ho-so-delete/ho-so-delete.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { BaseCondition } from '../../common';
import { QuanLyHoSoService } from './quan-ly-ho-so.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-quan-ly-ho-so',
  templateUrl: './quan-ly-ho-so.component.html',
  styleUrls: ['./quan-ly-ho-so.component.css']
})
export class QuanLyHoSoComponent implements OnInit {
  hoso: HoSo;
  lstHoSo: HoSo[] = new Array<HoSo>();
  page = 1;
  pageSize: number = 5;
  totalRecords: number;
  options: Options;
  condition: BaseCondition<HoSo> = new BaseCondition<HoSo>();

  // filter item
  gearBoxIdFilter : Array<Select2OptionData>;
  profileIdFilter: Array<Select2OptionData>;
  profileNameFilter: Array<Select2OptionData>;
  arrayIdValue: string[];
  arrayTitleValue: string[];
  arrayGearBoxValue: string[];
  //
  constructor(
    private hoSoPopupService: QuanLyHoSoPopupService,
    private activeModal: NgbActiveModal,
    private service: QuanLyHoSoService,
    private spinner: NgxSpinnerService
  ) {
    this.gearBoxIdFilter = new Array<Select2OptionData>();
    this.profileIdFilter = new Array<Select2OptionData>();
    this.profileNameFilter = new Array<Select2OptionData>();
    this.options = {
      width: '100%',
      closeOnSelect: true,
      multiple: true,
      tags: true,
    }
    this.service.listen().subscribe((m : any ) => {
      this.loadPages(this.page, this.pageSize);
    })
   }

  ngOnInit() {
    this.loadData();
    this.loadFilterOptions();
  }
  openDialog(id?: number) {
    if (id) {
      this.hoSoPopupService
        .open(HoSoDialogComponent as Component, id);
    } else {
      this.hoSoPopupService
        .open(HoSoDialogComponent as Component);
    }
  }
  // openDeleteDialog(id?: number) {

  //     this.hoSoPopupService
  //       .open(HoSoDeleteComponent as Component, id);
  //     console.log(id);
  // }

  loadData (condi?: BaseCondition<HoSo>) {
    if (condi != undefined) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    }
    else {
      this.showSpinner("dataTable", "timer", "0.8");
    }
  //  this.showSpinner("dataTable", "timer", "0.8");
    this.service.getAllProfilesWithPaging(condi)
      .subscribe((result) => {
        if (result.isSuccess) {
          this.lstHoSo = result.itemList;
          this.totalRecords = result.totalRows;
          if (condi != undefined)
          {
            this.pageSize = condi.PageSize;
            this.page = condi.PageIndex;
          }
          else {
            this.pageSize = 5;
            this.page = 1;
          }
        }
        else {
          alert("Lỗi: " + result.errorMessage);
        }
      }, (error) => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          this.hideSpinner("dataTable");
        }, 5000);
      }, () => {
        if (condi != undefined) {
          this.hideSpinner("paging");
        }
        else {
          this.hideSpinner("dataTable");
          this.showSpinner("filterOptions","timer", "0.8");
        }
      });
  }

  loadPages(page : number, pageSize: number) {
    var condition: BaseCondition<HoSo> = new BaseCondition<HoSo>();
    if (this.condition.FilterRuleList) {
      condition.FilterRuleList = this.condition.FilterRuleList;
    }
    condition.PageIndex = page;
    condition.PageSize = pageSize || 5;
    this.loadData(condition);
  }

  loadFilterOptions () {
    this.showSpinner("filterOptions","timer", "0.8");
    this.service.getAllProfiles()
      .subscribe((result) => {
          var arrTypes = [];
          for (const item of result.lstFileCode) {
            let value = { id: item, text: item }
            arrTypes.push(value);
          }
          this.profileIdFilter = arrTypes;
          arrTypes = [];
          for (const item of result.lstTitle) {
            let value = { id: item, text: item }
            arrTypes.push(value);
          }
          this.profileNameFilter = arrTypes;
          arrTypes = [];
          for (const item of result.lstGearBoxCode) {
            let value = { id: item, text: item }
            arrTypes.push(value);
          }
          this.gearBoxIdFilter = arrTypes;
        }, 
        (error) => {
          setTimeout(() => {
            alert("Lỗi: " + JSON.stringify(error));
            this.hideSpinner("filterOptions");
          }, 5000);
        },
      () => {
        this.hideSpinner("filterOptions");
      });
  }
  getFilterOptions(id: string[], title: string [], gbx: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "hs.MaHoSo",
        op: "",
        value: ""
      },
      {
        field: "hs.TieuDeHoSo",
        op: "",
        value: ""
      },
      {
        field: "hps.MaHopSo",
        op: "",
        value: ""
      }
    ]
    this.arrayIdValue = id;
    this.arrayTitleValue = title;
    this.arrayGearBoxValue = gbx;
    if (this.arrayIdValue != undefined) {
      this.condition.FilterRuleList[0].value = id.toString();
      if (id.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }
    if (this.arrayTitleValue != undefined) {
      this.condition.FilterRuleList[1].value = title.toString();
      if (title.length == 1) {
        this.condition.FilterRuleList[1].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[1].op = "and_in_strings";
      }
    }
    if (this.arrayGearBoxValue != undefined) {
      this.condition.FilterRuleList[2].value = gbx.toString();
      if (gbx.length == 1) {
        this.condition.FilterRuleList[2].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[2].op = "and_in_strings";
      }
    }
    
    if (id != undefined || title != undefined || gbx != undefined) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
      this.service.getAllProfilesWithPaging(this.condition)
      .subscribe((data) => {
        this.lstHoSo = data.itemList;
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
}
