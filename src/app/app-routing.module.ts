import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Component/home/home.component';
import { RestaurantComponent } from './Component/restaurant/restaurant.component';
import { AuthGuard } from './Service/Auth/auth.guard';
import { LoginComponent } from './Component/login/login.component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path:'login',component:LoginComponent},
  { path: 'home', component: HomeComponent,canActivate:[AuthGuard],children:[
    {path:'',component:RestaurantComponent}
  ] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
