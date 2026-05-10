import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-view-users',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="card p-4 shadow-sm">
      <h2 class="mb-4">Registered Users</h2>
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let user of users">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>{{ user.phone }}</td>
            <td><span class="badge" [ngClass]="user.role === 'admin' ? 'bg-primary' : 'bg-secondary'">{{ user.role }}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class ViewUsers implements OnInit {
  users: any[] = [];
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.http.get('https://bakery-management-system-0yj2.onrender.com/api/users').subscribe((data: any) => {
      this.users = data;
      this.cdr.detectChanges(); //here we have to manually trigger refresh
    });
  }
}