import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { QuanLyHopSoPopupService } from '../quan-ly-hop-so-popup.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { CoQuan, organSelect2 } from '../../../model/co-quan.model';
import { Phong, fontSelect2 } from '../../../model/phong.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { danhMucSelect2 } from '../../../model/danh-muc.model';
import { QuanLyCoQuanService } from '../../quan-ly-co-quan/quan-ly-co-quan-service.service';
import { QuanLyPhongService } from '../../quan-ly-phong/quan-ly-phong.service';

@Component({
  selector: 'app-hop-so-dialog',
  templateUrl: './hop-so-dialog.component.html',
  styleUrls: ['./hop-so-dialog.component.css']
})
export class HopSoDialogComponent implements OnInit {
  isEdit: boolean = false;
  defaultValue : string;
  fontNumber: string;
  organCode: string;
  data: any;
  lstOrgan: organSelect2[];
  lstFont: fontSelect2[];
  lstDanhMuc: danhMucSelect2[];
  options: Options;
  optionsOrgan :Options;
  hopso: HopSo;
  organ: CoQuan;
  phong: Phong;
  form: FormGroup;
  submitted = false;
  loading = false;
  organID: any;
  fontID: any;
  
   constructor(
    public activeModal: NgbActiveModal,
    private hopSoPopupService: QuanLyHopSoPopupService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private hopsoService: QuanLyHopSoService,
    private danhmucService: QuanLyDanhMucService,
    private organService: QuanLyCoQuanService,
    private fontService: QuanLyPhongService,
    private formBuilder: FormBuilder)
    {
      this.hopso = new HopSo();
      this.organ = new CoQuan();
      this.phong = new Phong();
      this.options = {
        multiple: false,
        theme: 'classic',
        closeOnSelect: true,
        width: "100%"
      }
    }

  ngOnInit() {
    this.organCode = "";
    this.fontNumber = "";
    this.form = this.formBuilder.group({
      organID: ['', Validators.required],
      fontID: ['', Validators.required],
      tabOfContID: ['', Validators.required],
      gearBoxCode: ['', Validators.required],
      gearBoxTitle: [''],
      note: ['']
    })

    // this.hopso = this.hopSoPopupService.getHopSoById()
    this.isEdit = false;
    if(this.hopSoPopupService.result.item != undefined){
      this.hopso = this.hopSoPopupService.result.item;
      this.isEdit = true;
    }
    else if(this.hopSoPopupService.tableOfContID != 0){
      this.hopso.tabOfContID = this.hopSoPopupService.tableOfContID;
      this.getDanhMucById(this.hopso.tabOfContID);
    }
    this.loadData();
  }

  getDanhMucById(tabOfContID : number){
    if(tabOfContID != undefined && tabOfContID != null && tabOfContID.toString() != ""){
      this.danhmucService.getDanhMucById(tabOfContID)
      .subscribe((res=>{
          if(res != undefined && res != null && res.item != undefined){
            this.hopso.fontID = res.item.fontID != undefined ? res.item.fontID : null;
            this.hopso.organID = res.item.organID != undefined ? res.item.organID : null;
          }
      }));
    }
  }

  getOrganCodeByOrganId(organID: number) {
    if(organID != undefined && organID != null && organID.toString() != ""){
      this.organCode = "";
      this.fontNumber = "";
      this.organService.getCoQuanById(organID)
      .subscribe((res=>{
          if(res != undefined && res != null && res.item != undefined){
            this.organCode = res.item.organCode != undefined ? res.item.organCode : "";
          }
      }));
    }
  }
   
  getFontNumberByFontID(fontID: number) {
    if(fontID != undefined && fontID != null && fontID.toString() != ""){
      this.fontNumber = "";
      this.fontService.getPhongById(fontID)
      .subscribe((res=>{
          if(res != undefined && res != null && res.item != undefined){
            this.fontNumber = res.item.fontNumber != undefined ? res.item.fontNumber : "";
          }
      }));
    }
  }

