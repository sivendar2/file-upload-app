import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router'; // Import provideRouter
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes'; // Import your routes

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), // Provide the router with your defined routes
    provideHttpClient()
  ]
};