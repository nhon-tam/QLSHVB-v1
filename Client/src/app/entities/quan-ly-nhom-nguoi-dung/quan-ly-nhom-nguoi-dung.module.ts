import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyNhomNguoiDungRoutingModule } from './quan-ly-nhom-nguoi-dung-routing.module';
import { QuanLyNhomNguoiDungComponent } from './quan-ly-nhom-nguoi-dung.component';
import { NhomNguoiDungDialogComponent } from './nhom-nguoi-dung-dialog/nhom-nguoi-dung-dialog.component';
import { NhomNguoiDungDetailComponent } from './nhom-nguoi-dung-detail/nhom-nguoi-dung-detail.component';
import { NhomNguoiDungDeleteComponent } from './nhom-nguoi-dung-delete/nhom-nguoi-dung-delete.component';
import { QuanLyNhomNguoiDungPopupService } from './quan-ly-nhom-nguoi-dung-popup.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Select2Module } from 'ng-select2-component';
import { NgSelect2Module } from 'ng-select2';

@NgModule({
  declarations: [
    QuanLyNhomNguoiDungComponent,
    NhomNguoiDungDialogComponent,
    NhomNguoiDungDetailComponent,
    NhomNguoiDungDeleteComponent,
  ],
  entryComponents: [
    QuanLyNhomNguoiDungComponent,
    NhomNguoiDungDeleteComponent,
    NhomNguoiDungDialogComponent,
    NhomNguoiDungDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyNhomNguoiDungRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    Select2Module,
    NgSelect2Module
  ],
  providers:[
    QuanLyNhomNguoiDungPopupService
  ]
})
export class QuanLyNhomNguoiDungModule { }
