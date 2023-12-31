import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardModule } from './views/dashboard/dashboard.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MedicosModule } from './views/medicos/medicos.module';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    MatCardModule,
    MatButtonModule,
    MatIconModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 5100,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    
    CoreModule,
    DashboardModule,
    MedicosModule
  ],
  providers: [
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
