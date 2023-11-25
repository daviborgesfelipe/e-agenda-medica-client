import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';

import { MedicoComHoraViewModel } from '../models/listar-medicos-com-hora.view-model';
import { AtividadeService } from '../services/atividade.service';

@Component({
  selector: 'app-listar-med-com-mais-atvd-periodo',
  templateUrl: './listar-med-com-mais-atvd-periodo.component.html',
  styleUrls: ['./listar-med-com-mais-atvd-periodo.component.scss']
})
export class ListarMedComMaisAtvdPeriodoComponent implements OnInit{
  
  constructor(
    private formBuilder: FormBuilder,
    private atividadeService: AtividadeService,
    private toastrService: ToastrService,
  ){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      dataInicio: new FormControl('',[Validators.required]),
      dataFinal: new FormControl('',[Validators.required]),
    })
  }


  datePipe = new DatePipe('en-US');
  formulario!: FormGroup;
  medicos: MedicoComHoraViewModel[] = [];

  dataSource: MatTableDataSource<MedicoComHoraViewModel> = new MatTableDataSource<MedicoComHoraViewModel>([]);  
  displayedColumns: string[] = ['Medico', 'Quantidade'];

  buscar() {
    if (this.formulario.invalid) {
      for (let erro of this.formulario.validate()) {
        this.toastrService.warning(erro);
      }
      
      return;
    }

    var dataInicioFormatada = this.datePipe.transform(this.formulario.value.dataInicio, 'yyyy-MM-dd');
    var dataFinalFormatada = this.datePipe.transform(this.formulario.value.dataFinal, 'yyyy-MM-dd');  

    this.atividadeService.selecionarMedMaisPorPeriodo(dataInicioFormatada, dataFinalFormatada).subscribe(
      {
        next: (medicos: MedicoComHoraViewModel[]) => this.obterMedicos(medicos),
        error: (erro: Error) => this.processarFalha(erro),
      }
    );
  }

  obterMedicos(medicos: MedicoComHoraViewModel[]) {
    this.medicos = medicos;
    this.medicos.sort((a, b) => {
      const totalA = new Date(`1970-01-01T${a.totalHorasTrabalhadas}Z`).getTime();
      const totalB = new Date(`1970-01-01T${b.totalHorasTrabalhadas}Z`).getTime();
    
      return totalB - totalA;
    });

    this.dataSource.data = this.medicos
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
