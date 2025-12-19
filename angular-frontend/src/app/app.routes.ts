import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { CreateStudent } from './create-student/create-student';
import { Login } from './login/login';

export const routes: Routes = [

    { path: '', redirectTo: 'students', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'students', component: StudentList },
    { path: 'create-student', component: CreateStudent },

];
