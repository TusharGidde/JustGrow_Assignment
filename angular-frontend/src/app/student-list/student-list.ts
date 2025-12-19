import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student-service';
@Component({
  selector: 'app-student-list',
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css'],
})
export class StudentList implements OnInit {

  students: Student[] = [];
  paginatedStudents: Student[] = [];
  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    emailId: ''
  };
  showModal: boolean = false;
  isEditMode: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  // Pagination variables
  currentPage: number = 1;
  pageSize: number = 8;
  totalItems: number = 0;
  totalPages: number = 0;  Math = Math;
  constructor(private StudentService: StudentService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.getStudents();
  }

  private getStudents() {
    this.StudentService.getStudentsList().subscribe({
      next: (data) => {
        console.log('Students data received:', data);
        this.students = data;
        this.totalItems = data.length;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.currentPage = 1;
        this.updatePaginatedStudents();
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  private updatePaginatedStudents() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedStudents = this.students.slice(startIndex, endIndex);
    this.cdr.detectChanges();
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedStudents();
    }
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  openModal() {
    this.isEditMode = false;
    this.student = {
      id: 0,
      firstName: '',
      lastName: '',
      emailId: ''
    };
    this.successMessage = '';
    this.errorMessage = '';
    this.showModal = true;
  }

  editStudent(student: Student) {
    this.isEditMode = true;
    this.student = { ...student };
    this.successMessage = '';
    this.errorMessage = '';
    this.showModal = true;
  }

  saveStudent() {
    if (this.isEditMode) {
      this.StudentService.updateStudent(this.student).subscribe({
        next: (response) => {
          console.log('Student updated successfully:', response);
          this.successMessage = 'Student updated successfully!';
          this.errorMessage = '';
          this.getStudents();
          setTimeout(() => {
            this.closeModal();
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating student:', error);
          this.errorMessage = 'Error updating student. Please try again.';
          this.successMessage = '';
        }
      });
    } else {
      // Build payload without `id` to avoid sending a default id
      const payload = {
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        emailId: this.student.emailId
      };

      this.StudentService.createStudent(payload as any).subscribe({
        next: (response) => {
          console.log('Student added successfully:', response);
          this.successMessage = 'Student added successfully!';
          this.errorMessage = '';
          this.getStudents();
          setTimeout(() => {
            this.closeModal();
          }, 1000);
        },
        error: (error) => {
          console.error('Error adding student:', error);
          const errText = error?.error && typeof error.error !== 'string' ? JSON.stringify(error.error) : error?.error || error?.message || 'Unknown error';
          this.errorMessage = `Error ${error?.status || ''}: ${errText}`;
          this.successMessage = '';
        }
      });
    }
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.StudentService.deleteStudent(id).subscribe({
        next: () => {
          console.log('Student deleted successfully');
          this.getStudents();
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          alert('Error deleting student');
        }
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
