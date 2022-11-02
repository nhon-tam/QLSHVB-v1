import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { User } from '../../../model/user.model';
import { UserService } from '../user.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { UserGroupService } from '../../quan-ly-nhom-nguoi-dung/user-group.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { QuanLyNguoiDungPopupService } from '../quan-ly-nguoi-dung-popup.service';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-nguoi-dung-dialog',
  templateUrl: './nguoi-dung-dialog.component.html',
  styleUrls: ['./nguoi-dung-dialog.component.css']
})
export class NguoiDungDialogComponent implements OnInit {
  user: User = new User();
  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;
  lstRole: Array<Select2OptionData>;
  optionTypes: Options;
  form: FormGroup;
  submitted = false;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder,
    private userService: UserService,
    private userGroupService: UserGroupService,
    private popupService: QuanLyNguoiDungPopupService,
    private authenticationService: AuthenticationService,
    private toast: ToastrService,private formBuilder: FormBuilder
  ) {
    this.optionTypes = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
    }
   }

  ngOnInit() {
    // this.filteredOptions = this.myControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value))
    // );
    this.user.roles = "1";
    this.user.status = 0;
    this.edit = false;
    this.userGroupService.getAllRole()
      .subscribe((result) => {
        if (result != undefined) {
          var organs = [];
          for (var item of result.itemList) {
            var temp = { id: item.roleID, text: item.roleName };
            organs.push(temp);
          }
          this.lstRole = organs;
        }
      },
      (error) => {
      }, () => {
      });
      if(this.popupService.result.item != undefined){
        this.user = this.popupService.result.item;
        this.edit = true;
        this.form = this.formBuilder.group({
          userName: ['', [Validators.required, Validators.minLength(5)]],
          passwordNew: ['',Validators.minLength(6)],
          confirmPassword: ['',Validators.minLength(6)],
          roleID: ['', Validators.required],
          status: [''],
        },
        {
          validator: this.MustMatch('passwordNew', 'confirmPassword')
        });
      }
      else{
        this.form = this.formBuilder.group({
          userName: ['', [Validators.required, Validators.minLength(5)]],
          passwordNew: ['',[Validators.required, Validators.minLength(6)]],
          confirmPassword: ['',[Validators.required, Validators.minLength(6)]],
          roleID: ['', Validators.required],
          status: [''],
        },
        {
          validator: this.MustMatch('passwordNew', 'confirmPassword')
        });
      }
    this.user.createBy = JSON.parse(localStorage.getItem('currentUser')).userName;
  }

  get f() {
    return this.form.controls;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  save(){
    this.submitted = true;
    if (this.form.invalid) { return; }
    if(this.user.confirmPassword != this.user.passwordNew){
      this.onSaveWarning("Mật khẩu phải được trùng khớp.");
    }
    else{
      if (this.edit) {
          this.userService.updateUser(this.user)
          .subscribe((result) => {
            // this.loadData();
            if (result.errorCode == '0') {
              this.clear();
              this.onSaveSuccess("Chỉnh sửa thành công");
            }
            else if(result.errorCode == '1'){
              this.onSaveWarning(result.errorMessage);
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
          this.userService.insertNewUser(this.user)
          .subscribe((result) => {
            // this.loadData();
            if (result.errorCode == '0') {
              this.toast.success("Thêm mới thành công");
              this.clear();
              this.onClose();
            }
            else if(result.errorCode == '1'){
              this.onSaveWarning(result.errorMessage);
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

  // onChangeCreateRole(value: boolean) {
  //   this.user.userrole.create = value;
  //   if (value == true) {
  //     this.edit = true;
  //   }
  //   else {
  //     this.edit = false;
  //   }
  // }

  // onChangeEditRole(value : boolean) {
  //   this.user.userrole.edit = value;
  //   if(value == true) {
  //     this.create = true;
  //   }
  //   else {
  //     this.create = false;
  //   }
  // }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if(control.value == null || control.value == undefined){
          if(matchingControl.value == null || matchingControl.value == undefined){
              matchingControl.setErrors(null);
              return;
          }
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

  onSaveSuccess(message: string) {
    this.toast.success(message);
  }

  onSaveError(message: string){
    this.toast.error(message);
  }

  onSaveWarning(message: string){
    this.toast.warning(message);
  }


  onClose() {
    this.userService.filter('Register click');
  }
}
