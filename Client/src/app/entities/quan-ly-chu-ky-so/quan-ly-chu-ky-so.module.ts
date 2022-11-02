import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyChuKySoRoutingModule } from './quan-ly-chu-ky-so-routing.module';
import { QuanLyChuKySoComponent } from './quan-ly-chu-ky-so/quan-ly-chu-ky-so.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { Select2Module } from "ng-select2-component";
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuanLyChuKySoService } from './quan-ly-chu-ky-so.service';
import { ChuKySoDeletePopupComponent } from './chu-ky-so-delete-popup/chu-ky-so-delete-popup.component';
import { ChuKySoPopupService } from './chu-ky-so-popup-service.service';
import { FileUploadModule } from 'ng2-file-upload';
import { ChuKySoUpdateStatusPopupComponent } from './chu-ky-so-update-status-popup/chu-ky-so-update-status-popup.component';

@NgModule({
  declarations: [
    QuanLyChuKySoComponent,
    ChuKySoDeletePopupComponent,
    ChuKySoUpdateStatusPopupComponent
  ],
  entryComponents: [
    ChuKySoDeletePopupComponent,
    ChuKySoUpdateStatusPopupComponent
  ],
  imports: [
    CommonModule,
    QuanLyChuKySoRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    Select2Module,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    NgSelect2Module,
    NgxSpinnerModule,
    FileUploadModule
  ],
  providers: [
    QuanLyChuKySoService,
    ChuKySoPopupService
  ]
})
export class QuanLyChuKySoModule { }
