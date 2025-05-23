import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // For *ngIf
import { AuthService } from '../auth.service'; // Import the Auth Service

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], // Add FormsModule and CommonModule
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage: string | null = null;

  constructor(private authService: AuthService) { } // Inject AuthService

  onLogin(): void {
    this.errorMessage = null; // Clear previous errors
    this.authService.login(this.username, this.password).subscribe(
      success => {
        if (!success) {
          this.errorMessage = 'Invalid username or password.';
        }
        // No explicit navigation here, AppComponent will handle it based on auth status
      },
      error => {
        this.errorMessage = 'An error occurred during login. Please try again.';
        console.error('Login error:', error);
      }
    );
  }
}