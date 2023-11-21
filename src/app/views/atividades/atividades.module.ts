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


@NgModule({
  declarations: [
    CardAtividadeComponent,
    ListarAtividadesComponent
  ],
  imports: [
    CommonModule,
    AtividadesRoutingModule,  
    ReactiveFormsModule,  
    MatCardModule,  
    MatButtonModule, 
    MatDividerModule,
    MatProgressBarModule 
  ],
  providers: [
    AtividadeService
  ],
})
export class AtividadesModule { }
