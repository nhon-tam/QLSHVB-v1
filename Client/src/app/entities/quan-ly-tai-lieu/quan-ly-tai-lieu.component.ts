import { Component, OnInit } from '@angular/core';
import { Document } from '../../model/document.model';
import { BaseCondition } from '../../common';
import { Options } from 'select2';
import { QuanLyTaiLieuService } from './quan-ly-tai-lieu.service';
import { QuanLyTaiLieuPopupService } from './quan-ly-tai-lieu-popup.service';
import { TaiLieuDialogComponent } from './tai-lieu-dialog/tai-lieu-dialog.component';
import { TaiLieuDeleteComponent } from './tai-lieu-delete/tai-lieu-delete.component';
import { Select2OptionData } from 'ng-select2';
import { QuanLyHoSoService } from '../quan-ly-ho-so/quan-ly-ho-so.service';
import { UserGroupService } from '../quan-ly-nhom-nguoi-dung/user-group.service';
@Component({
  selector: 'app-quan-ly-tai-lieu',
  templateUrl: './quan-ly-tai-lieu.component.html',
  styleUrls: ['./quan-ly-tai-lieu.component.css']
})
export class QuanLyTaiLieuComponent implements OnInit {
  public documents: Document[];
  public userRole: string;
  public roles : string;
  page = 1; 
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  fileCodeList: Array<Select2OptionData>;
  condition: BaseCondition<Document>;
  confirmedSelect2List: Array<Select2OptionData>;
  statusSelect2List: Array<Select2OptionData>;
  options: Options;
  documentCodeArr: string[];
  fileCodeArr: string[];
  confirmedArr: string[];
  statusArr:string[];
  documentCodeList: Array<Select2OptionData>;
  documentNameList: Array<Select2OptionData>;
  userName: string;
  constructor(
    private taiLieuPopupService: QuanLyTaiLieuPopupService,
    private taiLieuService: QuanLyTaiLieuService,
    private quanLyHoSoservice: QuanLyHoSoService,
    private userGroupService: UserGroupService
  ) { 
    this.userName = localStorage.getItem('user');
    this.statusSelect2List = new Array<Select2OptionData>();
    this.fileCodeList = new Array<Select2OptionData>();
    this.condition = new BaseCondition<Document>();
    this.documentCodeList = new Array<Select2OptionData>();
    this.documentNameList = new Array<Select2OptionData>();
    this.confirmedSelect2List = new Array<Select2OptionData>();
    this.options = {
    multiple: true,
    closeOnSelect: true,
    tags: true,
    width: "100%"
    }
  }

