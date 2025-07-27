import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { AboutComponent } from './about/about.component';
import { MaterialModule } from '../material/material.module';
import { ContactCardComponent } from './list/contact-card/contact-card.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';

@NgModule({
  declarations: [
    HomeComponent,
    ListComponent,
    AboutComponent,
    ContactCardComponent,
    ContactModalComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ]
})
export class FeaturesModule { }
