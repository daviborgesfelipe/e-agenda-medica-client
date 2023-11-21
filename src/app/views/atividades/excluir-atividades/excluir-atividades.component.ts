import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarMedicoViewModel } from '../../medicos/models/visualizar-medico.view-model';
import { AtividadeService } from '../services/atividade.service';
import { FormsAtividadeViewModel } from '../models/forms-atividade.view-model';
import { VisualizarAtividadeViewModel } from '../models/visualizar-atividades.view-model';

@Component({
  selector: 'app-excluir-atividades',
  templateUrl: './excluir-atividades.component.html',
  styleUrls: ['./excluir-atividades.component.scss']
})
export class ExcluirAtividadesComponent  implements OnInit {
  atividade?: VisualizarAtividadeViewModel;

  constructor(
    private atividadeService: AtividadeService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.atividade = this.route.snapshot.data['atividade'];
  }

  gravar() {
    this.atividadeService.excluir(this.atividade!.id).subscribe(
      {
        next: (atividade: FormsAtividadeViewModel) => this.processarSucesso(atividade),
        error: (erro: Error) => this.processarFalha(erro),
      }
    );
  }

  processarSucesso(atividade: FormsAtividadeViewModel) {
    this.toastrService.success(
      `A atividade foi excluido com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/atividades/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
