import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserGroupService } from '../entities/quan-ly-nhom-nguoi-dung/user-group.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsGuard implements CanActivate {
  roleName : string;
  userName: string;
  constructor(private router : Router, private authentication : AuthenticationService, private userGroupService : UserGroupService) 
  {  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var urlRedirect = state.url;
    var userNavItems = ['/QuanLyTaiLieu/taiLieu','/HopSo/quanLyHopSo','/QuanLyHoSo/hoSo', '/QuanLyTaiLieu/taiLieuPdf', '/QuanLyTaiLieu/taiLieuPdf/profileId'];
    this.getRoleName();
    if(this.roleName != undefined){
      if (this.roleName.toLowerCase() === 'user') {
        // console.log(urlRedirect);
        // if (!urlRedirect.includes('/QuanLyTaiLieu/taiLieuPdf/profileId') 
        // && !urlRedirect.includes('/QuanLyHoSo/hoSo/')
        // && !urlRedirect.includes('/HopSo/quanLyHopSo/75')) {
        //   if(!(userNavItems.includes(urlRedirect))){
        //     // this.router.navigate([this.router.url]);
        //     this.router.navigate(['/404'], { queryParams: { role: 'access-denied' } });
        //     return false;
        //   }
        // }
      }
    }
    return true;
  }

  getRoleName () {
    var userName =  localStorage.getItem('user');
    this.userGroupService.getRoleName(userName)
    .subscribe((result) => {
        if(result != undefined && result.item != undefined){
          this.roleName = result.item.roleName;
          localStorage.setItem('role', this.roleName);
        }
    }, 
    (error => {
      setTimeout(() => {
      }, 5000);
    }),
    () => {
    })
  }
}
