import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly authService = inject(AuthService);
  readonly router = inject(Router);

  email = 'admin@firmeza.local';
  password = '123456';
  errorMessage = '';
  isSubmitting = false;

  submit(): void {
    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: (ok) => {
        if (ok) {
          this.router.navigateByUrl('/dashboard');
          return;
        }

        this.errorMessage =
          'Credenciales inválidas. Intenta con admin@firmeza.local / 123456.';
        this.isSubmitting = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo iniciar sesión. Inténtalo de nuevo.';
        this.isSubmitting = false;
      },
    });
  }
}
