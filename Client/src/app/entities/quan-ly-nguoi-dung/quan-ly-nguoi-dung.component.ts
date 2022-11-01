import { Component, OnInit } from '@angular/core';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan/quan-ly-co-quan-popup.service';
import { NguoiDungDialogComponent } from './nguoi-dung-dialog/nguoi-dung-dialog.component';
import { QuanLyNguoiDungPopupService } from './quan-ly-nguoi-dung-popup.service';
import { UserService } from './user.service';
import { BaseCondition } from '../../common';
import { User } from '../../model/user.model';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { UserGroup } from '../../model/user-group.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { NguoiDungDeleteComponent } from './nguoi-dung-delete/nguoi-dung-delete.component';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.css']
})
export class QuanLyNguoiDungComponent implements OnInit {
  page = 1;
  condition: BaseCondition<User> = new BaseCondition<User>();
  pageSize: number;
  totalRecords: number;
  users: User[];
  user: User;
  options: Options;
  userGroup: UserGroup[];
  lstFont: Array<Select2OptionData>;
  userGroupArr : Array<Select2OptionData>;
  arrayTypeValue: string[];
  searchText: string = "";


  constructor(private quanLyNguoiDungService: QuanLyNguoiDungPopupService,
              private userService : UserService,
              private toastService: ToastrService,
              private spinner: NgxSpinnerService
  ) { 
    this.searchText = "";
    this.condition = new BaseCondition<User>();
    this.userGroupArr = new Array<Select2OptionData>();
    this.options = {
      width: "100%",
      closeOnSelect: true,
      multiple: true,
      tags: true
    }
    this.user = new User();
    this.userService.listen()
      .subscribe((m : any) => {
        this.loadPages(this.page.toString());
      })
  }

  ngOnInit() {
    this.loadFilterOptionsUser();
    this.loadAll();
  }

  openDialog(id?: number) {
    if (id) {
      this.quanLyNguoiDungService
        .open(NguoiDungDialogComponent as Component, id);

    } else {
      this.quanLyNguoiDungService
        .open(NguoiDungDialogComponent as Component);
    }

  }

  openDeleteDialog(id?: number) {
    this.quanLyNguoiDungService
      .open(NguoiDungDeleteComponent as Component, id);
  }

  loadAll(){
    this.showSpinner("dataTable", "timer", "0.8");
    this.userService.userGetSearchWithPaging().subscribe((data : any) => {
      this.users = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    },(error) => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
        this.hideSpinner("dataTable");
      }, 5000);
    }, () => {
      this.hideSpinner("dataTable");
      // this.showSpinner("filterOptions","timer", "0.8");
    });
  }

  loadPages(page : string) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    try {
      var condi : BaseCondition<User> = new BaseCondition<User>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.userService.userGetSearchWithPaging(condi).subscribe((data : any) => {
        this.users = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows
      },  (error) => {
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


  getUserById(userID: number) {
    
  }

  loadFilterOptionsUser () {
    this.userService.getAllRole()
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
    this.getFilterOptions(this.arrayTypeValue);
  }

  getFilterOptions (types: string[]) {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "ur.RoleID",
        op: "",
        value: ""
      },
      {
        field: "u.UserName",
        op: "",
        value: ""
      }
    ]
    this.arrayTypeValue = types;
    if (this.arrayTypeValue != undefined) {
      this.condition.FilterRuleList[0].value = types.toString();
      if (types != undefined &&  types.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }

    if (this.searchText != "") {
      var length = this.condition.FilterRuleList.length;
      this.condition.FilterRuleList[1].value = this.searchText;
      this.condition.FilterRuleList[1].op = "and_contains";
    }

    if (this.searchText == "") {
      var length = this.condition.FilterRuleList.length;
      this.condition.FilterRuleList[1].value = this.searchText;
      this.condition.FilterRuleList[1].op = "";
    }
    if (types != undefined || name != undefined || this.searchText !=undefined) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
      this.userService.userGetSearchWithPaging(this.condition)
      .subscribe((data: any) => {
        this.users = data.itemList;
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
