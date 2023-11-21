import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AtividadesRoutingModule } from './atividades-routing.module';
import { CardAtividadeComponent } from './card-atividade/card-atividade.component';
import { ListarAtividadesComponent } from './listar-atividades/listar-atividades.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AtividadeService } from './services/atividade.service';
import { InserirAtividadesComponent } from './inserir-atividades/inserir-atividades.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    CardAtividadeComponent,
    ListarAtividadesComponent,
    InserirAtividadesComponent
  ],
  imports: [
    CommonModule,
    NgSelectModule,
    AtividadesRoutingModule,  
    ReactiveFormsModule,  
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule ,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [
    AtividadeService
  ],
})
export class AtividadesModule { }
