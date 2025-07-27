import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { NewContactComponent } from './new-contact/new-contact.component';
import { ListComponent } from './list/list.component';
import { AboutComponent } from './about/about.component';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [
    HomeComponent,
    NewContactComponent,
    ListComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,MaterialModule
  ]
})
export class FeaturesModule { }
