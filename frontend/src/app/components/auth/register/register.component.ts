import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../auth-shared.scss'],
})
export class RegisterComponent {
  form = this.fb.group({
    organizationName: ['', [Validators.required, Validators.minLength(2)]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  submitting = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.submitting = true;
    this.errorMessage = '';
    this.authService.register(this.form.getRawValue() as {
      organizationName: string;
      firstName: string;
      lastName: string;
      email: string;
      password: string;
    }).subscribe({
      next: () => this.router.navigateByUrl('/app/dashboard'),
      error: (err) => {
        this.submitting = false;
        this.errorMessage = err?.status === 409
          ? 'An account with this email already exists.'
          : 'Something went wrong. Please try again.';
      },
    });
  }
}
