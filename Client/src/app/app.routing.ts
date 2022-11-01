import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { QuanLyDanhMucComponent } from './entities/quan-ly-danh-muc/quan-ly-danh-muc.component';
import { QuanLyNguoiDungComponent } from './entities/quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { AuthGuard } from './guards/auth.guard';
import { ComponentsGuard } from './guards/components.guard';

export const routes: Routes = [
/*   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, */
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'HopSo',
        loadChildren: () => import('./entities/quan-ly-hop-so/quan-ly-hop-so.module').then(m => m.QuanLyHopSoModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyPhong',
        loadChildren: () => import('./entities/quan-ly-phong/quan-ly-phong.module').then(m => m.QuanLyPhongModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyDanhMuc',
        loadChildren: () => import('./entities/quan-ly-danh-muc/quan-ly-danh-muc.module').then(m => m.QuanLyDanhMucModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyNguoiDung',
        loadChildren: () => import('./entities/quan-ly-nguoi-dung/quan-ly-nguoi-dung.module').then(m => m.QuanLyNguoiDungModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyCoQuan',
        loadChildren: () => import('./entities/quan-ly-co-quan/quan-ly-co-quan.module').then(m => m.QuanLyCoQuanModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyHoSo',
        loadChildren: () => import('./entities/quan-ly-ho-so/quan-ly-ho-so.module').then(m => m.QuanLyHoSoModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyTaiLieu',
        loadChildren: () => import('./entities/quan-ly-tai-lieu/quan-ly-tai-lieu.module').then(m => m.QuanLyTaiLieuModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'ThongKe',
        loadChildren: () => import('./entities/thong-ke/thong-ke.module').then(m => m.ThongKeModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyChuKySo',
        loadChildren: () => import('./entities/quan-ly-chu-ky-so/quan-ly-chu-ky-so.module').then(m => m.QuanLyChuKySoModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyNhomNguoiDung',
        loadChildren: () => import('./entities/quan-ly-nhom-nguoi-dung/quan-ly-nhom-nguoi-dung.module').then(m => m.QuanLyNhomNguoiDungModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyOrganType',
        loadChildren: () => import('./entities/quan-ly-loai-co-quan/quan-ly-loai-co-quan.module').then(m => m.QuanLyOrganTypeModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyLoaiHoSo',
        loadChildren: () => import('./entities/quan-ly-loai-ho-so/quan-ly-loai-ho-so.module').then(m => m.QuanLyLoaiHoSoModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyLoaiVanBan',
        loadChildren: () => import('./entities/quan-ly-loai-van-ban/quan-ly-loai-van-ban.module').then(m => m.QuanLyLoaiVanBanModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyNgonNgu',
        loadChildren: () => import('./entities/quan-ly-ngon-ngu/quan-ly-ngon-ngu.module').then(m => m.QuanLyNgonNguModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyTinhTrangVatLy',
        loadChildren: () => import('./entities/quan-ly-tinh-trang-vat-ly/quan-ly-tt-vat-ly.module').then(m => m.QuanLyTinhTrangVatLyModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyMucDoTinCay',
        loadChildren: () => import('./entities/quan-ly-muc-do-tin-cay/muc-do-tin-cay.module').then(m => m.QuanLyMucDoTinCayModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'TraCuu',
        loadChildren: () => import('./entities/tra-cuu/tra-cuu.module').then(m => m.TraCuuModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'ImportData',
        loadChildren: () => import('./entities/import-data/import-data.module').then(m => m.ImportDataModule),
        canActivate: [ComponentsGuard]
      }
      // {
      //   path: 'quanLyHopSo',
      //   component: QuanLyHopSoComponent,
      // },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
