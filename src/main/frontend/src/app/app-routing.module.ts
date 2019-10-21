import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { AuthGaurdService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';


const routes: Routes = [
    {
        path: 'products',
        component: ProductsComponent, canActivate: [AuthGaurdService],
        data: { title: 'List of Products' }
    },
    {
        path: 'product-details/:id',
        component: ProductDetailComponent, canActivate: [AuthGaurdService],
        data: { title: 'Product Details' }
    },
    {
        path: 'product-add',
        component: ProductAddComponent, canActivate: [AuthGaurdService],
        data: { title: 'Add Product' }
    },
    {
        path: 'product-edit/:id',
        component: ProductEditComponent, canActivate: [AuthGaurdService],
        data: { title: 'Edit Product' }
    },
    {
        path: 'logout',
        component: LogoutComponent,
        data: { title: 'Logout' }
    },
    {
        path: '',
        component: LoginComponent,
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
