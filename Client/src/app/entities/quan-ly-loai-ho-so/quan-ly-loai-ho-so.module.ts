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
import { QuanLyLoaiHoSoPopupService } from './quan-ly-loai-ho-so-popup.service';
import { QuanLyLoaiHoSoComponent } from './quan-ly-loai-ho-so.component';
import { LoaiHoSoDialogComponent } from './loai-ho-so-dialog/loai-ho-so-dialog.component';
import { LoaiHoSoDeleteComponent } from './loai-ho-so-delete/loai-ho-so-delete.component';
import { QuanLyLoaiHoSoRoutingModule } from './quan-ly-loai-ho-so-routing.module';
@NgModule({
  declarations: [
    QuanLyLoaiHoSoComponent,
    LoaiHoSoDialogComponent,
    LoaiHoSoDeleteComponent
  ],
  entryComponents: [
    QuanLyLoaiHoSoComponent,
    LoaiHoSoDeleteComponent,
    LoaiHoSoDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyLoaiHoSoRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    Select2Module,
    NgSelect2Module
  ],
  providers:[
    QuanLyLoaiHoSoPopupService
  ]
})
export class QuanLyLoaiHoSoModule { }
