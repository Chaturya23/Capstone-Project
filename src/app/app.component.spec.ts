import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { ComponentFixture } from '@angular/core/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have the title 'pro'`, () => {
    expect(component.title).toEqual('pro');
  });

  it('should render title in an h1 tag', () => {
    fixture.detectChanges();

    // Check if the h1 element is present
    const h1Element = fixture.debugElement.query(By.css('h1'));
    expect(h1Element).toBeTruthy('The h1 element should be present in the DOM.');

    if (h1Element) {
      const h1 = h1Element.nativeElement as HTMLElement;
      expect(h1.textContent).toContain('Hello, pro');
    }
  });

  it('should contain a router outlet', () => {
    fixture.detectChanges();
    const routerOutlet = fixture.debugElement.query(By.css('router-outlet'));
    expect(routerOutlet).toBeTruthy();
  });
});
