import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { JwtModule } from '@auth0/angular-jwt';
import { RouterTestingModule } from '@angular/router/testing';

import { NavbarComponent } from './navbar.component';
import { tokenGetter } from 'src/app/app.module';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<NavbarComponent>;
  let component: NavbarComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot(),
        JwtModule.forRoot({ config: { tokenGetter: tokenGetter } }),
      ],
      declarations: [NavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Test: Component', () => {
    it('should be initialized', () => {
      expect(component).toBeTruthy();
    });

    it('should render brand', () => {
      const compiled = fixture.debugElement.nativeElement;

      const brand = compiled.querySelector('.navbar-brand');
      expect(brand.textContent).toContain('MEAN Auth App');
    });
  });
});
