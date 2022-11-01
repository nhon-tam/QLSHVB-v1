import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyDanhMucComponent } from './quan-ly-danh-muc.component';
import { DanhMucDetailComponent } from './danh-muc-detail/danh-muc-detail.component';


const quanLyDanhMucRoutes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý danh mục"
      },
      children: [
          {
              path: 'danhMuc',
              data: {
                  title: "Danh mục"
              },
              component: QuanLyDanhMucComponent
          },
          {
            path: 'danhMuc/:id',
            component: DanhMucDetailComponent,
            data: {
              title: "Chi tiết danh mục"
            }
          }
      ]
  }
];
export const danhMucPopupRoute : Routes = [
  
]

@NgModule({
  imports: [RouterModule.forChild(quanLyDanhMucRoutes)],
  exports: [RouterModule]
})
export class QuanLyDanhMucRoutingModule { }
