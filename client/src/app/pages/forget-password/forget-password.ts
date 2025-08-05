import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule, MatIconModule, MatSnackBarModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.css',
})
export class ForgetPasswordComponent {
  email!: string;
  authService = inject(AuthService);
  matSnackbar = inject(MatSnackBar);
  showEmailSent = false;
  isSubmitting = false;

  forgetPassword() {
    console.log('🔍 Sending forgot password request for email:', this.email);
    this.isSubmitting = true;
    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        console.log('✅ Forgot password response:', response);
        if (response.isSuccess) {
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
          });
          this.showEmailSent = true;
        } else {
          this.matSnackbar.open(response.message, 'Close', {
            duration: 5000,
          });
        }
      },
      error: (error: HttpErrorResponse) => {
        console.error('❌ Forgot password error:', error);
        console.error('❌ Error details:', error.error);
        this.matSnackbar.open(error.error?.message || error.message, 'Close', {
          duration: 5000,
        });
      },
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
}