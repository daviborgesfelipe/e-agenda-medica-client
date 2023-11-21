import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../services/medico.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VisualizarMedicoViewModel } from '../models/visualizar-medico.view-model';
import { InserirMedicoViewModel } from '../models/inserir-medico.view-model';

@Component({
  selector: 'app-excluir-medicos',
  templateUrl: './excluir-medicos.component.html',
  styleUrls: ['./excluir-medicos.component.scss']
})
export class ExcluirMedicosComponent implements OnInit {
  medico?: VisualizarMedicoViewModel;

  constructor(
    private medicoService: MedicoService,
    private toastrService: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.medico = this.route.snapshot.data['medico'];
    console.log("==>", this.medico?.id)
  }

  gravar() {
    this.medicoService.excluir(this.medico!.id).subscribe(
      {
        next: (medico: InserirMedicoViewModel) => this.processarSucesso(medico),
        error: (erro: Error) => this.processarFalha(erro),
      }
    );
  }

  processarSucesso(medico: InserirMedicoViewModel) {
    this.toastrService.success(
      `A medico foi excluido com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}