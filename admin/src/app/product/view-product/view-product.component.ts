import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './view-product.component.html'
})
export class ViewProductComponent implements OnInit {

  products: any[] = [];
  filteredProducts: any[] = [];
  editId: string | null = null;
  selectedFile: File | null = null;
  searchText = ''; // Search input variable

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  // ngOnInit() {
  //   this.http.get<any[]>('http://localhost:3000/api/product')
  //     .subscribe(data => {
  //       this.products = data;
  //       this.cdr.detectChanges(); // Trigger change detection after data is loaded
  //     });
  // }


  ngOnInit(){
    this.load();
  }

  load() {
    this.http.get<any[]>('http://localhost:3000/api/product')
      .subscribe(data => {
        this.products = data;
        this.filteredProducts = data; // Initialize filtered list
        this.cdr.detectChanges(); // Trigger change detection after data is loaded
      });
  }

  search() {
    const text = this.searchText.toLowerCase();
    this.filteredProducts = this.products.filter(p =>
      p.pname.toLowerCase().includes(text) ||
      p.category.toLowerCase().includes(text) ||
      p.pdesc.toLowerCase().includes(text)
    );
  }
  
  onFileChange(event: any){
    this.selectedFile = event.target.files[0];
  }

  edit(prod: any) { this.editId = prod._id; }

  cancel(){
    this.editId = null;
    this.load();
  }

  delete(id: string){
    if(confirm('Delete this product?')){
      this.http.delete(`http://localhost:3000/api/product/${id}`)
      .subscribe(() => this.load());
    }
  }

  update(p: any) {
    const formData = new FormData();
    formData.append('pname', p.pname);
    formData.append('category', p.category);
    formData.append('pdesc', p.pdesc);
    formData.append('price', p.price.toString());
    formData.append('qty', p.qty.toString());
    
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }

    this.http.put(`http://localhost:3000/api/product/${p._id}`, formData)
      .subscribe(() => {
        alert('Product Updated');
        this.editId = null;
        this.selectedFile = null;
        this.load();
      });
  }
}