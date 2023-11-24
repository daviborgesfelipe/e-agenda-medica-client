import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

import { ListarAtividadeViewModel } from '../models/listar-atividades.view-model';

@Component({
  selector: 'app-listar-atividades',
  templateUrl: './listar-atividades.component.html',
  styleUrls: ['./listar-atividades.component.scss']
})
export class ListarAtividadesComponent implements OnInit{
  atividades: ListarAtividadeViewModel[] = [];

  constructor(
    private toastService: ToastrService,
    private route: ActivatedRoute) {
      
  }
  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['atividades'])).subscribe({
      next: (_atividades) => this.obterAtividades(_atividades),
      error: (erro) => this.processarFalha(erro),
    });
  }
  
  obterAtividades(atividades: ListarAtividadeViewModel[]) {
    this.atividades = atividades;
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Erro');
  }
}
