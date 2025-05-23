import { Routes } from '@angular/router';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { LoginComponent } from './login/login.component';
import { EmployeeDataComponent } from './employee-data/employee-data.component'; // We'll create this next

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'upload', component: FileUploadComponent },
  { path: 'employees', component: EmployeeDataComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route redirects to login
  { path: '**', redirectTo: '/login' } // Wildcard route for any unknown paths
];