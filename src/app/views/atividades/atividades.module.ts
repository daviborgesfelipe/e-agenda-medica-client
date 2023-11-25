import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AtividadesRoutingModule } from './atividades-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AtividadeService } from './services/atividade.service';
import { MedicoService } from '../medicos/services/medico.service';
import { CardAtividadeComponent } from './card-atividade/card-atividade.component';
import { InserirAtividadesComponent } from './inserir-atividades/inserir-atividades.component';
import { EditarAtividadesComponent } from './editar-atividades/editar-atividades.component';
import { ExcluirAtividadesComponent } from './excluir-atividades/excluir-atividades.component';
import { ListarAtividadesComponent } from './listar-atividades/listar-atividades.component';
import { ListarMedComMaisAtvdPeriodoComponent } from './listar-med-com-mais-atvd-periodo/listar-med-com-mais-atvd-periodo.component';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon'
import { MatTooltipModule } from '@angular/material/tooltip';


@NgModule({
  declarations: [
    CardAtividadeComponent,
    InserirAtividadesComponent,
    EditarAtividadesComponent,
    ExcluirAtividadesComponent,
    ListarAtividadesComponent,
    ListarMedComMaisAtvdPeriodoComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    RouterModule,
    NgbModule,
    AtividadesRoutingModule,  
    
    MatIconModule,
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatInputModule,
    MatTooltipModule
  ],
  providers: [
    AtividadeService,
    MedicoService,
    DatePipe,
    
  ],
})
export class AtividadesModule { }
