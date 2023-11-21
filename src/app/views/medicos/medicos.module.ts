import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicosRoutingModule } from './medicos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InserirMedicosComponent } from './inserir-medicos/inserir-medicos.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { CardMedicoComponent } from './card-medico/card-medico.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MedicoService } from './services/medico.service';

@NgModule({
  declarations: [
    InserirMedicosComponent,
    ListarMedicosComponent,
    CardMedicoComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    ReactiveFormsModule,  
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule 
  ],
  providers: [
    MedicoService
  ],
})
export class MedicosModule { }
