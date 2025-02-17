import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

//Component
import {LayoutComponent} from './layout/layout.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ResetpasswordComponent} from './resetpassword/resetpassword.component';

import {PayComponent} from "./pay/pay.component";



const routes: Routes = [

  {path: '', component: LayoutComponent, loadChildren: () =>  import("./hotel/hotel.module").then((m) => m.HotelModule),},
  { path: 'page', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  {
    path: 'hotels',
    loadChildren: () =>
      import("./hotel/hotel.module").then((m) => m.HotelModule),
  },

  {
    path: 'login',

    component: LoginComponent
  },
  {
    path: 'pay',
    component: PayComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'reset-password',
    component: ResetpasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
