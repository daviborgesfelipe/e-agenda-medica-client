import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent as NavbarComponent } from './navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { LoadingModule } from './loading/loading.module';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    NgbModule,
    RouterModule,
    LoadingModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule
  ],
  exports: [
    NavbarComponent,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    LoadingModule
  ]
})
export class CoreModule { }
