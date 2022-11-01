import { Component, OnInit } from '@angular/core';
import { BaseCondition } from '../../../common';
import { ActivatedRoute } from '@angular/router';
import { ThongKeService } from '../thong-ke.service';
import { HopSo } from '../../../model/hop-so.model';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';

@Component({
  selector: 'app-thong-ke-hop-so',
  templateUrl: './thong-ke-hop-so.component.html',
  styleUrls: ['./thong-ke-hop-so.component.css']
})
export class ThongKeHopSoComponent implements OnInit {
  hopsos: HopSo[];
  hopso: HopSo;
  searchText: string = "";
  page = 1;
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<HopSo>;
  link: string = "";

  constructor( 
    private route: ActivatedRoute,
    public service: QuanLyHopSoService,
    private thongKeService: ThongKeService
    ) { }

  ngOnInit() {
    this.getLinkExportHopSo();
    this.loadAll();
  }

  loadPages(page : string) {
    try{
      var condi : BaseCondition<HopSo> = new BaseCondition<HopSo>();
      if(this.condition!=undefined){
        if (this.condition.FilterRuleList != undefined) {
          condi.FilterRuleList = this.condition.FilterRuleList;
        }
      }
      condi.PageIndex = parseInt(page);
      this.service.getAllHopSoWithPaging(condi).subscribe((data : any) => {
        this.hopsos = data.itemList;
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
    this.service.getAllHopSoWithPaging().subscribe((data: any) => {
      this.hopsos = data.itemList;
      this.pageSize = 5;
      this.page = 1;
      this.totalRecords = data.totalRows;
    }, (error) => {
    }, () => {
    });
  }

  getLinkExportHopSo(){
    this.link =  this.thongKeService.getLinkExportHopSo();
  }
}
