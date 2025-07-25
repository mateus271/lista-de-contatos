import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { NewContactComponent } from './features/new-contact/new-contact.component';
import { ListComponent } from './features/list/list.component';
import { AboutComponent } from './features/about/about.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"new",component:NewContactComponent},
   {path:"list",component:ListComponent},
   {path:'about',component:AboutComponent},
   {path:"**",redirectTo:"",pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
