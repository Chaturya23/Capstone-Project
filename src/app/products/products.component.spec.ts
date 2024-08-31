import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ProductComponent } from './products.component'; 
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';// Adjust to match your actual file name

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ 
        FormsModule,
        HttpClientModule, // Include HttpClientModule here
        ProductComponent // Import the standalone component here
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display loading message when loading is true', () => {
    component.loading = true;
    fixture.detectChanges();
    const loadingMessage: DebugElement = fixture.debugElement.query(By.css('.loading-message'));
    expect(loadingMessage).toBeTruthy();
    expect(loadingMessage.nativeElement.textContent).toContain('Loading products...');
  });
  
  it('should display error message when errorMessage is set', () => {
    component.errorMessage = 'An error occurred';
    fixture.detectChanges();
    const errorMessage: DebugElement = fixture.debugElement.query(By.css('.error-message'));
    expect(errorMessage).toBeTruthy();
    expect(errorMessage.nativeElement.textContent).toContain('An error occurred');
  });
  
  it('should render products correctly', () => {
    component.products = [
      { _id: '1', name: 'Product 1', price: 100, image: 'image1.jpg' },
      { _id: '2', name: 'Product 2', price: 200, image: 'image2.jpg' }
    ];
    fixture.detectChanges();
    const productElements: DebugElement[] = fixture.debugElement.queryAll(By.css('.product'));
    expect(productElements.length).toBe(2);
    expect(productElements[0].nativeElement.querySelector('h2').textContent).toContain('Product 1');
    expect(productElements[1].nativeElement.querySelector('h2').textContent).toContain('Product 2');
  });
  it('should start editing product when edit button is clicked', () => {
    component.products = [{ _id: '1', name: 'Product 1', price: 100, image: 'image1.jpg', editable: true }];
    fixture.detectChanges();
    const editButton = fixture.nativeElement.querySelector('.product button.edit-button');
    expect(editButton).toBeTruthy(); // Ensure the button exists
    if (editButton) {
      editButton.click();
      fixture.detectChanges();
      expect(component.editingProduct).toBeDefined();
    }
  });

  it('should call confirmDelete when delete button is clicked', () => {
    spyOn(component, 'confirmDelete');
    component.products = [{ _id: '1', name: 'Product 1', price: 100, image: 'image1.jpg', deletable: true }];
    fixture.detectChanges();
    const deleteButton = fixture.nativeElement.querySelector('.product button.delete-button');
    expect(deleteButton).toBeTruthy(); // Ensure the button exists
    if (deleteButton) {
      deleteButton.click();
      expect(component.confirmDelete).toHaveBeenCalled();
    }
  });
  it('should not render products when the products array is empty', () => {
    component.products = [];
    fixture.detectChanges();
    const productElements = fixture.nativeElement.querySelectorAll('.product');
    expect(productElements.length).toBe(0);
  });
});
