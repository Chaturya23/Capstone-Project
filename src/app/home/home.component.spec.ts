import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent] // Use 'imports' for standalone components
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display an image grid', () => {
    const imageGrid = fixture.debugElement.query(By.css('.image-grid'));
    expect(imageGrid).toBeTruthy();
  });

  it('should contain correct number of images', () => {
    const images = fixture.debugElement.queryAll(By.css('.image-grid .grid-item img'));
    expect(images.length).toBe(6); // Check the number of images
  });

  it('should have correct image sources', () => {
    const expectedSources = [
      'assets/im.png',
      'assets/hd5.png',
      'assets/hd1.png',
      'assets/hd4.png',
      'assets/im4.png',
      'assets/t6.png'
    ];

    const images = fixture.debugElement.queryAll(By.css('.image-grid .grid-item img'));
    images.forEach((img, index) => {
      const src = img.nativeElement.src;
      // Normalize the URL to match the expected source
      const normalizedSrc = src.split('/').pop(); // Extract filename from src URL
      expect(normalizedSrc).toBe(expectedSources[index]);
    });
  });

  it('should have correct alt text for images', () => {
    const expectedAltTexts = [
      'Product 1',
      'Product 2',
      'Product 3',
      'Product 1',
      'Product 2',
      'Product 3'
    ];

    const images = fixture.debugElement.queryAll(By.css('.image-grid .grid-item img'));
    images.forEach((img, index) => {
      expect(img.nativeElement.alt).toBe(expectedAltTexts[index]);
    });
  });
});
