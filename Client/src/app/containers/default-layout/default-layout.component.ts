import {Component, OnDestroy, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { UserGroupService } from '../../entities/quan-ly-nhom-nguoi-dung/user-group.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public userName : string;
  roleName: string;
  constructor(private router : Router, private authenticationService: AuthenticationService, private userGroupService : UserGroupService) 
  {
    this.userName = localStorage.getItem('user');
  }

  public sidebarMinimized = false;
  public userNavItems = [
    {
      name: 'Quản lý hộp số',
      url: '/HopSo/quanLyHopSo',
      icon: 'fa fa-cube'
    },
    {
      name: 'Quản lý hồ sơ',
      url: '/QuanLyHoSo/hoSo',
      icon: 'fa fa-folder'
    },
    {
      name: 'Quản lý tài liệu',
      url: '/QuanLyTaiLieu/taiLieu',
      icon: 'fa fa-file-text'
    }
  ];
  public adminNavItems = navItems;
  public navItems = [];

  ngOnInit(): void {
    this.getRoleByUserName();
  }

  getRoleByUserName() {
    this.userGroupService.getRoleName(this.userName)
    .subscribe((result) => {
      if(result != undefined && result.item != undefined && result.item.roleName != undefined){
        this.roleName = result.item.roleName;
        if(this.roleName != undefined){
          if (this.roleName.toLowerCase() === 'admin') {
            this.navItems = navItems;
          }
          else {
            this.navItems = this.userNavItems;
          }
        }
      }
    }, 
    (error => {
      setTimeout(() => {
        alert("Lỗi: " + JSON.stringify(error));
      }, 5000);
    }),
    () => {
    })
  }
  
  logout() {
    if(confirm("Bạn có chắc muốn đăng xuất không ?")) {
      this.authenticationService.logout();
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/' } });
    }
    return;
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnDestroy(): void {
    
  }
}
