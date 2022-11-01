import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { CoQuan, coquans } from '../../../model/co-quan.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { QuanLyCoQuanService } from '../quan-ly-co-quan-service.service';
import { Select2Data } from 'ng-select2-component';
import { QuanLyCoQuanComponent } from '../quan-ly-co-quan.component';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganType } from '../../../model/organ-type.model';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ToastrService } from 'ngx-toastr';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-co-quan-dialog',
  templateUrl: './co-quan-dialog.component.html',
  styleUrls: ['./co-quan-dialog.component.css']
})

export class CoQuanDialogComponent implements OnInit, OnDestroy {

  coQuan : CoQuan = new CoQuan();
  value1 = 'Default';
  isEdit : boolean = false;
  defaultValue : string;
  data: any;
  provinceId: number;
  districtId: number;
  wardId: number;
//  organTypeList: Select2Data;

  organTypeList: Array<Select2OptionData>;
  options: Options;
  provinceList: Array<Select2OptionData>;

  enaDistrict: boolean = true;
  districtList: Array<Select2OptionData>;

  enaWard: boolean = true;
  wardList: Array<Select2OptionData>;
  form: FormGroup;
  submitted = false;
  loading = false;
  url : string = window.location.href;

  constructor(
    public activeModal: NgbActiveModal,
    public coQuanPopupService: QuanLyCoQuanPopupService,
    public service: QuanLyCoQuanService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    @Inject(DOCUMENT) private _document: Document
  ) {
    //  this.organTypeList = new Array<OrganType>();
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
    }
   }

  ngOnInit() {
    // init form component
    this.form = this.formBuilder.group({
      organCode: ['', Validators.required],
      tenCoQuan: ['', Validators.required],
      loaiCoQuanID: [''],
      tinhID: ['', Validators.required],
      huyenID: ['', Validators.required],
      xaPhuongID: [''],
      description: [''],
      notes: [''],
      addressDetail: ['']
    });

    this.isEdit = false;
    this.service.getListOrganType()
      .subscribe((result) => {
        if (result != undefined) {
          var lstOrganType = [];
          for (var item of result) {
            var temp = { id: item.organTypeID, text: item.organTypeName };
            lstOrganType.push(temp);
          }
          this.organTypeList = lstOrganType;
        }
      },
      (error) => {
      }, () => {
      });
    
    this.service.getListProvince()
      .subscribe((result) => {
        var lstProvinces = [];
        for (const item of result) {
          var temp = { id: item.provincialID, text: item.provincialName }
          lstProvinces.push(temp);
        }
        this.provinceList = lstProvinces;
      },
      (error) => {
        setTimeout(() => {
          alert("Lấy dữ liệu về tỉnh/thành phố thất bại. Lỗi: " + JSON.stringify(error));
        }, 1000);
      },
      () => {
        
      });

    // edit
    if(this.coQuanPopupService.result.item != undefined) {
      this.coQuan = this.coQuanPopupService.result.item;
      this.provinceId = this.coQuan.tinhID;
      this.districtId = this.coQuan.huyenID;
      this.wardId = this.coQuan.wardId;
      this.isEdit = true
      this.enaDistrict = false;
      this.enaWard = false;
    }

  }

  get f() {
    return this.form.controls;
  }

  update1(value: string) {

  }
  save() {
    this.submitted = true;
    if (this.form.invalid) { return; }

    this.loading = true;

    if (this.isEdit) {
      this.service.updateCoQuan(this.coQuan)
        .subscribe((result) => {
          if (result.isSuccess) {
            this.clear();
            this.onSaveSuccess("Chỉnh sửa thành công");
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
        this.service.insertNewCoQuan(this.coQuan)
        .subscribe((result) => {
          if (result.isSuccess) {
            this.toastr.success("Thêm mới thành công");
            this.clear();
            this.onClose();
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

  getDistrictByProvinceId(value : any) {
    if (value != "" && value != undefined) {
      if (value != this.provinceId)
      {
        this.coQuan.huyenID = undefined;
      }
      this.service.getDistrictByProvinceId(value)
      .subscribe((districs) => {
        if (districs != undefined) {
            var lstDistricts = [];
            for (const item of districs) {
              var temp = { id: item.districtID, text: item.districtName }
              lstDistricts.push(temp);
            }
            this.districtList = lstDistricts;
            this.enaWard = true;
        }
      },
      (error) => {
        console.log(error);
        alert("Lấy dữ liệu danh sách huyện thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
        this.enaDistrict = false;
      });
      
    }
    else {
      return;
    }
  }

  getWardByDistrictId(value : any) {
    if (value != null) {
        if (this.districtId != undefined) {
          if (this.coQuan.tinhID != this.provinceId && value == this.districtId) {
            this.getWardByProvinceId(this.coQuan.tinhID);
          }
          else {
            this.getWardByDistrictIdSer(value);
          }
        }
        else {
          //
          this.getWardByDistrictIdSer(value);
        }
        
    }
    else {
      this.getWardByProvinceId(this.coQuan.tinhID);
    }
  }

  getWardByProvinceId(id: number) {
    this.service.getWardByProvinceId(id)
            .subscribe((wards) => {
              if (wards != undefined) {
                var lstWards = [];
                for (const item of wards) {
                  var temp = { id: item.wardsID, text: item.wardsName };
                  lstWards.push(temp);
                }
                this.wardList = lstWards;
              }
          }, (error) => {
            alert("Lấy dữ liệu danh sách xã thất bại. Lỗi: " + JSON.stringify(error));
          },
          () => {
            this.enaWard = false;
          });
  }

  getWardByDistrictIdSer(id : number) {
    this.service.getWardByDistrictId(id.toString())
            .subscribe((wards) => {
                if (wards != undefined) {
                  var lstWards = [];
                  for (const item of wards) {
                    var temp = { id: item.wardsID, text: item.wardsName };
                    lstWards.push(temp);
                  }
                  this.wardList = lstWards;
                }
            }, (error) => {
              alert("Lấy dữ liệu danh sách xã thất bại. Lỗi: " + JSON.stringify(error));
            },
            () => {
              this.enaWard = false;
            });
  }
 
  clear() {
    this.activeModal.dismiss('cancel');
  }

  onSaveSuccess(message: string) {
    this.toastr.success(message);
  }

  onSaveError(message){
    this.toastr.error(message);
  }

  onClose(){
    this.service.filter('Register click');
  }
  ngOnDestroy(): void {
    
  }

  refreshPage() {
    this._document.defaultView.location.reload();
  }
}
