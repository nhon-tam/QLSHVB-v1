import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Select2Module } from 'ng-select2-component';
import { NgSelect2Module } from 'ng-select2';
import { QuanLyMucDoTinCayRoutingModule } from './muc-do-tin-cay-routing.module';
import { QuanLyMucDoTinCayPopupService } from './muc-do-tin-cay-popup.service';
import { QuanLyMucDoTinCayComponent } from './muc-do-tin-cay.component';
import { MucDoTinCayDialogComponent } from './muc-do-tin-cay-dialog/muc-do-tin-cay-dialog.component';
import { MucDoTinCayDeleteComponent } from './muc-do-tin-cay-delete/muc-do-tin-cay-delete.component';
@NgModule({
  declarations: [
    QuanLyMucDoTinCayComponent,
    MucDoTinCayDialogComponent,
    MucDoTinCayDeleteComponent
  ],
  entryComponents: [
    QuanLyMucDoTinCayComponent,
    MucDoTinCayDeleteComponent,
    MucDoTinCayDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyMucDoTinCayRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    Select2Module,
    NgSelect2Module
  ],
  providers:[
    QuanLyMucDoTinCayPopupService
  ]
})
export class QuanLyMucDoTinCayModule { }
