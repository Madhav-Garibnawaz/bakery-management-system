// import { Component } from '@angular/core';
// import { RouterLink, RouterLinkActive } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [RouterLink, RouterLinkActive],
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class Login {

// }


import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class Login {
  loginForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  // onLogin() {
  //   if (this.loginForm.valid) {
  //     const apiUrl = 'http://localhost:3000/api/login';
      
  //     this.http.post(apiUrl, this.loginForm.value).subscribe({
  //       next: (res: any) => {
  //         alert("Welcome back, " + res.user.name + "!");
  //         // Store user info in localStorage if you want to keep them logged in
  //         localStorage.setItem('user', JSON.stringify(res.user));
          
  //         // Redirect based on role
  //         if (res.user.role === 'admin') {
  //           this.router.navigate(['/admin']);
  //         } else {
  //           this.router.navigate(['/home']);
  //         }
  //       },
  //       error: (err: any) => {
  //         alert(err.error.message || "Login failed");
  //       }
  //     });
  //   } else {
  //     alert("Please enter valid credentials");
  //   }
  // }


  onLogin() {

    if (this.loginForm.invalid) {
      alert("Please fill valid email and password!");
      return;
    }

    this.http.post('https://bakery-management-system-0yj2.onrender.com/api/login', this.loginForm.value).subscribe({
      next: (res: any) => {

        const userData = res.user || res;
        sessionStorage.setItem('user', JSON.stringify(userData));

        alert("Success!");
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.log("Full Error:", err); // THIS WILL TELL US THE REAL PROBLEM
        alert(err.error.message || "Login Failed");
      }
    });
  }
}