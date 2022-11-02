import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BaseCondition } from '../../../common';
import { MucDoTinCay } from '../../../model/muc-do-tin-cay';
import { MucDoTinCayService } from '../muc-do-tin-cay.service';
import { QuanLyMucDoTinCayPopupService } from '../muc-do-tin-cay-popup.service';


@Component({
  selector: 'app-muc-do-tin-cay-dialog',
  templateUrl: './muc-do-tin-cay-dialog.component.html',
  styleUrls: ['./muc-do-tin-cay-dialog.component.css']
})
export class MucDoTinCayDialogComponent  implements OnInit, OnDestroy{

  mucDoTinCay: MucDoTinCay = new MucDoTinCay();
  page = 1;
  condition: BaseCondition<MucDoTinCay> = new BaseCondition<MucDoTinCay>();
  pageSize: number;
  totalRecords: number;
  mucDoTinCays: MucDoTinCay[];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private service: MucDoTinCayService,
    private authenticationService: AuthenticationService,
    public popupService: QuanLyMucDoTinCayPopupService,
    private toast: ToastrService,
  ) {
      
   }

  ngOnInit() {
      this.edit = false;
      if(this.popupService.result.item != undefined){
        this.mucDoTinCay = this.popupService.result.item;
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
      this.service.updateMucDoTinCay(this.mucDoTinCay)
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
        this.service.insertNewMucDoTinCay(this.mucDoTinCay)
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
