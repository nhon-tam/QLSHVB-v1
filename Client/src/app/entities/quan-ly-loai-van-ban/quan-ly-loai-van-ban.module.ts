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
import { QuanLyLoaiVanBanComponent } from './quan-ly-loai-van-ban.component';
import { LoaiVanBanDialogComponent } from './loai-van-ban-dialog/loai-van-ban-dialog.component';
import { LoaiVanBanDeleteComponent } from './loai-van-ban-delete/loai-van-ban-delete.component';
import { QuanLyLoaiVanBanRoutingModule } from './quan-ly-loai-van-ban-routing.module';
import { QuanLyLoaiVanBanPopupService } from './quan-ly-loai-van-ban-popup.service';
@NgModule({
  declarations: [
    QuanLyLoaiVanBanComponent,
    LoaiVanBanDialogComponent,
    LoaiVanBanDeleteComponent,
  ],
  entryComponents: [
    QuanLyLoaiVanBanComponent,
    LoaiVanBanDeleteComponent,
    LoaiVanBanDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyLoaiVanBanRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    Select2Module,
    NgSelect2Module
  ],
  providers:[
    QuanLyLoaiVanBanPopupService
  ]
})
export class QuanLyLoaiVanBanModule { }
