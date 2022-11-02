import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyOrganTypeComponent } from './quan-ly-loai-co-quan.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý loại cơ quan"
      },
      children: [
          {
              path: 'organType',
              data: {
                  title: "Loại cơ quan"
              },
              component: QuanLyOrganTypeComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyOrganTypeRoutingModule { }
