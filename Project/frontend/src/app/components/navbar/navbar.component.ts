import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(
    private toasterService: ToasterService,
    public authenticationService: AuthenticationService,
    private router: Router
  ) {}

  onLogoutClick() {
    this.authenticationService.logout();
    this.toasterService.warning('You are now logged out');
    this.router.navigate(['login']);
  }
}
