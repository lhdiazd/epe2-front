import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { PurchaseHistoryComponent } from './purchase-history/purchase-history.component';

export const routes: Routes = [
    
    {
        path: 'home',
        component: HomeComponent, canActivate: [AuthGuard]
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'product',
        component: ProductComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
        path: 'purchase-history',
        component: PurchaseHistoryComponent,
    },

    { path: '', redirectTo: '/login', pathMatch: 'full' },
    
    { path: '**', redirectTo: '/login', pathMatch: 'full' }


];
