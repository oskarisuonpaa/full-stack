import 'zone.js/testing';
import { TestBed, ComponentFixture } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let fixture: ComponentFixture<DashboardComponent>;
  let component: DashboardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
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
      expect(h2.textContent).toContain('Dashboard');
    });

    it('should render paragraph', () => {
      const compiled = fixture.debugElement.nativeElement;

      const p = compiled.querySelector('p');
      expect(p.textContent).toContain('Welcome to your dashboard');
    });
  });
});
