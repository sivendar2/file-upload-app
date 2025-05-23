import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // For *ngIf, *ngFor
import { FormsModule } from '@angular/forms'; // For ngModel

// Define a simple Employee interface
interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
}

@Component({
  selector: 'app-employee-data',
  standalone: true,
  imports: [CommonModule, FormsModule], // Import necessary modules
  templateUrl: './employee-data.component.html',
  styleUrls: ['./employee-data.component.scss']
})
export class EmployeeDataComponent implements OnInit {
  employees: Employee[] = []; // Array to hold employee data
  nextId: number = 1; // Simple ID generator

  // Form fields for adding/editing
  newEmployee: Employee = { id: 0, name: '', position: '', department: '' };
  editingEmployee: Employee | null = null; // Stores employee being edited

  ngOnInit(): void {
    // Initialize with some dummy data
    this.employees.push({ id: this.nextId++, name: 'Alice Smith', position: 'Software Engineer', department: 'Engineering' });
    this.employees.push({ id: this.nextId++, name: 'Bob Johnson', position: 'Project Manager', department: 'Management' });
    this.employees.push({ id: this.nextId++, name: 'Charlie Brown', position: 'HR Specialist', department: 'Human Resources' });
  }

  // Add a new employee
  addEmployee(): void {
    if (this.newEmployee.name && this.newEmployee.position && this.newEmployee.department) {
      this.newEmployee.id = this.nextId++; // Assign a new ID
      this.employees.push({ ...this.newEmployee }); // Add a copy to the array
      this.resetForm(); // Clear the form
    } else {
      alert('Please fill in all fields for the new employee.');
    }
  }

  // Start editing an employee
  editEmployee(employee: Employee): void {
    this.editingEmployee = { ...employee }; // Create a copy for editing
    this.newEmployee = { ...employee }; // Populate form for editing
  }

  // Save changes to an employee
  saveEditedEmployee(): void {
    if (this.editingEmployee && this.newEmployee.name && this.newEmployee.position && this.newEmployee.department) {
      const index = this.employees.findIndex(emp => emp.id === this.editingEmployee!.id);
      if (index !== -1) {
        this.employees[index] = { ...this.newEmployee }; // Update the employee
        this.cancelEdit(); // Exit editing mode
      }
    } else {
      alert('Please fill in all fields for the edited employee.');
    }
  }

  // Cancel editing
  cancelEdit(): void {
    this.editingEmployee = null;
    this.resetForm();
  }

  // Delete an employee
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employees = this.employees.filter(emp => emp.id !== id);
      this.cancelEdit(); // Ensure edit mode is off if deleted
    }
  }

  // Reset the form fields
  resetForm(): void {
    this.newEmployee = { id: 0, name: '', position: '', department: '' };
  }
}