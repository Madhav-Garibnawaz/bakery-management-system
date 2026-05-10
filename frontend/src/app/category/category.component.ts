import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, httpResource } from '@angular/common/http';
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
    this.http.get<any[]>('https://bakery-management-system-0yj2.onrender.com/api/category')
      .subscribe({
        next: (data) => {
          this.categories = data;
          this.cdr.detectChanges(); // Ensure UI updates immediately
        },
        error: (err) => console.error('Failed to load categories', err)
      });
  }
}
