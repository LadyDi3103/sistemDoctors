import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AdminService } from 'src/app/services/admin/admin.service';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  constructor(private adminService: AdminService, private loginService: LoginService ) {
  }

  private breakpointObserver = inject(BreakpointObserver);
  showButtonLogout = false; 
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

showDashboardView(){
this.adminService.showDashboard
}
onLogoutClick(): void {
  this.loginService.logout();
}

}
