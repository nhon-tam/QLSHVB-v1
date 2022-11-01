import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý người dùng"
      },
      children: [
          {
              path: 'nguoiDung',
              data: {
                  title: "Người dùng"
              },
              component: QuanLyNguoiDungComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyNguoiDungRoutingModule { }
