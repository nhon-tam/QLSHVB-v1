import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BaseCondition } from '../../../common';
import { TinhTrangVatLy } from '../../../model/tinh-trang-vat-ly';
import { TinhTrangVatLyService } from '../tt-vat-ly.service';
import { QuanLyTinhTrangVatLyPopupService } from '../quan-ly-tt-vat-ly-popup.service';
@Component({
  selector: 'app-tt-vat-ly-dialog',
  templateUrl: './tt-vat-ly-dialog.component.html',
  styleUrls: ['./tt-vat-ly-dialog.component.css']
})
export class TinhTrangVatLyDialogComponent  implements OnInit, OnDestroy{

  tinhTrangVatLy: TinhTrangVatLy = new TinhTrangVatLy();
  page = 1;
  condition: BaseCondition<TinhTrangVatLy> = new BaseCondition<TinhTrangVatLy>();
  pageSize: number;
  totalRecords: number;
  tinhTrangVatLys: TinhTrangVatLy[];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private service: TinhTrangVatLyService,
    private authenticationService: AuthenticationService,
    public popupService: QuanLyTinhTrangVatLyPopupService,
    private toast: ToastrService,
  ) {
      
   }

  ngOnInit() {
      this.edit = false;
      if(this.popupService.result.item != undefined){
        this.tinhTrangVatLy = this.popupService.result.item;
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
      this.service.updateTinhTrangVatLy(this.tinhTrangVatLy)
        .subscribe((result) => {
        },
        (error)=> {
          
          // this.onSaveError();
        },
        () => {
          // do something
          // this.activeModal.dismiss("Update successfully.");
          this.onSaveSuccess("Chỉnh sửa thành công");

        });
    }
    else {
        this.service.insertNewTinhTrangVatLy(this.tinhTrangVatLy)
        .subscribe((result) => {
        },
        (error) => {
        }, () => {
          this.onSaveSuccess("Thêm mới thành công");
          // this.activeModal.dismiss("Create new successfully");
        });
    }
    this.onClose();
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

  onSaveError(message){
    this.toast.error(message);
  }

  onClose(){
    this.service.filter('Register click');
    this.activeModal.close();
  }
  ngOnDestroy(): void {
  }
}
