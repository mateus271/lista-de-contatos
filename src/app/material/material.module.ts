import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,MatSidenavModule,
    MatIconModule,MatButtonModule,
    MatToolbarModule
  ],
  exports:[MatSidenavModule,
    MatIconModule,MatButtonModule,
    MatToolbarModule,MatCardModule
  ]
})
export class MaterialModule { }
