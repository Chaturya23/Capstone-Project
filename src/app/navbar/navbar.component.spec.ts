import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NavbarComponent } from './navbar.component';

// Import any other modules or components that NavbarComponent depends on
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NavbarComponent,
        // Add other imports here if needed
        HttpClientTestingModule, // If your component uses HTTP
        RouterTestingModule // If your component uses routing
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render navbar', () => {
    const navbarElement = fixture.debugElement.query(By.css('nav'));
    expect(navbarElement).toBeTruthy();
  });

  it('should have navbar links', () => {
    const links = fixture.debugElement.queryAll(By.css('nav a'));
    expect(links.length).toBeGreaterThan(0); // Ensure there is at least one link
  });

  it('should have a link to the home page', () => {
    const homeLink = fixture.debugElement.query(By.css('nav a[href="/home"]'));
    expect(homeLink).toBeTruthy();
  });

  it('should toggle the navbar menu', () => {
    const toggleButton = fixture.debugElement.query(By.css('.navbar-toggler'));
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    
    const menu = fixture.debugElement.query(By.css('.navbar-menu'));
    expect(menu.nativeElement.classList).toContain('show'); // Adjust based on your implementation
  });

  it('should apply correct styles', () => {
    const navbarElement = fixture.debugElement.query(By.css('nav'));
    const styles = window.getComputedStyle(navbarElement.nativeElement);
    expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0.8)'); // Adjust as per your expected style
  });
});
