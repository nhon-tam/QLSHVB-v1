import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../../common';
import { Phong } from '../../../model/phong.model';
import { ActivatedRoute } from '@angular/router';
import { QuanLyPhongPopupService } from '../../quan-ly-phong/quan-ly-phong-popup.service';
import { QuanLyPhongService } from '../../quan-ly-phong/quan-ly-phong.service';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { QuanLyCoQuanService } from '../../quan-ly-co-quan/quan-ly-co-quan-service.service';
import { ThongKeService } from '../thong-ke.service';

@Component({
  selector: 'app-thong-ke',
  templateUrl: './thong-ke.component.html',
  styleUrls: ['./thong-ke.component.css']
})
export class ThongKeComponent implements OnInit {
  phongs: Phong[];
  phong: Phong;
  searchText: string = "";
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<Phong>;
  link: string = "";

  constructor( 
    private route: ActivatedRoute,
    public phongService: QuanLyPhongService,
    private danhMucService: QuanLyDanhMucService,
    private coQuanService: QuanLyCoQuanService,
    private thongKeService: ThongKeService
    ) { }

  ngOnInit() {
    this.getLinkExportFont();
    this.loadAll();
  }

  loadPages(page : string) {
    try{
      var condi : BaseCondition<Phong> = new BaseCondition<Phong>();
      if(this.condition!=undefined){
        if (this.condition.FilterRuleList != undefined) {
          condi.FilterRuleList = this.condition.FilterRuleList;
        }
      }
      condi.PageIndex = parseInt(page);
      this.phongService.getAllPhongWithPaging(condi).subscribe((data : any) => {
        this.phongs = data.itemList;
        this.pageSize = 5;
        this.page = parseInt(page);
        this.totalRecords = data.totalRows;
      }, (error) => {
        this.pageSize = 5;
      }, () => {
      });
    }catch (e) {
      alert(JSON.stringify(e))
    }
  }
 
  loadAll(){
    this.phongService.getAllPhongWithPaging().subscribe((data: any) => {
      this.phongs = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
    });
  }

  getLinkExportFont(){
    this.link =  this.thongKeService.getLinkExportFont();
  }
}
