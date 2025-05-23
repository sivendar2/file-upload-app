import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router'; // Import Router, RouterOutlet, RouterLink, RouterLinkActive

import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component'; // Import EmployeeDataComponent
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,         // Needed for <router-outlet>
    RouterLink,           // Needed for routerLink directive
    RouterLinkActive,     // Needed for routerLinkActive directive
    FileUploadComponent,  // Still imported, but shown via routing
    LoginComponent,       // Still imported, but shown via routing
    EmployeeDataComponent // Still imported, but shown via routing
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'file-upload-app';
  isLoggedIn: boolean = false;
  private authSubscription: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) { } // Inject Router

  ngOnInit(): void {
    this.authSubscription = this.authService.isLoggedIn$.subscribe(
      (loggedInStatus: boolean) => {
        this.isLoggedIn = loggedInStatus;
        // After login/logout, navigate to appropriate page
        if (loggedInStatus) {
          this.router.navigate(['/upload']); // Redirect to upload page after login
        } else {
          this.router.navigate(['/login']); // Redirect to login page after logout
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

  onLogout(): void {
    this.authService.logout();
  }
}