  get f() {
    return this.form.controls;
  }

  onOrganChange(organID : any){
    var params = organID;
    if(params == undefined || params == null || params == "")
      params  = this.organID;
    else{
      if(params != this.hopso.organID){
        this.hopso.fontID = null;
        this.hopso.tabOfContID = null;
      }
      this.getOrganCodeByOrganId(params);
      this.hopsoService.getFontsByOrganIDSelect2(params)
      .subscribe((data) => {
        if (data != undefined && data.length != 0) {
            this.lstFont = data;
            if(this.lstFont != null){
              this.fontID = this.lstFont[0].id;
            }
            else 
              this.fontID = 0;
        }
        else{
          this.lstFont = [];
          this.lstDanhMuc = [];
        }
      },
      (error) => {
        this.lstFont = [];
        this.lstDanhMuc = [];
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  }
  onFontChange(fontID : any){
    var params = fontID;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else{
      if(params != this.hopso.fontID){
        this.hopso.tabOfContID = null;
      }
      this.getFontNumberByFontID(params);
      this.hopsoService.getTabByFontIDSelect2(params)
      .subscribe((data) => {
        if (data != undefined && data.length !=0) {
          this.lstDanhMuc = data;
        }
        else{
          this.lstDanhMuc = [];
        }
      },
      (error) => {
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  }
  loadData() {
    this.lstDanhMuc =[];
    this.lstFont= [];
    this.lstOrgan= [];
    this.danhmucService.GetAllOrganSelect2()
    .subscribe((result) => {
      if (result != undefined) {
        this.lstOrgan = result;
        if(this.lstOrgan != null){
          this.organID = this.lstOrgan[0].id;
        }
        else 
          this.organID = 0;
      }
    },
    (error) => {
    }, () => {
    });
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }

  save() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.loading = true;

    if(this.hopso.tabOfContID == 0 || this.hopso.tabOfContID == undefined){
      this.onSaveError("Nhập đầy đủ thông tin!!!");
    }
    else{

      if (this.isEdit) {
        this.hopsoService.updateHopSo(this.hopso)
          .subscribe((result) => {
            this.loadData();
            if (result.isSuccess) {
              this.clear();
              this.onSaveSuccess("Chỉnh sửa thành công");
            }
            else {
              if(result.errorCode === '1'){
                this.clear();
                this.onSaveWarning("Hộp số đã tồn tại trên hệ thống, vui lòng thử lại.");
              }
              else{
                this.onSaveError("Chỉnh sửa thất bại, vui lòng thử lại.");
              }
            }
          },
          (error)=> {
            // this.onSaveError();
            this.onSaveError("Chỉnh sửa thất bại, vui lòng thử lại.");
          },
          () => {
            this.onClose();
          });
      }
      else {
          this.hopsoService.insertNewHopSo(this.hopso)
          .subscribe((result) => {
            this.loadData();
            if (result.isSuccess) {
              if(result.errorCode == '1'){
                this.toastr.warning("Hộp số đã tồn tại trên hệ thống, vui lòng thử lại.");
                this.clear();
                this.onClose();
              }
              else{
                this.toastr.success("Thêm mới thành công");
                this.clear();
                this.onClose();
              }
            }
            else {
              this.onSaveError("Thêm mới thất bại, vui lòng thử lại");
            }
          },
          (error) => {
            this.onSaveError("Thêm mới thất bại, vui lòng thử lại");
          }, () => {
            // this.activeModal.dismiss("Create new successfully");
          });
      }
    }
  }
  onSaveSuccess(message: string) {
    this.toastr.success(message);
  }

  onSaveWarning(message: string) {
    this.toastr.warning(message);
  }

  onSaveError(message: string){
    this.toastr.error(message);
  }

  onClose(){
    this.hopsoService.filter('Register click');
  }

  deleteFont(event) {
  }
  
  ngOnDestroy(): void {
  }
}
