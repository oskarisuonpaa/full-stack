import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { fireEvent } from '@testing-library/angular';

import { LoginComponent } from './login.component';
import { tokenGetter } from 'src/app/app.module';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<LoginComponent>;
  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({ config: { tokenGetter: tokenGetter } }),
        ToastrModule.forRoot(),
        FormsModule,
      ],
      declarations: [LoginComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Test: Component', () => {
    it('should be initialized', () => {
      expect(component).toBeTruthy();
    });

    it('should render page header', () => {
      const compiled = fixture.debugElement.nativeElement;

      const h2 = compiled.querySelector('h2');
      expect(h2.textContent).toContain('Login');
    });

    it('should render login form', () => {
      const compiled = fixture.debugElement.nativeElement;

      const form = compiled.querySelector('form');
      expect(form).toBeDefined();
      expect(form.querySelector('#username')).toBeDefined();
      expect(form.querySelector('#password')).toBeDefined();
    });

    it('should update model', () => {
      const compiled = fixture.debugElement.nativeElement;

      const usernameInput = compiled.querySelector('#username');
      usernameInput.value = 'jdoe';
      usernameInput.dispatchEvent(new Event('input'));

      const passwordInput = compiled.querySelector('#password');
      passwordInput.value = '12345';
      passwordInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.username).toBe('jdoe');
      expect(component.password).toBe('12345');
    });

    it('should call login', () => {
      const compiled = fixture.debugElement.nativeElement;
      const onLoginSpy = jest.spyOn(component, 'onLoginSubmit');

      component.username = 'tester';
      component.password = '12345';

      fixture.detectChanges();

      const loginButton = compiled.querySelector('#login-button');
      fireEvent.click(loginButton);

      expect(onLoginSpy).toBeCalled();
    });
  });
});
