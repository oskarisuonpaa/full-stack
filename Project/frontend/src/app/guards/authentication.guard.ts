import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthenticationGuard {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    if (this.authenticationService.loggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
