import { Component, OnInit, ViewChild } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan/quan-ly-co-quan-popup.service';
import { NhomNguoiDungDialogComponent } from './nhom-nguoi-dung-dialog/nhom-nguoi-dung-dialog.component';
import { QuanLyNhomNguoiDungPopupService } from './quan-ly-nhom-nguoi-dung-popup.service';
import { UserGroupService } from './user-group.service';
import { BaseCondition } from '../../common';
import { UserGroup } from '../../model/user-group.model';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NhomNguoiDungDeleteComponent } from './nhom-nguoi-dung-delete/nhom-nguoi-dung-delete.component';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nhom-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nhom-nguoi-dung.component.css']
})
export class QuanLyNhomNguoiDungComponent implements OnInit {
  page = 1;
  condition: BaseCondition<UserGroup> = new BaseCondition<UserGroup>();
  pageSize: number;
  totalRecords: number;
  userGroups: UserGroup[];
  options: Options;
  userGroup: UserGroup;
  lstFont: Array<Select2OptionData>;
  userGroupArr : Array<Select2OptionData>;
  searchText: string = "";


  constructor(private quanLyNhomNguoiDungService: QuanLyNhomNguoiDungPopupService,
              private userGroupService : UserGroupService,
              private toastService: ToastrService
  ) { 
    this.userGroupService.listen().subscribe((m: any) =>{
      this.loadPages(this.page.toString());
    })
    this.searchText = "";
    this.condition = new BaseCondition<UserGroup>();
    this.userGroupArr = new Array<Select2OptionData>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.userGroup = new UserGroup();
  }

  ngOnInit() {
    this.loadFilterOptionsOrgan();
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.quanLyNhomNguoiDungService
        .open(NhomNguoiDungDialogComponent as Component, id);

    } else {
      this.quanLyNhomNguoiDungService
        .open(NhomNguoiDungDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

    this.quanLyNhomNguoiDungService
      .open(NhomNguoiDungDeleteComponent as Component, id);
  }


  loadAll(){
    this.userGroupService.userGroupGetSearchWithPaging().subscribe((data : any) => {
      this.userGroups = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
    });
  }

  loadPages(page : string) {
    try {
      var condi : BaseCondition<UserGroup> = new BaseCondition<UserGroup>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.userGroupService.userGroupGetSearchWithPaging(condi).subscribe((data : any) => {
        this.userGroups = data.itemList;
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

  loadFilterOptionsOrgan () {
    this.userGroupService.getAllRole()
      .subscribe((result) => {
        var arrTypes = [];
        for (const item of result.itemList) {
          arrTypes.push({ id: item.roleID, text: item.roleName });
        }
        this.userGroupArr = arrTypes;
      }, 
      (error => {
      }),
      () => {
      })
  }

  onChange(searchText: string){
    this.searchText = searchText;
    this.getFilterOptions();
  }

  getFilterOptions () {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "r.RoleName",
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
      this.userGroupService.userGroupGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.userGroups = data.itemList;
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
