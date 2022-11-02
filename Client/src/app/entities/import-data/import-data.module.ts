import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { Select2Module } from "ng-select2-component";
import { HttpClientModule } from '@angular/common/http';
import { NgSelect2Module } from 'ng-select2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { ImportDataService } from './import-data.service';
import { ImportDataRoutingModule } from './import-data-routing.module';
import { ImportDataComponent } from './import-data/import-data.component';
import { MaterialModule } from '../../material.module';

@NgModule({
  declarations: [
    ImportDataComponent,
  ],
  entryComponents: [
  ],
  imports: [
    CommonModule,
    ImportDataRoutingModule,
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
    FileUploadModule,
    MaterialModule
  ],
  providers: [
    ImportDataService,
  ]
})
export class ImportDataModule { }
