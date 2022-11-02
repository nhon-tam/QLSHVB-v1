import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TraCuuComponent } from './tra-cuu/tra-cuu.component';




const routes: Routes = [
  {
    path: "",
      data: {
          title: "Tra Cứu"
      },
      children: [
          {
              path: 'traCuu',
              data: {
                  title: "Tra Cứu"
              },
              component: TraCuuComponent
          },
      ]
    //       {
    //         path: 'nhatKy',
    //         component: NhatKyComponent,
    //         data: {
    //           title: "Nhật ký"
    //         }
    //       },
    //       {
    //         path: 'thongKeHopSo',
    //         data: {
    //             title: "Thống kê hộp số"
    //         },
    //         component: ThongKeHopSoComponent
    //       },
    //       {
    //         path: 'thongKeHoSo',
    //         data: {
    //             title: "Thống kê hồ số"
    //         },
    //         component: ThongKeHoSoComponent
    //       },
    //       {
    //         path: 'thongKeVanBan',
    //         data: {
    //             title: "Thống kê tài liệu"
    //         },
    //         component: ThongKeVanBanComponent
    //       },
    //       {
    //         path: 'thongKeTongQuat',
    //         data: {
    //             title: "Thống kê"
    //         },
    //         component: ThongKeTongQuatComponent
    //       },
          
    //   ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TraCuuRoutingModule { }
