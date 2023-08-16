import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { RegistrationComponent } from './registration/registration.component';
import { UserlistComponent } from './registration/userlist/userlist.component';

import { AuthGuard } from './_helpers/auth.guard';

import { BrandsComponent } from './brands/brands.component';
import { ClientsComponent } from './clients/clients.component';
import { AddClientComponent } from './clients/add/add.component';
import { RateCalculationComponent } from './rate-calculation/rate-calculation.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';

const routes: Routes = [
  { path: '',  redirectTo: 'login',pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'product/add', component: RegistrationComponent,canActivate: [AuthGuard]  },
  { path: 'product/edit/:id', component: RegistrationComponent,canActivate: [AuthGuard]  },
  { path: 'products', component: UserlistComponent,canActivate: [AuthGuard]  },
  { path: 'brands', component: BrandsComponent,canActivate: [AuthGuard]  },
  { path: 'clients', component: ClientsComponent,canActivate: [AuthGuard]  },
  { path: 'client/add', component:AddClientComponent ,canActivate: [AuthGuard]  },
  { path: 'category', component: CategoryComponent,canActivate: [AuthGuard]  },
  { path: 'subcategory', component: SubcategoryComponent,canActivate: [AuthGuard]  },

  { path: 'rate-calculation', component: RateCalculationComponent,canActivate: [AuthGuard]  },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }