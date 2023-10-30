import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

interface User {
  name?: string;
  email: string;
  username: string;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  user!: User;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.getProfile().subscribe({
      next: (profile) => {
        this.user = profile.user;
      },
      error: (error) => console.log(error),
    });
  }
}
