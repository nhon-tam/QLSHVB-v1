import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyNguoiDungRoutingModule } from './quan-ly-nguoi-dung-routing.module';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung.component';
import { NguoiDungDialogComponent } from './nguoi-dung-dialog/nguoi-dung-dialog.component';
import { NguoiDungDetailComponent } from './nguoi-dung-detail/nguoi-dung-detail.component';
import { NguoiDungDeleteComponent } from './nguoi-dung-delete/nguoi-dung-delete.component';
import { QuanLyNguoiDungPopupService } from './quan-ly-nguoi-dung-popup.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Select2Module } from 'ng-select2-component';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    QuanLyNguoiDungComponent,
    NguoiDungDialogComponent,
    NguoiDungDetailComponent,
    NguoiDungDeleteComponent,
  ],
  entryComponents: [
    QuanLyNguoiDungComponent,
    NguoiDungDeleteComponent,
    NguoiDungDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyNguoiDungRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    Select2Module,
    NgSelect2Module,
    NgxSpinnerModule
  ],
  providers:[
    QuanLyNguoiDungPopupService,
  ]
})
export class QuanLyNguoiDungModule { }
