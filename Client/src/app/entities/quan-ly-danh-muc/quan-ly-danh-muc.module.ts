import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { danhMucPopupRoute } from './quan-ly-danh-muc-routing.module';
import { QuanLyDanhMucComponent } from './quan-ly-danh-muc.component';
import { DanhMucDialogComponent } from './danh-muc-dialog/danh-muc-dialog.component';
import { DanhMucDetailComponent } from './danh-muc-detail/danh-muc-detail.component';
import { DanhMucDeleteComponent } from './danh-muc-delete/danh-muc-delete.component';
import { QuanLyDanhMucPopupService } from './quan-ly-danh-muc-popup.service';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';
import { RouterModule } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal';
import { QuanLyDanhMucRoutingModule } from './quan-ly-danh-muc-routing.module';
import { NgxSpinnerModule } from 'ngx-spinner';

const ENTITY_STATES = [
  ...danhMucPopupRoute,
];
@NgModule({
  declarations: [
    QuanLyDanhMucComponent,
    DanhMucDialogComponent,
    DanhMucDetailComponent,
    DanhMucDeleteComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    QuanLyDanhMucRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ModalModule.forRoot(),
    RouterModule.forChild(ENTITY_STATES),
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    Select2Module,
    HttpClientModule,
    NgSelect2Module,
    NgxSpinnerModule
    
  ],
  entryComponents:[
    QuanLyDanhMucComponent,
    DanhMucDialogComponent,
    DanhMucDeleteComponent
  ],
  providers:[
    QuanLyDanhMucPopupService,
    NgbActiveModal
  ]
})
export class QuanLyDanhMucModule { }
