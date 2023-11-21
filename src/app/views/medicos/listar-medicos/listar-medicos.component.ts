import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListarMedicoViewModel } from '../models/listar-medico.vew-model';
import { map } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-listar-medicos',
  templateUrl: './listar-medicos.component.html',
  styleUrls: ['./listar-medicos.component.scss']
})
export class ListarMedicosComponent implements OnInit{
  medicos: ListarMedicoViewModel[] = [];

  constructor(
    private toastService: ToastrService,
    private route: ActivatedRoute) {
      
  }
  ngOnInit(): void {
    this.route.data.pipe(map((dados) => dados['medicos'])).subscribe({
      next: (_medicos) => this.obterMedicos(_medicos),
      error: (erro) => this.processarFalha(erro),
    });
  }

  obterMedicos(medicos: ListarMedicoViewModel[]) {
    this.medicos = medicos;
  }

  processarFalha(erro: Error) {
    this.toastService.error(erro.message, 'Erro');
  }
}
