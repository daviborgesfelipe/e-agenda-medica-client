import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MedicosRoutingModule } from './medicos-routing.module';

import { MedicoService } from './services/medico.service';
import { CardMedicoComponent } from './card-medico/card-medico.component';
import { InserirMedicosComponent } from './inserir-medicos/inserir-medicos.component';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { EditarMedicosComponent } from './editar-medicos/editar-medicos.component';
import { ExcluirMedicosComponent } from './excluir-medicos/excluir-medicos.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatIconModule} from '@angular/material/icon'

@NgModule({
  declarations: [
    InserirMedicosComponent,
    ListarMedicosComponent,
    CardMedicoComponent,
    EditarMedicosComponent,
    ExcluirMedicosComponent
  ],
  imports: [
    CommonModule,
    MedicosRoutingModule,
    ReactiveFormsModule,  
    MatIconModule,
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule ,
    MatFormFieldModule,
  ],
  providers: [
    MedicoService
  ],
})
export class MedicosModule { }
