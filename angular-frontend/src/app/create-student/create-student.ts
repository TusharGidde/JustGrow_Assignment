import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student-service';

@Component({
  selector: 'app-create-student',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-student.html',
  styleUrl: './create-student.css',
})
export class CreateStudent {
  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    emailId: ''
  };

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private studentService: StudentService) {}

  addStudent() {
    if (this.student.firstName && this.student.lastName && this.student.emailId) {
      this.studentService.createStudent(this.student).subscribe({
        next: (response) => {
          console.log('Student added successfully:', response);
          this.successMessage = 'Student added successfully!';
          this.errorMessage = '';
          this.resetForm();
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Error adding student:', error);
          this.errorMessage = 'Error adding student. Please try again.';
          this.successMessage = '';
        }
      });
    }
  }

  private resetForm() {
    this.student = {
      id: 0,
      firstName: '',
      lastName: '',
      emailId: ''
    };
  }
}
