import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { ProductComponent } from './products.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser'; // Adjust to match your actual file name

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
    const loadingMessage: DebugElement | null = fixture.debugElement.query(By.css('.loading-message'));
    expect(loadingMessage).toBeTruthy(); // Check if the element is found
    if (loadingMessage) {
      expect(loadingMessage.nativeElement.textContent).toContain('Loading products...');
    }
  });

  it('should display error message when errorMessage is set', () => {
    component.errorMessage = 'An error occurred';
    fixture.detectChanges();
    const errorMessage: DebugElement | null = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage).toBeTruthy(); // Check if the element is found
    if (errorMessage) {
      expect(errorMessage.nativeElement.textContent).toContain('An error occurred');
    }
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
    component.products = [{ _id: '1', name: 'Product 1', price: 100, image: 'image1.jpg' }];
    fixture.detectChanges();
    const editButton = fixture.nativeElement.querySelector('.product button');
    expect(editButton).toBeTruthy(); // Ensure the button exists
    if (editButton) {
      editButton.click();
      fixture.detectChanges();
      expect(component.editingProduct).toBeDefined();
    }
  });

  it('should call confirmDelete when delete button is clicked', () => {
    spyOn(component, 'confirmDelete');
    component.products = [{ _id: '1', name: 'Product 1', price: 100, image: 'image1.jpg' }];
    fixture.detectChanges();
    const deleteButton = fixture.nativeElement.querySelector('button');
    expect(deleteButton).toBeTruthy(); // Ensure the button exists
    if (deleteButton) {
      deleteButton.click();
      expect(component.confirmDelete).toHaveBeenCalled();
    }
  });

  it('should add a new product when the form is submitted', () => {
    spyOn(component, 'addProduct').and.callThrough();
    component.showForm = 'add';
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy(); // Ensure the form exists
    if (form) {
      form.querySelector('input#name').value = 'New Product';
      form.querySelector('input#price').value = '150';
      form.querySelector('button[type="submit"]').click();
      fixture.detectChanges();
      expect(component.addProduct).toHaveBeenCalled();
    }
  });

  it('should cancel adding a product and hide the form', () => {
    component.showForm = 'add';
    fixture.detectChanges();
    const cancelButton = fixture.nativeElement.querySelector('button[type="button"]');
    expect(cancelButton).toBeTruthy(); // Ensure the cancel button exists
    if (cancelButton) {
      cancelButton.click();
      fixture.detectChanges();
      expect(component.showForm).toBeNull();
    }
  });

  it('should update a product when the update form is submitted', () => {
    component.editingProduct = { _id: '1', name: 'Updated Product', price: 200 };
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy(); // Ensure the form exists
    if (form) {
      form.querySelector('input#name').value = 'Updated Product';
      form.querySelector('input#price').value = '200';
      form.querySelector('button[type="submit"]').click();
      fixture.detectChanges();
      expect(component.updateProduct).toHaveBeenCalled();
    }
  });

  it('should cancel editing a product and hide the form', () => {
    component.editingProduct = { _id: '1', name: 'Product 1', price: 100 };
    fixture.detectChanges();
    const cancelButton = fixture.nativeElement.querySelector('button[type="button"]');
    expect(cancelButton).toBeTruthy(); // Ensure the cancel button exists
    if (cancelButton) {
      cancelButton.click();
      fixture.detectChanges();
      expect(component.editingProduct).toBeNull();
    }
  });

  it('should display categories correctly', () => {
    component.categories = ['chairs', 'tables', 'sofas'];
    fixture.detectChanges();
    const categoryOptions = fixture.nativeElement.querySelectorAll('select#category option');
    expect(categoryOptions.length).toBe(3);
    if (categoryOptions.length > 0) {
      expect(categoryOptions[0].textContent).toContain('chairs');
      expect(categoryOptions[1].textContent).toContain('tables');
      expect(categoryOptions[2].textContent).toContain('sofas');
    }
  });
});
