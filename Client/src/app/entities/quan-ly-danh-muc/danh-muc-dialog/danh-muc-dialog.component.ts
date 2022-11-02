import { Component, OnInit } from '@angular/core';
import { DanhMuc } from '../../../model/danh-muc.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyDanhMucPopupService } from '../quan-ly-danh-muc-popup.service';
import { QuanLyDanhMucService } from '../quan-ly-danh-muc.service';
import { Phong } from '../../../model/phong.model';
import { Select2OptionData } from 'ng-select2';
import { Subscription } from 'rxjs';
import { Options } from 'select2';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { QuanLyPhongService } from '../../quan-ly-phong/quan-ly-phong.service';

@Component({
  selector: 'app-danh-muc-dialog',
  templateUrl: './danh-muc-dialog.component.html',
  styleUrls: ['./danh-muc-dialog.component.css']
})
export class DanhMucDialogComponent implements OnInit {
  danhmuc: DanhMuc;
  phongs: Phong[];
  fontNumber: string;
  isEdit: boolean = false;
  defaultValue : string;
  data: any;
  lstOrgan: Array<Select2OptionData>;
  lstFont: Array<Select2OptionData>;
  options: Options;
  optionsOrgan :Options;
  form: FormGroup;
  submitted = false;
  loading = false;
  
  
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private danhMucPopupService: QuanLyDanhMucPopupService,public activeModal: NgbActiveModal,
    public service: QuanLyDanhMucService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private fontService: QuanLyPhongService,
    private formBuilder: FormBuilder)
    {
      this.danhmuc = new DanhMuc();
      this.options = {
        multiple: false,
        theme: 'classic',
        closeOnSelect: true,
        width: "100%"
      }
    }

  ngOnInit() {
    this.fontNumber = "";
    this.form = this.formBuilder.group({
      tabOfContName: [''],
      tabOfContNumber: ['', Validators.required],
      fontID: ['', Validators.required],
      note: ['']
    });

    this.isEdit = false;
    this.service.getAllPhong()
      .subscribe((result) => {
        if (result != undefined) {
          var phongs = [];
          for (var item of result.itemList) {
            var temp = { id: item.fontID, text: item.fontName };
            phongs.push(temp);
          }
          this.lstFont = phongs;
        }
      },
      (error) => {
      }, () => {
      });
      if(this.danhMucPopupService.result.item != undefined){
        this.danhmuc = this.danhMucPopupService.result.item;
        this.isEdit = true;
      }
      else if(this.danhMucPopupService.fontID != 0){
        this.danhmuc.fontID = this.danhMucPopupService.fontID;
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

  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.loading = true;

    if(this.danhmuc.fontID == undefined || this.danhmuc.fontID == null || this.danhmuc.fontID==0){
      this.onSaveError("Chọn phông lữu trữ!!!");
    }else{
      if (this.isEdit) {
        this.service.updateDanhMuc(this.danhmuc)
          .subscribe((result) => {
            if (result.isSuccess) {
              if(result.errorCode === '0'){
                this.clear();
                this.onSaveSuccess("Chỉnh sửa thành công");
              }
              else{
                this.toastr.warning("Đã tồn tại Mục lục số , xin mời nhập lại");
              }
            }
            else {
              this.onSaveError("Chỉnh sửa thất bại, vui lòng thử lại.");
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
          this.service.insertNewDanhMuc(this.danhmuc)
          .subscribe((result) => {
            if (result.isSuccess) {
              if(result.errorCode === '0'){
                this.toastr.success("Thêm mới thành công");
                this.clear();
                this.onClose();
              }
              else{
                this.toastr.warning("Đã tồn tại Mục lục số , xin mời nhập lại");
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

  onSaveError(message: string){
    this.toastr.error(message);
  }

  onClose(){
    this.service.filter('Register click');
  }
  deleteFont(event) {
  }
  ngOnDestroy(): void {
  }

}
