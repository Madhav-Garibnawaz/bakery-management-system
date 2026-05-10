import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-category',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './view-category.component.html'
})
export class ViewCategoryComponent implements OnInit {

  categories: any[] = [];
  filteredCategories: any[] = [];
  editId: string | null = null;
  searchText = '';
  selectedFile: File | null = null; // New variable to store the file

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  ngOnInit() {
    this.load();
  }

  load() {
    this.http.get<any[]>('https://bakery-management-system-0yj2.onrender.com/api/category')
      .subscribe(res => {
        this.categories = res;
        this.filteredCategories = res;


        // Manually trigger change detection after data is loaded
        this.cdr.detectChanges();
      });
  }

  search() {
    const text = this.searchText.toLowerCase();
    this.filteredCategories = this.categories.filter(c =>
      c.categoryId.toLowerCase().includes(text) ||
      c.categoryName.toLowerCase().includes(text)
    );
  }

  edit(cat: any) {
    this.editId = cat._id;
  }

  cancel() {
    this.editId = null;
    this.load();
  }

  update(cat: any) {
    // Use FormData to send both text and files
    const formData = new FormData();
    formData.append('categoryId', cat.categoryId);
    formData.append('categoryName', cat.categoryName);
    
    // Only append photo if a new one was actually selected
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.http.put(`https://bakery-management-system-0yj2.onrender.com/api/category/${cat._id}`, formData)
      .subscribe(() => {
        alert('Updated successfully');
        this.editId = null;
        this.selectedFile = null; // Reset file
        this.load(); // Refresh list to show new photo
      });
  }

  delete(id: string) {
    if (confirm('Delete this category?')) {
      this.http.delete(`https://bakery-management-system-0yj2.onrender.com/api/category/${id}`)
        .subscribe(() => this.load());
    }
  }
}