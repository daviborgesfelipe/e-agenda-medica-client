import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent as NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
  ],
  exports: [
    NavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatDividerModule
  ]
})
export class CoreModule { }
