import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { OrganTypeService } from '../loai-co-quan.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { QuanLyOrganTypePopupService } from '../quan-ly-loai-co-quan-popup.service';
import { BaseCondition } from '../../../common';
import { OrganType } from '../../../model/organ-type.model';

@Component({
  selector: 'app-loai-co-quan-dialog',
  templateUrl: './loai-co-quan-dialog.component.html',
  styleUrls: ['./loai-co-quan-dialog.component.css']
})
export class OrganTypeDialogComponent  implements OnInit, OnDestroy{

  organType: OrganType = new OrganType();
  page = 1;
  condition: BaseCondition<OrganType> = new BaseCondition<OrganType>();
  pageSize: number;
  totalRecords: number;
  organTypes: OrganType[];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private service: OrganTypeService,
    private authenticationService: AuthenticationService,
    public popupService: QuanLyOrganTypePopupService,
    private toast: ToastrService,
  ) {
      
   }

  ngOnInit() {
      this.edit = false;
      if(this.popupService.result.item != undefined){
        this.organType = this.popupService.result.item;
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
      this.service.updateOrganType(this.organType)
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
        this.service.insertNewOrganType(this.organType)
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
