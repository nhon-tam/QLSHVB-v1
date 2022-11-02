import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../../common';
import { LogActivity } from '../../../model/log-activity';
import { ActivatedRoute } from '@angular/router';
import { ThongKeService } from '../thong-ke.service';
import { UserService } from '../../quan-ly-nguoi-dung/user.service';
import { UserDTO } from '../../../model/user.model';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NgxSpinnerService } from 'ngx-spinner';
import { QuanLyTaiLieuService } from '../../quan-ly-tai-lieu/quan-ly-tai-lieu.service';

@Component({
  selector: 'app-nhat-ky',
  templateUrl: './nhat-ky.component.html',
  styleUrls: ['./nhat-ky.component.css']
})
export class NhatKyComponent implements OnInit {
  logActivitys: LogActivity[];
  logActivity: LogActivity;
  users: UserDTO[];
  searchText: string = "";
  page = 1;
  previousPage : number;
  pageSize : number;
  documentCodeList: Array<Select2OptionData>;
  totalRecords : number;
  condition: BaseCondition<LogActivity>;
  options: Options;
  userArr: Array<Select2OptionData>;
  userNameArr: string[];
  documentCodeArr: string[];
  arrayDocumentValue: string[];
  fromDate: string;
  endDate: string;

  constructor( 
    private route: ActivatedRoute,
    private service: ThongKeService,
    private userService: UserService,
    private documentService: QuanLyTaiLieuService,
    private spinner: NgxSpinnerService,
    ) 
    {
      // this.fromDate = new Date().toISOString().split('T')[0];
      // this.endDate = new Date().toISOString().split('T')[0];
      this.condition = new BaseCondition<LogActivity>();
      this.documentCodeList = new Array<Select2OptionData>();
      this.userArr = new Array<Select2OptionData>();
      this.options = {
        width: "100%",
        closeOnSelect: true,
        multiple: true,
        tags: true
      }
     }

  ngOnInit() {
    // var date = new Date();
    // this.fromDate = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
    // this.endDate = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().slice(0, 10);
    this.loadFilterOptions();
    this.loadAll();
  }
  
  loadPages(page : number) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    var condi : BaseCondition<LogActivity> = new BaseCondition<LogActivity>();
    if (this.condition.FilterRuleList != undefined) {
      condi.FilterRuleList = this.condition.FilterRuleList;
    }
    condi.PageIndex = page;
    this.service.getAlllogActivityWithPaging(condi).subscribe((data : any) => {
      this.logActivitys = data.itemList;
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
    this.service.getAlllogActivityWithPaging().subscribe((data : any) => {
      this.logActivitys = data.itemList;
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

  loadFilterOptions () {
    this.userService.getAllUser()
    .subscribe((result) => {
    //  this.organFilterData = result;
      var arrTypes = [];
      for (const item of result.itemList) {
        let value = { id: item.userName, text: item.userName }
        arrTypes.push(value);
      }
      this.userArr = arrTypes;
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

    this.documentService.getAllDocument()
      .subscribe((result) => {
        var documentList = [];
        for (const item of result.itemList) {
          
          var temp = { id: item.documentCode, text: item.documentCode };
          documentList.push(temp);
        }
        
        this.documentCodeList = documentList;
      },
      (error) => {
        setTimeout(() => {
          alert("Lấy dữ liệu về hồ sơ thất bại. Lỗi: " + JSON.stringify(error));
        }, 1000);
      },
      () => {
      });
  }
  
  getFilterOptions (userNameArr: string[], documentCodeArr: string[], fromDate: string, endDate: string) {
    if(fromDate != undefined && endDate != undefined){
      if(this.isValidDate(fromDate, endDate)){
        alert("Lỗi: Ngày kết thúc không được nhỏ hơn ngày bắt đầu. Xin mời nhập lại");
      }
    }
    
    console.log("invoked");
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "vb.NguoiTao",
        op: "",
        value: ""
      },
      {
        field: "vb.MaDinhDanh",
        op: "",
        value: ""
      },
      {
        field: "vb.NgayTao",
        op: "",
        value: ""
      },
      {
        field: "vb.NgayCapNhat",
        op: "",
        value: ""
      },
      
    ]
    this.userNameArr = userNameArr;
    this.documentCodeArr = documentCodeArr;
    if (this.userNameArr != undefined) {
      this.condition.FilterRuleList[0].value = userNameArr.toString();
      if (userNameArr.length == 1) {
        this.condition.FilterRuleList[0].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[0].op = "and_in_strings";
      }
    }
    if (this.documentCodeArr != undefined) {
      this.condition.FilterRuleList[1].value = documentCodeArr.toString();
      if (documentCodeArr.length == 1) {
        this.condition.FilterRuleList[1].op = "and_contains";
      }
      else {
        this.condition.FilterRuleList[1].op = "and_in_strings";
      }
    }

    if (fromDate != undefined && endDate !=undefined) {
      this.condition.FilterRuleList[2].value = this.fromDate.toString() + "/" + this.endDate.toString();
      this.condition.FilterRuleList[2].op = "and_date_between_custom";
      this.condition.FilterRuleList[3].value = this.fromDate.toString() + "/" + this.endDate.toString();
      this.condition.FilterRuleList[3].op = "or_date_between_custom";
    }
    
    
    if (this.userNameArr != undefined || this.documentCodeArr != undefined || this.fromDate != undefined || this.endDate != undefined) {
      this.showSpinner("paging", "ball-spin-clockwise", "0.2");
      this.service.getAlllogActivityWithPaging(this.condition)
      .subscribe((data: any) => {
        this.logActivitys = data.itemList;
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
  isValidDate(fromDate: string, endDate: string){
    return Date.parse(fromDate) <= Date.parse(endDate) ? false:true
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
