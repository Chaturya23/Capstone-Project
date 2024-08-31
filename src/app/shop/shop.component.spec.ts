import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ShopComponent } from './shop.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ShopComponent', () => {
  let component: ShopComponent;
  let fixture: ComponentFixture<ShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, ShopComponent], // Add HttpClientModule here
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial categories and products', () => {
    expect(component.categories).toBeDefined();
    expect(component.filteredProducts).toBeDefined();
  });

  it('should filter products based on category selection', () => {
    component.categories = ['Electronics', 'Books'];
    component.products = [
      { name: 'Laptop', category: 'Electronics', image: 'laptop.jpg', price: 1000, description: 'A high-performance laptop' },
      { name: 'Book', category: 'Books', image: 'book.jpg', price: 20, description: 'An interesting book' }
    ];

    const mockEvent = { target: { value: 'Electronics' } } as unknown as Event; // Use type assertion
    component.onCategoryChange(mockEvent);

    expect(component.filteredProducts).toEqual([
      { name: 'Laptop', category: 'Electronics', image: 'laptop.jpg', price: 1000, description: 'A high-performance laptop' }
    ]);
  });

  it('should display loading message while loading products', () => {
    component.loading = true;
    fixture.detectChanges();
    const loadingElement = fixture.nativeElement.querySelector('.products div');
    expect(loadingElement.textContent).toContain('Loading products...');
  });

  it('should display error message when error occurs', () => {
    component.errorMessage = 'Failed to load products';
    fixture.detectChanges();
    const errorElement = fixture.nativeElement.querySelector('.error');
    expect(errorElement.textContent).toContain('Failed to load products');
  });

  it('should display product information correctly', () => {
    component.filteredProducts = [
      { name: 'Laptop', category: 'Electronics', image: 'laptop.jpg', price: 1000, description: 'A high-performance laptop' }
    ];
    fixture.detectChanges();
    const productCard = fixture.nativeElement.querySelector('.product-card');
    expect(productCard.querySelector('h2').textContent).toContain('Laptop');
    expect(productCard.querySelector('h3').textContent).toContain('Cost $1000');
    expect(productCard.querySelector('p').textContent).toContain('A high-performance laptop');
  });

  it('should call addToCart method when button is clicked', () => {
    spyOn(component, 'addToCart');
    component.filteredProducts = [
      { name: 'Laptop', category: 'Electronics', image: 'laptop.jpg', price: 1000, description: 'A high-performance laptop' }
    ];
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.addToCart).toHaveBeenCalledWith(component.filteredProducts[0]);
  });
});
