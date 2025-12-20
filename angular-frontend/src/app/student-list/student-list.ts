import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Student } from '../student';
import { StudentService } from '../student-service';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css'],
})
export class StudentList implements OnInit {

  students: Student[] = [];

  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    emailId: ''
  };

  showModal = false;
  isEditMode = false;
  successMessage = '';
  errorMessage = '';

  // ✅ Backend pagination state
  currentPage = 0;          // backend is 0-based
  pageSize = 8;
  totalItems = 0;
  totalPages = 0;

  Math = Math;

  constructor(
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getStudents();
  }

  getStudents(page: number = this.currentPage) {
    this.studentService.getStudentsList(page, this.pageSize).subscribe({
      next: (data: any) => {
        this.students = data.students;
        this.currentPage = data.currentPage;
        this.totalItems = data.totalItems;
        this.totalPages = data.totalPages;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching students:', error);
      }
    });
  }

  // ✅ Pagination click
  onPageChange(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.getStudents(page);
    }
  }

  get pageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i);
  }

  openModal() {
    this.isEditMode = false;
    this.student = { id: 0, firstName: '', lastName: '', emailId: '' };
    this.successMessage = '';
    this.errorMessage = '';
    this.showModal = true;
  }

  editStudent(student: Student) {
    this.isEditMode = true;
    this.student = { ...student };
    this.showModal = true;
  }

  saveStudent() {
    if (this.isEditMode) {
      this.studentService.updateStudent(this.student).subscribe({
        next: () => {
          this.successMessage = 'Student updated successfully!';
          this.getStudents();
          setTimeout(() => this.closeModal(), 1000);
        },
        error: () => {
          this.errorMessage = 'Error updating student';
        }
      });
    } else {
      const payload = {
        firstName: this.student.firstName,
        lastName: this.student.lastName,
        emailId: this.student.emailId
      };

      this.studentService.createStudent(payload as any).subscribe({
        next: () => {
          this.successMessage = 'Student added successfully!';
          this.getStudents(0);
          setTimeout(() => this.closeModal(), 1000);
        },
        error: () => {
          this.errorMessage = 'Error adding student';
        }
      });
    }
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe({
        next: () => this.getStudents(),
        error: () => alert('Error deleting student')
      });
    }
  }

  closeModal() {
    this.showModal = false;
    this.successMessage = '';
    this.errorMessage = '';
  }
}
