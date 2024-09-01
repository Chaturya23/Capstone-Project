import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactusComponent } from './contactus.component';

describe('ContactusComponent', () => {
  let component: ContactusComponent;
  let fixture: ComponentFixture<ContactusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the team section', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('section.team')).toBeTruthy();
  });

  it('should contain profile elements', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const profiles = compiled.querySelectorAll('div.profile');
    expect(profiles.length).toBeGreaterThan(0); // Ensure there is at least one profile
  });

  it('should display a profile with Kalyan\'s name', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span.name')?.textContent).toContain('Kalyan');
  });

  it('should display Kalyan\'s image', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const image = compiled.querySelector('img[src*="photo-1595152772835-219674b2a8a6"]');
    expect(image).toBeTruthy();
  });

  it('should display profile details for Kalyan', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const details = compiled.querySelector('div.details')?.textContent;
    expect(details).toContain('Kalyan is a software engineer with over 10 years of experience in web development and cloud computing.');
  });

  it('should have the correct styles applied', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const profile = compiled.querySelector('div.profile');
    expect(profile?.classList).toContain('profile');
  });

  it('should have a section heading "Our Team"', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2.section-heading')?.textContent).toContain('Our Team');
  });
});
