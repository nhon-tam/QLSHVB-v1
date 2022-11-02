import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyTaiLieuComponent } from './quan-ly-tai-lieu.component';
import { TaiLieuDetailComponent } from './tai-lieu-detail/tai-lieu-detail.component';
import { VanBanPdfComponent } from './van-ban-pdf/van-ban-pdf.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý tài liệu"
      },
      children: [
          {
              path: 'taiLieu',
              data: {
                  title: "Tài Liệu"
              },
              component: QuanLyTaiLieuComponent
          },
          {
            path: 'taiLieu/:id',
            component: TaiLieuDetailComponent,
            data: {
              title: "Chi tiết hồ sơ"
            }
          },
          {
            path: 'taiLieuPdf',
            component: VanBanPdfComponent,
            data: {
              title: "Thêm mới tài liệu"
            }
          },
          {
            path: 'taiLieuPdf/:id',
            component: VanBanPdfComponent,
            data: {
              title: "Chỉnh sửa tài liệu"
            }
          },
          {
            path: 'taiLieuPdf/profileId/:id',
            component: VanBanPdfComponent,
            data: {
              title: "Thêm mới tài liệu"
            }
          }
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyTaiLieuRoutingModule { }
