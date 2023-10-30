import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToasterService } from 'src/app/services/toaster.service';

interface User {
  id?: string;
  name?: string;
  username: string;
  email: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toasterService: ToasterService
  ) {}

  onLoginSubmit() {
    const { username, password } = this;
    const user = { username, password };

    this.authenticationService
      .authenticateUser(user)
      .subscribe(
        (data: {
          success: boolean;
          message?: string;
          token?: string;
          user?: User;
        }) => {
          if (data.success && data.token && data.user) {
            this.authenticationService.storeUserData(data.token, data.user);
            this.toasterService.success('You are now logged in');
            this.router.navigate(['dashboard']);
          } else if (data.message) {
            this.toasterService.error(data.message);
            this.router.navigate(['login']);
          }
        }
      );
  }
}
