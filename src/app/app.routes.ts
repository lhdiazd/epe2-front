import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
    
    {
        path: 'home',
        component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    
    { path: '**', redirectTo: '/login', pathMatch: 'full' }


];
