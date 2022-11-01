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
import { QuanLyTinhTrangVatLyPopupService } from './quan-ly-tt-vat-ly-popup.service';
import { QuanLyTinhTrangVatLyRoutingModule } from './quan-ly-tt-vat-ly-routing.module';
import { QuanLyTinhTrangVatLyComponent } from './quan-ly-tt-vat-ly.component';
import { TinhTrangVatLyDialogComponent } from './tt-vat-ly-dialog/tt-vat-ly-dialog.component';
import { TinhTrangVatLyDeleteComponent } from './tt-vat-ly-delete/tt-vat-ly-delete.component';
@NgModule({
  declarations: [
    QuanLyTinhTrangVatLyComponent,
    TinhTrangVatLyDialogComponent,
    TinhTrangVatLyDeleteComponent
  ],
  entryComponents: [
    QuanLyTinhTrangVatLyComponent,
    TinhTrangVatLyDeleteComponent,
    TinhTrangVatLyDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyTinhTrangVatLyRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    Select2Module,
    NgSelect2Module
  ],
  providers:[
    QuanLyTinhTrangVatLyPopupService
  ]
})
export class QuanLyTinhTrangVatLyModule { }
