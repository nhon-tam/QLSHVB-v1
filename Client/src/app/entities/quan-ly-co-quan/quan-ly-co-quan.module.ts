import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyCoQuanRoutingModule } from './quan-ly-co-quan-routing.module';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';
import { CoQuanDialogComponent } from './co-quan-dialog/co-quan-dialog.component';
import { CoQuanDetailComponent } from './co-quan-detail/co-quan-detail.component';
import { CoQuanDeleteComponent } from './co-quan-delete/co-quan-delete.component';
import { QuanLyCoQuanPopupService } from './quan-ly-co-quan-popup.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { Select2Module } from "ng-select2-component";
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    QuanLyCoQuanComponent,
    CoQuanDialogComponent,
    CoQuanDetailComponent,
    CoQuanDeleteComponent,
  ],
  entryComponents: [
    QuanLyCoQuanComponent,
    CoQuanDeleteComponent,
    CoQuanDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    MatFormFieldModule,
    Select2Module,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    QuanLyCoQuanRoutingModule,
    NgSelect2Module,
    NgxSpinnerModule
  ],
  providers:[
    QuanLyCoQuanPopupService,
  ]
})
export class QuanLyCoQuanModule { }
