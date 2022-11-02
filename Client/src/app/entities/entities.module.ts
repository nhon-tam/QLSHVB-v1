import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuanLyNguoiDungModule } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.module';
import { QuanLyDanhMucModule } from './quan-ly-danh-muc/quan-ly-danh-muc.module';
import { QuanLyHopSoModule } from './quan-ly-hop-so/quan-ly-hop-so.module';
import { QuanLyPhongModule } from '../entities/quan-ly-phong/quan-ly-phong.module';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan/quan-ly-co-quan.component';
import { QuanLyHoSoModule } from './quan-ly-ho-so/quan-ly-ho-so.module';
import { QuanLyCoQuanModule } from './quan-ly-co-quan/quan-ly-co-quan.module';
import { QuanLyTaiLieuModule } from './quan-ly-tai-lieu/quan-ly-tai-lieu.module';
import { QuanLyHoSoComponent } from './quan-ly-ho-so/quan-ly-ho-so.component';
import { QuanLyTaiLieuComponent } from './quan-ly-tai-lieu/quan-ly-tai-lieu.component';
import { MaterialModule } from '../material.module';
import { ThongKeModule } from './thong-ke/thong-ke.module';
import { QuanLyChuKySoModule } from './quan-ly-chu-ky-so/quan-ly-chu-ky-so.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { QuanLyNhomNguoiDungModule } from './quan-ly-nhom-nguoi-dung/quan-ly-nhom-nguoi-dung.module';
import { QuanLyOrganTypeModule } from './quan-ly-loai-co-quan/quan-ly-loai-co-quan.module';
import { QuanLyLoaiHoSoModule } from './quan-ly-loai-ho-so/quan-ly-loai-ho-so.module';
import { QuanLyLoaiVanBanModule } from './quan-ly-loai-van-ban/quan-ly-loai-van-ban.module';
import { QuanLyNgonNguModule } from './quan-ly-ngon-ngu/quan-ly-ngon-ngu.module';
import { QuanLyTinhTrangVatLyModule } from './quan-ly-tinh-trang-vat-ly/quan-ly-tt-vat-ly.module';
import { QuanLyMucDoTinCayModule } from './quan-ly-muc-do-tin-cay/muc-do-tin-cay.module';
import { FileDropDirective, FileSelectDirective } from "ng2-file-upload";
import { TraCuuModule } from './tra-cuu/tra-cuu.module';
import { ImportDataModule } from './import-data/import-data.module';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    QuanLyNguoiDungModule,
    QuanLyDanhMucModule,
    QuanLyHopSoModule,
    QuanLyPhongModule,
    QuanLyHoSoModule,
    QuanLyCoQuanModule,
    QuanLyTaiLieuModule,
    ThongKeModule,
    QuanLyChuKySoModule,
    MaterialModule,
    NgxSpinnerModule,
    QuanLyNhomNguoiDungModule,
    QuanLyOrganTypeModule,
    QuanLyLoaiHoSoModule,
    QuanLyLoaiVanBanModule,
    QuanLyNgonNguModule,
    QuanLyTinhTrangVatLyModule,
    QuanLyMucDoTinCayModule,
    TraCuuModule,
    ImportDataModule
  ]
})
export class EntitiesModule { }
