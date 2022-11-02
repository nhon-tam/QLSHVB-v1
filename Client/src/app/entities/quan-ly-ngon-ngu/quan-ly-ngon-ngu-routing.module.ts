import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyNgonNguComponent } from './quan-ly-ngon-ngu.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý loại ngôn ngữ"
      },
      children: [
          {
              path: 'ngonNgu',
              data: {
                  title: "Loại ngôn ngữ"
              },
              component: QuanLyNgonNguComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyNgonNguRoutingModule { }
