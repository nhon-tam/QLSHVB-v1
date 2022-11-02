import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyHopSoComponent } from './quan-ly-hop-so.component';
import { DetailHopSoComponent } from './detail-hop-so/detail-hop-so.component';


const routes: Routes = [
  { 
      
      path:"",
      data:{
          title: "Hộp số"
      },
      children:[
        {
          path:"quanLyHopSo",
          component: QuanLyHopSoComponent,
          data:{
            title:"Quản lý hộp số"
          }
        },
      {
          path: 'quanLyHopSo/:id',
          component: DetailHopSoComponent,
          data: {
            title: "Hộp số Details"
          }
      }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyHopSoRoutingModule { }
