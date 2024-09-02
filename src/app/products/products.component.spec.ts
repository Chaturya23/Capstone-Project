import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './products.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientModule,
        ProductComponent
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
    const loadingMessage: DebugElement | null = fixture.debugElement.query(By.css('.products > div'));
    expect(loadingMessage).toBeTruthy();
    if (loadingMessage) {
      expect(loadingMessage.nativeElement.textContent).toContain('Loading products...');
    }
  });

  it('should display error message when errorMessage is set', () => {
    component.errorMessage = 'An error occurred';
    fixture.detectChanges();
    const errorMessage: DebugElement | null = fixture.debugElement.query(By.css('.error'));
    expect(errorMessage).toBeTruthy();
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
    expect(editButton).toBeTruthy();
    if (editButton) {
      editButton.click();
      fixture.detectChanges();
      expect(component.editingProduct).toBeDefined();
    }
  });

  it('should call updateProduct when update form is submitted', () => {
    spyOn(component, 'updateProduct').and.callThrough();
    
    // Set up a product to be edited
    component.editingProduct = { _id: '1', name: 'Updated Product', price: 200 };
    fixture.detectChanges(); // Trigger change detection
  
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy(); // Ensure the form exists
    
    // Check that form fields are present
    const nameInput = form.querySelector('input#name');
    const priceInput = form.querySelector('input#price');
    const submitButton = form.querySelector('button[type="submit"]');
    
    expect(nameInput).toBeTruthy();
    expect(priceInput).toBeTruthy();
    expect(submitButton).toBeTruthy();
  
    // Set form values and submit
    nameInput.value = 'Updated Product';
    priceInput.value = '200';
    nameInput.dispatchEvent(new Event('input'));
    priceInput.dispatchEvent(new Event('input'));
    submitButton.click();
    fixture.detectChanges(); // Trigger change detection
  
    expect(component.updateProduct).toHaveBeenCalled();
  });

  it('should cancel editing a product and hide the form', () => {
    component.editingProduct = { _id: '1', name: 'Product 1', price: 100 };
    fixture.detectChanges();
    const cancelButton = fixture.nativeElement.querySelector('button[type="button"]');
    expect(cancelButton).toBeTruthy();
    if (cancelButton) {
      cancelButton.click();
      fixture.detectChanges();
      expect(component.editingProduct).toBeNull();
    }
  });

  it('should display categories correctly', () => {
    component.categories = ['chairs', 'tables', 'sofas'];
    fixture.detectChanges(); // Trigger change detection
    const categorySelect = fixture.nativeElement.querySelector('select#category');
    expect(categorySelect).toBeTruthy(); // Check if the select element is present
  
    const categoryOptions = categorySelect.querySelectorAll('option');
    expect(categoryOptions.length).toBe(3); // Ensure there are 3 options
  
    // Check option texts
    expect(categoryOptions[0].textContent).toContain('chairs');
    expect(categoryOptions[1].textContent).toContain('tables');
    expect(categoryOptions[2].textContent).toContain('sofas');
  });
  
  it('should show add product form when showForm is set to "add"', () => {
    component.showForm = 'add';
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('.product-form-container');
    expect(form).toBeTruthy();
  });

  it('should add a new product when the form is submitted', () => {
    spyOn(component, 'addProduct').and.callThrough();
    component.showForm = 'add';
    fixture.detectChanges();
    const form = fixture.nativeElement.querySelector('form');
    expect(form).toBeTruthy();
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
    expect(cancelButton).toBeTruthy();
    if (cancelButton) {
      cancelButton.click();
      fixture.detectChanges();
      expect(component.showForm).toBeNull();
    }
  });

  it('should call confirmDelete when delete button is clicked', () => {
    spyOn(component, 'confirmDelete');
    component.products = [{ _id: '1', name: 'Product 1', price: 100, image: 'image1.jpg' }];
    fixture.detectChanges();
    const deleteButton = fixture.nativeElement.querySelectorAll('button')[1];
    expect(deleteButton).toBeTruthy();
    if (deleteButton) {
      deleteButton.click();
      fixture.detectChanges();
      expect(component.confirmDelete).toHaveBeenCalled();
    }
  });
});
