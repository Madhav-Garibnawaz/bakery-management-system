import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule, RouterLink, RouterLinkActive],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class Register {
  registerForm: FormGroup;

  constructor(private http: HttpClient, private router: Router) {
    this.registerForm = new FormGroup({
      // Changed 'fullName' to 'name' to match your Server Schema
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern('^[A-Z][a-zA-Z ]*$')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{10}$')]), // Added phone with pattern validation
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', Validators.required)
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirm = control.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Endpoint must match the new route in server.js
      // const apiUrl = 'http://localhost:3000/api/register'; 
      const apiUrl = 'https://bakery-management-system-0yj2.onrender.com/api/register'; 

      this.http.post(apiUrl, this.registerForm.value).subscribe({
        next: (res: any) => {
          alert("Registration Successful!");
          this.registerForm.reset();
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          console.error(err);
          alert(err.error?.error || "Registration failed. Make sure the server API exists.");
        }
      });
    }
  }
}