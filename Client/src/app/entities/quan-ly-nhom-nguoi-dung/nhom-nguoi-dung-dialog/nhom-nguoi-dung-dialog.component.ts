import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { User } from '../../../model/user.model';
import { UserGroupService } from '../user-group.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UserGroup } from '../../../model/user-group.model';
import { QuanLyNhomNguoiDungPopupService } from '../quan-ly-nhom-nguoi-dung-popup.service';
import { BaseCondition } from '../../../common';

@Component({
  selector: 'app-nhom-nguoi-dung-dialog',
  templateUrl: './nhom-nguoi-dung-dialog.component.html',
  styleUrls: ['./nhom-nguoi-dung-dialog.component.css']
})
export class NhomNguoiDungDialogComponent  implements OnInit, OnDestroy{

  userGroup: UserGroup = new UserGroup();
  page = 1;
  condition: BaseCondition<UserGroup> = new BaseCondition<UserGroup>();
  pageSize: number;
  totalRecords: number;
  userGroups: UserGroup[];
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private userGroupService: UserGroupService,
    private authenticationService: AuthenticationService,
    public userGroupPopupService: QuanLyNhomNguoiDungPopupService,
    private toast: ToastrService,
  ) {
      
   }

  ngOnInit() {
      this.edit = false;
      if(this.userGroupPopupService.result.item != undefined){
        this.userGroup = this.userGroupPopupService.result.item;
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
      this.userGroupService.updateUserGroup(this.userGroup)
        .subscribe((result) => {
        },
        (error)=> {
          
        },
        () => {
          this.onSaveSuccess("Chỉnh sửa thành công");

        });
    }
    else {
        this.userGroupService.insertNewUserGroup(this.userGroup)
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
    this.userGroupService.filter('Register click');
    this.activeModal.close();
  }
  ngOnDestroy(): void {
  }
}
