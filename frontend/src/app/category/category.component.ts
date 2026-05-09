import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, httpResource } from '@angular/common/http';
// import { RouterModule } from '@angular/router';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class Category implements OnInit {
  categories: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    // Fetch categories from the backend
    this.http.get<any[]>('http://localhost:3000/api/category')
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.cdr.detectChanges(); // Ensure UI updates immediately
        },
        error: (err) => console.error('Failed to load categories', err)
      });
  }
}
