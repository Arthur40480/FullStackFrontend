import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticateService } from '../services/authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService:AuthenticateService, private router : Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.authService.isAdminToken()){
        return true;
      }
      else if(!this.authService.isConnectedToken()){
        this.router.navigateByUrl('/login');
        return false;
      }else if(this.authService.isConnectedToken() && !this.authService.isAdminToken()) {
        this.router.navigateByUrl('/403');
        return false;
      }else {
        return false;
      }
  } 
}
