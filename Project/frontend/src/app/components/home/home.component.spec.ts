import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let component: HomeComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Test: Component', () => {
    it('should be initialized', () => {
      expect(component).toBeTruthy();
    });

    it('should render jumbotron', () => {
      const compiled = fixture.debugElement.nativeElement;

      const jumbotron = compiled.querySelector('.jumbotron');
      expect(jumbotron).toBeDefined();
    });

    it('login should redirect to /login', () => {
      const compiled = fixture.debugElement.nativeElement;

      const href = compiled.querySelector('.btn-dark').getAttribute('href');
      expect(href).toEqual('/login');
    });

    it('register should redirect to /register', () => {
      const compiled = fixture.debugElement.nativeElement;

      const href = compiled.querySelector('.btn-primary').getAttribute('href');
      expect(href).toEqual('/register');
    });
  });
});
