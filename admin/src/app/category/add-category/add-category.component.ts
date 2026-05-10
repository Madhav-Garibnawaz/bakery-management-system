import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements AfterViewInit {

  categoryId = '';
  categoryName = '';
  photo: File | null = null; // Changed to allow null for reset logic
  message = '';

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  onFileChange(event: any) {
    this.photo = event.target.files[0];
  }

  addCategory() {
    if (!this.categoryId || !this.categoryName || !this.photo) {
      alert("Please fill all fields and select an image");
      return;
    }

    const formData = new FormData();
    formData.append('categoryId', this.categoryId);
    formData.append('categoryName', this.categoryName);
    formData.append('photo', this.photo);

    this.http.post('https://bakery-management-system-0yj2.onrender.com/api/category', formData)
      .subscribe({
        next: () => {
          this.message = 'Category Added Successfully';
          alert(this.message);
          this.resetForm(); // Call the reset logic
        },
        error: (err) => alert("Upload failed: " + err.message)
      });
  }

  resetForm() {
    // 1. Clear text properties
    this.categoryId = '';
    this.categoryName = '';
    this.photo = null;
    this.message = '';

    // 2. Clear the file input in the DOM
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }

    // 3. Trigger change detection to update UI
    this.cdr.detectChanges();
  }
}