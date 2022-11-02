import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BaseCondition } from '../../../common';
import { LoaiVanBan } from '../../../model/loai-van-ban';
import { LoaiVanBanService } from '../loai-van-ban.service';
import { QuanLyLoaiVanBanPopupService } from '../quan-ly-loai-van-ban-popup.service';

@Component({
  selector: 'app-loai-van-ban-dialog',
  templateUrl: './loai-van-ban-dialog.component.html',
  styleUrls: ['./loai-van-ban-dialog.component.css']
})
export class LoaiVanBanDialogComponent  implements OnInit, OnDestroy{

  loaiVanBan: LoaiVanBan = new LoaiVanBan();
  page = 1;
  condition: BaseCondition<LoaiVanBan> = new BaseCondition<LoaiVanBan>();
  pageSize: number;
  totalRecords: number;
  loaiVanBans: LoaiVanBan[];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private service: LoaiVanBanService,
    private authenticationService: AuthenticationService,
    public popupService: QuanLyLoaiVanBanPopupService,
    private toast: ToastrService,
  ) {
      
   }

  ngOnInit() {
      this.edit = false;
      if(this.popupService.result.item != undefined){
        this.loaiVanBan = this.popupService.result.item;
        this.edit = true;
      }
  }

  public get f() {
    return this.formGroup.value;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  save() {
    if (this.edit) {
      this.service.updateLoaiVanBan(this.loaiVanBan)
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
        this.service.insertNewLoaiVanBan(this.loaiVanBan)
        .subscribe((result) => {
          if (result.isSuccess) {
            this.toast.success("Thêm mới thành công");
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

  onChangeCreateRole(value: boolean) {
    // this.userGroup.userrole.create = value;
    if (value == true) {
      this.edit = true;
    }
    else {
      this.edit = false;
    }
  }

  onChangeEditRole(value : boolean) {
    // this.user.userrole.edit = value;
    if(value == true) {
      this.create = true;
    }
    else {
      this.create = false;
    }
  }
  onSaveSuccess(message: string) {
    this.toast.success(message);
  }

  onSaveError(message: string){
    this.toast.error(message);
  }

  onClose(){
    this.service.filter('Register click');
  }
  
  ngOnDestroy(): void {
  }
}
