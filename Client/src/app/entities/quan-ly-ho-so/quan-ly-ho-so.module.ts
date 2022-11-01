import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyHoSoRoutingModule } from './quan-ly-ho-so-routing.module';
import { QuanLyHoSoComponent } from './quan-ly-ho-so.component';
import { HoSoDialogComponent } from './ho-so-dialog/ho-so-dialog.component';
import { HoSoDetailComponent } from './ho-so-detail/ho-so-detail.component';
import { HoSoDeleteComponent } from './ho-so-delete/ho-so-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyHoSoPopupService } from './quan-ly-ho-so-popup.service';
import { MaterialModule } from '../../material.module';
import { FileDropDirective, FileSelectDirective } from "ng2-file-upload";
import { NgSelect2Module } from 'ng-select2';
import { FileDetailsComponent } from './file-details/file-details.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  declarations: [
    QuanLyHoSoComponent,
    HoSoDialogComponent,
    HoSoDetailComponent,
    HoSoDeleteComponent,
    // FileDropDirective,
    // FileSelectDirective,
     FileDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    QuanLyHoSoRoutingModule,
    MaterialModule,
    NgSelect2Module,
    NgxSpinnerModule,
    FileUploadModule
  ],
  entryComponents:[
    HoSoDialogComponent,
    HoSoDeleteComponent,
    FileDetailsComponent
  ],
  providers:[
    QuanLyHoSoPopupService
  ]
})
export class QuanLyHoSoModule { }
