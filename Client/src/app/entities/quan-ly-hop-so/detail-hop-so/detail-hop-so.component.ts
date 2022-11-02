import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuanLyHopSoService } from '../quan-ly-hop-so.service';
import { ActivatedRoute } from '@angular/router';
import { HoSo } from '../../../model/ho-so.model';
import { HopSo } from '../../../model/hop-so.model';
import { QuanLyHoSoPopupService } from '../../quan-ly-ho-so/quan-ly-ho-so-popup.service';
import { HoSoDialogComponent } from '../../quan-ly-ho-so/ho-so-dialog/ho-so-dialog.component';
import { HoSoDeleteComponent } from '../../quan-ly-ho-so/ho-so-delete/ho-so-delete.component';
import { BaseCondition } from '../../../common';
import { StatusService } from '../../../services/common-status-service';
import { Status } from '../../../model/common-status';
import { QuanLyHoSoService } from '../../quan-ly-ho-so/quan-ly-ho-so.service';

@Component({
  selector: 'app-detail-hop-so',
  templateUrl: './detail-hop-so.component.html',
  styleUrls: ['./detail-hop-so.component.css']
})
export class DetailHopSoComponent implements OnInit {
  hosos: HoSo[];
  hopso: HopSo;
  page = 1;
  statuss: Status[];
  previousPage : number;
  pageSize : number;
  totalRecords : number;
  condition: BaseCondition<HoSo>;
  private subscription: Subscription;
  hopSoID: number = 0;
  private eventSubscriber: Subscription;
  constructor(
    private quanLyHopSoService: QuanLyHopSoService,
    private route: ActivatedRoute,
    private hosoPopupService: QuanLyHoSoPopupService,
    private hosoService: QuanLyHoSoService,
    private statusService: StatusService
  ) {
      this.condition = new BaseCondition<HoSo>();
      this.hosoService.listen().subscribe(( m : any) => {
        this.load(this.hopso.gearBoxID);
      })
   }

  ngOnInit() {
    this.subscription = this.route.params.subscribe((params) => {
      this.load(params['id']);
    });
    this.getAllStatus();
  }
  load(id){
    var params = id;
    this.quanLyHopSoService.getHopSoById(id)
    .subscribe((res=>{
        this.hopso = res.item;
    }));
    if(params != undefined){
      this.getHoSoByHopSoID(params);
    }
  }
  loadPages(page : string) {
    try{
      var condi : BaseCondition<HoSo> = new BaseCondition<HoSo>();
      if (this.condition.FilterRuleList != undefined) {
        condi.FilterRuleList = this.condition.FilterRuleList;
      }
      condi.PageIndex = parseInt(page);
      this.quanLyHopSoService.getListHoSoByHopSoId(condi).subscribe((data : any) => {
        this.hosos = data.itemList;
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

  getAllStatus(){
    this.statusService.getAllStatus()
    .subscribe((result) => {
      if(result != undefined)
      {
        if(result.itemList != undefined && result.itemList !=null)
          this.statuss = result.itemList;
        else
          this.statuss = [];
      }
    },
    (error) => {
    }, () => {
    });
  }

  getHoSoByHopSoID(params : any){
    var condition : BaseCondition<HoSo> = new BaseCondition<HoSo>();
    this.condition.PageIndex = 1;
    this.condition.FilterRuleList = [
      {
        field: "hps.HopSoID",
        op: "",
        value: ""
      }
    ]
    this.hopSoID = parseInt(params);
    if (this.hopSoID != undefined) {
      this.condition.FilterRuleList[0].value = this.hopSoID.toString();
        this.condition.FilterRuleList[0].op = "and_contains";
    }
    this.quanLyHopSoService.getListHoSoByHopSoId(this.condition)
      .subscribe((res: any) => {
        this.hosos = res.itemList;
        this.pageSize = 5;
        this.page = 1;
        this.totalRecords = res.totalRows;
      })
  }
  openDialog(id?: number) {

    if (id) {
      this.hosoPopupService
        .open(HoSoDialogComponent as Component, id);

    } else {
      this.hosoPopupService
        .open(HoSoDialogComponent as Component);
    }

  }

  openDialogToAddHoSo(gearBoxID?: number) {

    if (gearBoxID != undefined && gearBoxID != null) {
      this.hosoPopupService
        .open(HoSoDialogComponent as Component, 0, gearBoxID);

    } else {
      this.hosoPopupService
        .open(HoSoDialogComponent as Component, 0);
    }

  }

  openDeleteDialog(id?: number) {
    if (id != undefined) {
      this.hosoPopupService
      .open(HoSoDeleteComponent as Component, id);
        
    } else {
      this.hosoPopupService
      .open(HoSoDeleteComponent as Component);
    }
  }

  ngOnDestroy(): void {

  }
}
