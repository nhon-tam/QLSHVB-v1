import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyTaiLieuRoutingModule } from './quan-ly-tai-lieu-routing.module';
import { QuanLyTaiLieuComponent } from './quan-ly-tai-lieu.component';
import { TaiLieuDialogComponent } from './tai-lieu-dialog/tai-lieu-dialog.component';
import { TaiLieuDetailComponent } from './tai-lieu-detail/tai-lieu-detail.component';
import { TaiLieuDeleteComponent } from './tai-lieu-delete/tai-lieu-delete.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyTaiLieuPopupService } from './quan-ly-tai-lieu-popup.service';
import { VanBanPdfComponent } from './van-ban-pdf/van-ban-pdf.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgSelect2Module } from 'ng-select2';
import { MatCheckboxModule } from '@angular/material';

@NgModule({
  declarations: [
    QuanLyTaiLieuComponent,
    TaiLieuDialogComponent,
    TaiLieuDetailComponent,
    TaiLieuDeleteComponent,
    VanBanPdfComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    PdfViewerModule,
    QuanLyTaiLieuRoutingModule,
    MatSidenavModule,
    NgSelect2Module,
    MatCheckboxModule
  ],
  entryComponents:[
    TaiLieuDialogComponent,
    TaiLieuDeleteComponent
  ],
  providers:[
    QuanLyTaiLieuPopupService
  ]
})
export class QuanLyTaiLieuModule { }
