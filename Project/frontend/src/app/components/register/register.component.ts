import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ValidateService } from '../../services/validate.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ToasterService } from 'src/app/services/toaster.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  name!: string;
  username!: string;
  email!: string;
  password!: string;

  constructor(
    private validateService: ValidateService,
    public toasterService: ToasterService,
    private authenticatationService: AuthenticationService,
    private router: Router
  ) {}

  onRegisterSubmit() {
    const { name, username, email, password } = this;
    const user = { name, username, email, password };

    if (!this.validateService.validateRegister(user)) {
      this.toasterService.error('Please fill in all fields');
      return;
    }

    if (!this.validateService.validateEmail(email)) {
      this.toasterService.error('Please use a valid email');
      return;
    }

    this.authenticatationService
      .registerUser(user)
      .subscribe((data: { success: boolean; message: string }) => {
        if (data.success) {
          this.toasterService.success('You are now registered and can log in');
          this.router.navigate(['/login']);
        } else {
          this.toasterService.error('Something went wrong');
          this.router.navigate(['/register']);
        }
      });
  }
}
