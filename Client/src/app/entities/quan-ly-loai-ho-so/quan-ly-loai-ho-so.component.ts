import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseCondition } from '../../common';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { LoaiHoSo } from '../../model/loai-ho-so';
import { QuanLyLoaiHoSoPopupService } from './quan-ly-loai-ho-so-popup.service';
import { LoaiHoSoService } from './loai-ho-so.service';
import { LoaiHoSoDialogComponent } from './loai-ho-so-dialog/loai-ho-so-dialog.component';
import { LoaiHoSoDeleteComponent } from './loai-ho-so-delete/loai-ho-so-delete.component';
@Component({
  selector: 'app-quan-ly-loai-ho-so',
  templateUrl: './quan-ly-loai-ho-so.component.html',
  styleUrls: ['./quan-ly-loai-ho-so.component.css']
})
export class QuanLyLoaiHoSoComponent implements OnInit {
  page = 1;
  condition: BaseCondition<LoaiHoSo> = new BaseCondition<LoaiHoSo>();
  pageSize: number;
  totalRecords: number;
  loaiHoSos: LoaiHoSo[];
  options: Options;
  loaiHoSo: LoaiHoSo;
  searchText: string = "";

  constructor(private quanLyLoaiHoSoPopupService: QuanLyLoaiHoSoPopupService,
              private loaiHoSoService : LoaiHoSoService,
              private toastService: ToastrService
  ) { 
    this.loaiHoSoService.listen().subscribe((m: any) =>{
      this.loadAll();
    })
    this.searchText = "";
    this.condition = new BaseCondition<LoaiHoSo>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.loaiHoSo = new LoaiHoSo();
  }

  ngOnInit() {
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.quanLyLoaiHoSoPopupService
        .open(LoaiHoSoDialogComponent as Component, id);

    } else {
      this.quanLyLoaiHoSoPopupService
        .open(LoaiHoSoDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {
    this.quanLyLoaiHoSoPopupService
      .open(LoaiHoSoDeleteComponent as Component, id);
  }


  loadAll(){
    this.loaiHoSoService.LoaiHoSoGetSearchWithPaging().subscribe((data : any) => {
      this.loaiHoSos = data.itemList;
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
      var condi : BaseCondition<LoaiHoSo> = new BaseCondition<LoaiHoSo>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.loaiHoSoService.LoaiHoSoGetSearchWithPaging(condi).subscribe((data : any) => {
        this.loaiHoSos = data.itemList;
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
        field: "lhs.TenLoaiHoSo",
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
      this.loaiHoSoService.LoaiHoSoGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.loaiHoSos = data.itemList;
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
