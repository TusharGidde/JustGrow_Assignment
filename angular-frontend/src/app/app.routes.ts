import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { CreateStudent } from './create-student/create-student';
import { Login } from './login/login';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [

    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'students', component: StudentList, canActivate: [AuthGuard] },
    { path: 'create-student', component: CreateStudent, canActivate: [AuthGuard] },

];
