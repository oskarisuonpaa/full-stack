import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { fireEvent } from '@testing-library/angular';

import { tokenGetter } from 'src/app/app.module';
import { RegisterComponent } from './register.component';

describe('LoginComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({ config: { tokenGetter: tokenGetter } }),
        ToastrModule.forRoot(),
        FormsModule,
      ],
      declarations: [RegisterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
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
      expect(h2.textContent).toContain('Register');
    });

    it('should render register form', () => {
      const compiled = fixture.debugElement.nativeElement;

      const form = compiled.querySelector('form');
      expect(form).toBeDefined();
      expect(form.querySelector('#username')).toBeDefined();
      expect(form.querySelector('#password')).toBeDefined();
      expect(form.querySelector('#name')).toBeDefined();
      expect(form.querySelector('#email')).toBeDefined();
    });

    it('should update model', () => {
      const compiled = fixture.debugElement.nativeElement;

      const usernameInput = compiled.querySelector('#username');
      usernameInput.value = 'tester';
      usernameInput.dispatchEvent(new Event('input'));

      const passwordInput = compiled.querySelector('#password');
      passwordInput.value = '12345';
      passwordInput.dispatchEvent(new Event('input'));

      const nameInput = compiled.querySelector('#name');
      nameInput.value = 'Tim Tester';
      nameInput.dispatchEvent(new Event('input'));

      const emailInput = compiled.querySelector('#email');
      emailInput.value = 'tester@gmail.com';
      emailInput.dispatchEvent(new Event('input'));

      fixture.detectChanges();

      expect(component.username).toBe('tester');
      expect(component.password).toBe('12345');
      expect(component.name).toBe('Tim Tester');
      expect(component.email).toBe('tester@gmail.com');
    });

    it('should call register', () => {
      const compiled = fixture.debugElement.nativeElement;
      const onRegisterSpy = jest.spyOn(component, 'onRegisterSubmit');

      component.username = 'tester';
      component.password = '12345';
      component.name = 'Tim Tester';
      component.email = 'tester@gmail.com';

      fixture.detectChanges();

      const registerButton = compiled.querySelector('#register-button');
      fireEvent.click(registerButton);

      expect(onRegisterSpy).toBeCalled();
    });
  });
});
