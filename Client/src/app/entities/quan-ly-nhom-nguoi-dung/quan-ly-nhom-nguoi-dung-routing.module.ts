import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyNhomNguoiDungComponent } from './quan-ly-nhom-nguoi-dung.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý nhóm người dùng"
      },
      children: [
          {
              path: 'nhomNguoiDung',
              data: {
                  title: "Người dùng"
              },
              component: QuanLyNhomNguoiDungComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyNhomNguoiDungRoutingModule { }
