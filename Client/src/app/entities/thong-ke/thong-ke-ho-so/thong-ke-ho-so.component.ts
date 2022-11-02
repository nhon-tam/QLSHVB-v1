import { Component, OnInit } from '@angular/core';
import { BaseCondition, ApiUrl } from '../../../common';
import { ActivatedRoute } from '@angular/router';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { ThongKeService } from '../thong-ke.service';
import { HopSo } from '../../../model/hop-so.model';
import { QuanLyHoSoService } from '../../quan-ly-ho-so/quan-ly-ho-so.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HoSoDTO } from '../../../model/ho-so-dto';

@Component({
  selector: 'app-thong-ke-ho-so',
  templateUrl: './thong-ke-ho-so.component.html',
  styleUrls: ['./thong-ke-ho-so.component.css']
})
export class ThongKeHoSoComponent implements OnInit {
  hosos: HoSoDTO[];
  hoso: HoSoDTO;
  searchText: string = "";
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<HoSoDTO>;
  link: string = "";
  fromDate: any;
  toDate: any;

  constructor( 
    private route: ActivatedRoute,
    private service: ThongKeService,
    private spinner: NgxSpinnerService
    ) { this.condition = new BaseCondition<HoSoDTO>(); }

  ngOnInit() {
    var date = new Date();
    this.fromDate = new Date(date.getFullYear(), date.getMonth(), 2).toISOString().slice(0, 10);
    this.toDate = new Date(date.getFullYear(), date.getMonth() + 1, 1).toISOString().slice(0, 10);
    this.getLinkExportExcel(this.fromDate,this.toDate);
    this.loadAll();
  }

  loadPages(page : string) {
    this.showSpinner("paging", "ball-spin-clockwise", "0.2");
    try{
      var condi : BaseCondition<HoSoDTO> = new BaseCondition<HoSoDTO>();
      if(this.condition!=undefined){
        if (this.condition.FilterRuleList != undefined) {
          condi.FilterRuleList = this.condition.FilterRuleList;
        }
      }
      condi.PageIndex = parseInt(page);
      this.service.GetDataExportProfile(condi).subscribe((data : any) => {
        this.hosos = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows;
      },(error) => {
        setTimeout(() => {
          alert("Lỗi: " + JSON.stringify(error));
          this.hideSpinner("paging");
        }, 5000);
    }, () => {
      this.hideSpinner("paging");
    });
    }catch (e) {
      alert(JSON.stringify(e))
    }
  }
 
  search () {
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "hs.NgayTao",
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
      this.service.GetDataExportProfile(this.condition).subscribe((data : any) => {
        this.hosos = data.itemList;
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

  loadAll(){
    this.showSpinner("dataTable", "timer", "0.8");
    this.service.GetDataExportProfile().subscribe((data: any) => {
      this.hosos = data.itemList;
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

  getLinkExportExcel(fromDate,toDate) {
    this.link = ApiUrl.apiUrl + 'ExportProfile/ExportProfile?fromDate=' + fromDate +'&toDate=' + toDate;
  }
  ngOnDestroy(): void {
  
  }
}