  ngOnInit() {
    this.getRoleByUserName();
    this.loadAll();
    this.taiLieuService.getAllDocument()
      .subscribe((result) => {
        var documentCodeList = [];
        for (const item of result.itemList) {
          
          var temp = { id: item.documentCode, text: item.documentCode };
          documentCodeList.push(temp);
        }
        
        this.documentCodeList = documentCodeList;
      },
      (error) => {
        setTimeout(() => {
          alert("Lấy dữ liệu về hồ sơ thất bại. Lỗi: " + JSON.stringify(error));
        }, 1000);
      },
      () => {
      });

      this.quanLyHoSoservice.getAllProfiles()
      .subscribe((result) => {
        var fileCodeList = [];
          for (const item of result.lstFileCode) {
            let value = { id: item, text: item }
            fileCodeList.push(value);
          }
          this.fileCodeList = fileCodeList;
        }, 
      (error => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
        }, 5000);
      }),
      () => {
      });
      this.confirmedSelect2List.push({id: "0", text:"Chưa duyệt"});
      this.confirmedSelect2List.push({id: "1", text:"Đã duyệt"});
      this.statusSelect2List.push({id: "1", text:"Đã sửa"});
      this.statusSelect2List.push({id: "0", text:"Chưa sửa"});
  }
  openDialog(id?: number) {
    if (id) {
      this.taiLieuPopupService
        .open(TaiLieuDialogComponent as Component, id);
    } else {
      this.taiLieuPopupService
        .open(TaiLieuDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {
      this.taiLieuPopupService
        .open(TaiLieuDeleteComponent as Component, id);
  }
  loadPages(page : string) {
    try {
      var condi : BaseCondition<Document> = new BaseCondition<Document>();
      if (this.condition.FilterRuleList.length != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.taiLieuService.getAllTaiLieuWithPaging(condi).subscribe((data : any) => {
        this.documents = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows
      }, (error) => {
        console.log(error);
      }, () => {  

      });
    }
    catch (e) {
      alert(JSON.stringify(e))
    }
  }
  loadAll(){
    this.taiLieuService.getAllTaiLieuWithPaging().subscribe((data : any) => {
      this.documents = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
      console.log(error);
    }, () => {
      
    });
  }
  // openDialog(id?: number) {

  //   if (id) {
  //     this.taiLieuPopupService
  //       .open(TaiLieuDialogComponent as Component, id);
  //     console.log(id);

  //   } else {
  //     this.taiLieuPopupService
  //       .open(TaiLieuDialogComponent as Component);
  //   }

  // }
  // openDeleteDialog(id?: number) {

  //     this.taiLieuPopupService
  //       .open(TaiLieuDeleteComponent as Component, id);
  //     console.log(id);
  // }
  // loadPages(page : number) {
  //   // switch (page) {
  //   //   case 1:
  //   //     this.coquans = coquans;
  //   //     break;
  //   //   case 2:
  //   //     this.coquans = coquans2;
  //   //     break;
  //   //   case 3:
  //   //     this.coquans = coquans;
  //   //     break;
  //   //   default:
  //   //     break;
  //   // }
  getFilterTypes(value : string[]) {
    if (value != undefined) {
    }
    
  }

  getFilterName(value : string[]) {

  }

  getFilterOrganAddress(value: string[]) {

  }

  getFilterOptions (documentCodeArr: string[], fileCodeArr : string[], confirmedArr : string[], statusArr : string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "S_VanBan.MaDinhDanh",
        op: "",
        value: ""
      },
      {
        field: "S_HoSo.MaHoSo",
        op: "",
        value: ""
      },
      {
        field: "S_VanBan.Confirmed",
        op: "",
        value: ""
      },
      {
        field: "S_VanBan.Status",
        op: "",
        value: ""
      },
    ]
    this.documentCodeArr = documentCodeArr;
    this.fileCodeArr = fileCodeArr;
    this.confirmedArr = confirmedArr;
    this.statusArr = statusArr;
    if (this.documentCodeArr != undefined) {
      this.condition.FilterRuleList[0].value = documentCodeArr.toString();
      if (documentCodeArr.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }
    if (this.fileCodeArr != undefined) {
      this.condition.FilterRuleList[1].value = fileCodeArr.toString();
      if (fileCodeArr.length == 1) {
        this.condition.FilterRuleList[1].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[1].op = "and_in_strings";
      }
    }
    if (this.confirmedArr != undefined) {
      this.condition.FilterRuleList[2].value = confirmedArr.toString();
      if (confirmedArr.length == 1) {
        this.condition.FilterRuleList[2].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[2].op = "and_in_strings";
      }
    }
    if (this.statusArr != undefined) {
      this.condition.FilterRuleList[3].value = statusArr.toString();
      if (statusArr.length == 1) {
        this.condition.FilterRuleList[3].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[3].op = "and_in_strings";
      }
    }
    
    if (fileCodeArr != undefined || documentCodeArr != undefined || statusArr != undefined || confirmedArr != undefined) {
      this.taiLieuService.getAllTaiLieuWithPaging(this.condition)
      .subscribe((data) => {
        this.documents = data["itemList"];
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = data["totalRows"];
      }, (error) => {
        console.log(error);
      }, () => {
        
      })
    }
    
  }

  getRoleByUserName() {
    this.userGroupService.getRoleName(this.userName)
    .subscribe((result) => {
        this.userRole = result.item.roleName;
        if (this.userRole.toLowerCase() === 'user') {
          this.roles = this.userRole.toLowerCase();
        }
        else {
          this.roles = 'admin';
        }
    }, 
    (error => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
      }, 5000);
    }),
    () => {
    })
  }

  ngOnDestroy(): void {
    
  }
}
