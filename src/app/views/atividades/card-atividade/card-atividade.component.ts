import { Component, Input } from '@angular/core';
import { ListarAtividadeViewModel } from '../models/listar-atividades.view-model';

@Component({
  selector: 'app-card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.scss']
})
export class CardAtividadeComponent {
  @Input({ required: true }) atividade!: ListarAtividadeViewModel;

  constructor() {
  }
  tituloCard = `Atividade`
}
