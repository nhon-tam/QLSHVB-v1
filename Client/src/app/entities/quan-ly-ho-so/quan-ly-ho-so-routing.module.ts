import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyHoSoComponent } from './quan-ly-ho-so.component';
import { HoSoDetailComponent } from './ho-so-detail/ho-so-detail.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý hồ sơ"
      },
      children: [
          {
              path: 'hoSo',
              data: {
                  title: "Hồ sơ"
              },
              component: QuanLyHoSoComponent
          },
          {
            path: 'hoSo/:id',
            component: HoSoDetailComponent,
            data: {
              title: "Chi tiết hồ sơ"
            }
          }
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyHoSoRoutingModule { }
