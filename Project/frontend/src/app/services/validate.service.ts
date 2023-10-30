import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  validateRegister(user: {
    name: string;
    email: string;
    username: string;
    password: string;
  }) {
    if (!user.name || !user.email || !user.username || !user.password) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string) {
    const re =
      /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    return re.test(email);
  }
}
