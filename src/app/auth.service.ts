import { Injectable, PLATFORM_ID, Inject } from '@angular/core'; // Import PLATFORM_ID and Inject
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common'; // Import isPlatformBrowser

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.loggedIn.asObservable();

  // Inject PLATFORM_ID to determine the environment
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if the code is running in a browser environment
    if (isPlatformBrowser(this.platformId)) {
      const storedLoginStatus = localStorage.getItem('isLoggedIn');
      if (storedLoginStatus === 'true') {
        this.loggedIn.next(true);
      }
    }
  }

  login(username: string, password: string): Observable<boolean> {
    return of(false).pipe(
      delay(500),
      tap(() => {
        if (username === 'user' && password === 'password') {
          this.loggedIn.next(true);
          // Only access localStorage if in browser
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('isLoggedIn', 'true');
          }
          console.log('Login successful!');
        } else {
          this.loggedIn.next(false);
          // Only access localStorage if in browser
          if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('isLoggedIn');
          }
          console.log('Login failed: Invalid credentials.');
        }
      })
    );
  }

  logout(): void {
    this.loggedIn.next(false);
    // Only access localStorage if in browser
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('isLoggedIn');
    }
    console.log('Logged out.');
  }
}