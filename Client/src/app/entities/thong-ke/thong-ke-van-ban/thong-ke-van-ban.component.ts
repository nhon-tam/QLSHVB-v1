import { Component, OnInit } from '@angular/core';
import { BaseCondition, ApiUrl } from '../../../common';
import { ActivatedRoute } from '@angular/router';
import { ThongKeService } from '../thong-ke.service';
import { UserService } from '../../quan-ly-nguoi-dung/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { VanBanDTO } from '../../../model/van-ban-dto';
import { QuanLyTaiLieuService } from '../../quan-ly-tai-lieu/quan-ly-tai-lieu.service';

@Component({
  selector: 'app-thong-ke-van-ban',
  templateUrl: './thong-ke-van-ban.component.html',
  styleUrls: ['./thong-ke-van-ban.component.css']
})
export class ThongKeVanBanComponent implements OnInit {
  vanBans: VanBanDTO[];
  vanBan: VanBanDTO;
  searchText: string = "";
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<VanBanDTO>;
  fromDate: any;
  toDate: any;
  link: string = "";

  constructor( 
    private route: ActivatedRoute,
    private service: ThongKeService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private taiLieuService: QuanLyTaiLieuService,
    ) 
    {
      this.condition = new BaseCondition<VanBanDTO>();
    }

  ngOnInit() {
    var date = new Date();
    this.fromDate = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
    this.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().slice(0, 10);
    // this.loadFilterOptions();
    this.getLinkExportExcel(this.fromDate,this.toDate);
    this.loadAll();
  }
  
  loadPages(page : number) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    var condi : BaseCondition<VanBanDTO> = new BaseCondition<VanBanDTO>();
    if (this.condition.FilterRuleList != undefined) {
      condi.FilterRuleList = this.condition.FilterRuleList;
    }
    condi.PageIndex = page;
    this.service.GetDataExportDocument(condi).subscribe((data : any) => {
      this.vanBans = data.itemList;
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

  search () {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "vb.NgayTao",
        op: "",
        value: ""
      }
    ]
    if (this.fromDate != undefined && this.toDate != undefined) {
      var filter = this.fromDate.toString() + "/" + this.toDate.toString();
      this.condition.FilterRuleList[0].value = filter.toString();
      this.getLinkExportExcel(this.fromDate,this.toDate);
    }
    if (this.fromDate != undefined && this.toDate != undefined) {
      this.showSpinner("dataTable", "ball-spin-clockwise", "0.2");
      this.service.GetDataExportDocument(this.condition).subscribe((data : any) => {
        this.vanBans = data.itemList;
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
  }
  loadAll (){
    this.showSpinner("dataTable", "timer", "0.8");
    this.service.GetDataExportDocument().subscribe((data : any) => {
      this.vanBans = data.itemList;
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

  getLinkExportExcel(fromDate,toDate) {
    this.link = ApiUrl.apiUrl + 'ExportDocument/ExportDocument?fromDate=' + fromDate +'&toDate=' + toDate;
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
