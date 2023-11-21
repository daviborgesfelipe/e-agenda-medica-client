import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './services/services.service';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule, 
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule 
  ],
  exports: [LoadingComponent],
  providers: [LoadingService],
})
export class LoadingModule { }
