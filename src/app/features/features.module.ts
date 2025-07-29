import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AboutComponent } from './about/about.component';
import { MaterialModule } from '../material/material.module';
import { ContactCardComponent } from './list/contact-card/contact-card.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
   
    ListComponent,
    AboutComponent,
    ContactCardComponent,
    ContactModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    NgxMaskDirective
  ],
  providers: [
    provideNgxMask()
  ]
})
export class FeaturesModule { }
