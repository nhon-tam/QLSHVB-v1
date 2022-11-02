import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyTinhTrangVatLyComponent } from './quan-ly-tt-vat-ly.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý tình trạng vật lý"
      },
      children: [
          {
              path: 'tinhTrangVatLy',
              data: {
                  title: "Tình trạng vật lý"
              },
              component: QuanLyTinhTrangVatLyComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyTinhTrangVatLyRoutingModule { }
