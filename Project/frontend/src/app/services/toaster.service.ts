import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToasterService {
  constructor(private toastr: ToastrService) {}

  success(message: string, title?: string) {
    this.toastr.success(message, title, { positionClass: 'toast-top-center' });
  }

  error(message: string, title?: string) {
    this.toastr.error(message, title, { positionClass: 'toast-top-center' });
  }

  warning(message: string, title?: string) {
    this.toastr.warning(message, title, { positionClass: 'toast-top-center' });
  }

  info(message: string, title?: string) {
    this.toastr.info(message, title, { positionClass: 'toast-top-center' });
  }
}
