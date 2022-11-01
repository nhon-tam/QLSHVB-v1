import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyChuKySoComponent } from './quan-ly-chu-ky-so/quan-ly-chu-ky-so.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý Con Dấu TÀI LIỆU"
      },
      children: [
          {
              path: 'chuKySo',
              data: {
                  title: "Con Dấu Tài Liệu"
              },
              component: QuanLyChuKySoComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyChuKySoRoutingModule { }
