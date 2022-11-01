import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyMucDoTinCayComponent } from './muc-do-tin-cay.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý mức độ tin cậy"
      },
      children: [
          {
              path: 'mucDoTinCay',
              data: {
                  title: "Mức độ tin cậy"
              },
              component: QuanLyMucDoTinCayComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyMucDoTinCayRoutingModule { }
