import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JwtModule } from '@auth0/angular-jwt';

import { ProfileComponent } from './profile.component';
import { tokenGetter } from 'src/app/app.module';

const mockUser = {
  name: 'Tim Tester',
  email: 'tester@gmail.com',
  username: 'tester',
};

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<ProfileComponent>;
  let component: ProfileComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        JwtModule.forRoot({ config: { tokenGetter: tokenGetter } }),
      ],
      declarations: [ProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    component.user = mockUser;
    fixture.detectChanges();
  });

  describe('Test: Component', () => {
    it('should be initialized', () => {
      expect(component).toBeTruthy();
    });

    it('should render page header', () => {
      const compiled = fixture.debugElement.nativeElement;

      const h2 = compiled.querySelector('h2');
      expect(h2.textContent).toContain(mockUser.name);
    });

    it('should render username', () => {
      const compiled = fixture.debugElement.nativeElement;

      const p = compiled.querySelector('#username');
      expect(p.textContent).toContain(mockUser.username);
    });

    it('should render email', () => {
      const compiled = fixture.debugElement.nativeElement;

      const p = compiled.querySelector('#email');
      expect(p.textContent).toContain(mockUser.email);
    });
  });
});
