import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot , Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { state } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authenticationService : AuthenticationService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authenticationService.getCurrentUser) {
      return true;
    }
    this.router.navigate(['/login'], { queryParams:{ returnUrl: '/'  }});
    return false; 
  }
}
