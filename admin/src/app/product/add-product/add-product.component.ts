import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // 1. Added ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'] // Standardized to styleUrls
})
export class AddProductComponent implements OnInit {

  categories: any[] = [];
  product: any = {
    category: '',
    pname: '',
    pdesc: '',
    price: null,
    qty: null,
    date: ''
  };
  file: any;

  // 2. Inject ChangeDetectorRef
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get<any[]>('https://bakery-management-system-0yj2.onrender.com/api/category')
      .subscribe({
        next: (data) => {
          // this.categories = data;
          // // 3. Force UI refresh so the dropdown populates immediately
          // this.cdr.detectChanges(); 
          setTimeout(() => {
            this.categories = data;
            this.cdr.detectChanges(); 
          }, 0);
        },
        error: (err) => console.error('Failed to load categories', err)
      });
  }

  onFile(e: any) {
    this.file = e.target.files[0];
  }

  save() {
    if (!this.file) {
      alert("Please select a product image");
      return;
    }

    const fd = new FormData();
    // Append all product fields to FormData
    Object.keys(this.product).forEach(k => {
      if (this.product[k] !== null) {
        fd.append(k, this.product[k]);
      }
    });
    
    fd.append('photo', this.file);

    this.http.post('https://bakery-management-system-0yj2.onrender.com/api/product', fd)
      .subscribe({
        next: () => {
          alert('Product Saved Successfully!');
          this.resetForm();
        },
        error: (err) => {
          console.error('Upload failed', err);
          alert('Error saving product');
        }
      });
  }

  resetForm() {
    this.product = {
      category: '',
      pname: '',
      pdesc: '',
      price: null,
      qty: null,
      date: ''
    };
    this.file = null;
    this.cdr.detectChanges();
  }
}