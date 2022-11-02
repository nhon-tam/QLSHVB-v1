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
import { QuanLyNgonNguComponent } from './quan-ly-ngon-ngu.component';
import { NgonNguDialogComponent } from './ngon-ngu-dialog/ngon-ngu-dialog.component';
import { NgonNguDeleteComponent } from './ngon-ngu-delete/ngon-ngu-delete.component';
import { QuanLyNgonNguRoutingModule } from './quan-ly-ngon-ngu-routing.module';
import { QuanLyNgonNguPopupService } from './quan-ly-ngon-ngu-popup.service';
@NgModule({
  declarations: [
    QuanLyNgonNguComponent,
    NgonNguDialogComponent,
    NgonNguDeleteComponent
  ],
  entryComponents: [
    QuanLyNgonNguComponent,
    NgonNguDeleteComponent,
    NgonNguDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyNgonNguRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    Select2Module,
    NgSelect2Module
  ],
  providers:[
    QuanLyNgonNguPopupService
  ]
})
export class QuanLyNgonNguModule { }
