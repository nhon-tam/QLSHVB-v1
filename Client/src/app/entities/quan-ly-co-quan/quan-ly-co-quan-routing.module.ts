import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';
import { CoQuanDetailComponent } from './co-quan-detail/co-quan-detail.component';


const routes: Routes = [
  {
    path: "",
    data: {
      title: "Quản lý cơ quan"
    },
    children: [
      {
        path: 'coQuan',
        data: {
          title: "Cơ quan"
        },
        component: QuanLyCoQuanComponent
      },
      {
        path: 'coQuan/:id',
        component: CoQuanDetailComponent,
        data: {
          title: "Chi tiết cơ quan"
        }
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyCoQuanRoutingModule { }
