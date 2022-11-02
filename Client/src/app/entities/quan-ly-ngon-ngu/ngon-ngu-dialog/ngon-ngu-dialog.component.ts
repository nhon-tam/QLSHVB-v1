import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { BaseCondition } from '../../../common';
import { NgonNgu } from '../../../model/ngon-ngu';
import { NgonNguService } from '../ngon-ngu.service';
import { QuanLyNgonNguPopupService } from '../quan-ly-ngon-ngu-popup.service';
@Component({
  selector: 'app-ngon-ngu-dialog',
  templateUrl: './ngon-ngu-dialog.component.html',
  styleUrls: ['./ngon-ngu-dialog.component.css']
})
export class NgonNguDialogComponent  implements OnInit, OnDestroy{

  ngonNgu: NgonNgu = new NgonNgu();
  page = 1;
  condition: BaseCondition<NgonNgu> = new BaseCondition<NgonNgu>();
  pageSize: number;
  totalRecords: number;
  ngonNgus: NgonNgu[];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private service: NgonNguService,
    private authenticationService: AuthenticationService,
    public popupService: QuanLyNgonNguPopupService,
    private toast: ToastrService,
  ) {
      
   }

  ngOnInit() {
      this.edit = false;
      if(this.popupService.result.item != undefined){
        this.ngonNgu = this.popupService.result.item;
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
      this.service.updateNgonNgu(this.ngonNgu)
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
        this.service.insertNewNgonNgu(this.ngonNgu)
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
    this.toast.success(message);
  }

  onClose(){
    this.service.filter('Register click');
    this.activeModal.close();
  }
  ngOnDestroy(): void {
  }
}
