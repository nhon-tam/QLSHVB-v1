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
import { QuanLyOrganTypePopupService } from './quan-ly-loai-co-quan-popup.service';
import { QuanLyOrganTypeRoutingModule } from './quan-ly-loai-co-quan-routing.module';
import { QuanLyOrganTypeComponent } from './quan-ly-loai-co-quan.component';
import { OrganTypeDialogComponent } from './loai-co-quan-dialog/loai-co-quan-dialog.component';
import { OrganTypeDetailComponent } from './loai-co-quan-detail/loai-co-quan-detail.component';
import { OrganTypeDeleteComponent } from './loai-co-quan-delete/loai-co-quan-delete.component';

@NgModule({
  declarations: [
    QuanLyOrganTypeComponent,
    OrganTypeDialogComponent,
    OrganTypeDetailComponent,
    OrganTypeDeleteComponent,
  ],
  entryComponents: [
    QuanLyOrganTypeComponent,
    OrganTypeDeleteComponent,
    OrganTypeDialogComponent,
    OrganTypeDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyOrganTypeRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule,
    Select2Module,
    NgSelect2Module
  ],
  providers:[
    QuanLyOrganTypePopupService
  ]
})
export class QuanLyOrganTypeModule { }
