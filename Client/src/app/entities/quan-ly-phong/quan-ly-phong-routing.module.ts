import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyPhongComponent } from './quan-ly-phong.component';
import { PhongDetailComponent } from './phong-detail/phong-detail.component';

 export const quanLyPhongRoutes: Routes = [
  { 
      
      path: "",
      data: {
          title: "Phông"
      },
      children: [
          {
              path: 'phong',
              data: {
                  title: "Phông"
              },
              component: QuanLyPhongComponent
          },
          {
            path: 'phong/:id',
            component: PhongDetailComponent,
            data: {
              title: "Chi tiết phông"
            }
          }
          
      ]
  },
];
 export const phongPopupRoute : Routes = [
  
]
@NgModule({
  imports: [RouterModule.forChild(quanLyPhongRoutes)],
  exports: [RouterModule]
})
export class QuanLyPhongRoutingModule { }
