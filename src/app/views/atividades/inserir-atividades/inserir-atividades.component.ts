import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InserirMedicoViewModel } from '../../medicos/models/inserir-medico.view-model';
import { MedicoService } from '../../medicos/services/medico.service';
import { AtividadeService } from '../services/atividade.service';
import { FormsAtividadeViewModel } from '../models/forms-atividade.view-model';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.vew-model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-inserir-atividades',
  templateUrl: './inserir-atividades.component.html',
  styleUrls: ['./inserir-atividades.component.scss']
})
export class InserirAtividadesComponent implements OnInit{
  constructor(
    private formBuilder: FormBuilder,
    private atividadeService: AtividadeService,
    private medicoService: MedicoService,
    private toastrService: ToastrService,
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      paciente: new FormControl('', [Validators.required]),
      data: new FormControl('19/11/2023', [
        Validators.required,
      ]),
      horarioInicio: new FormControl('08:00', [Validators.required]),
      horarioTermino: new FormControl('09:00', [Validators.required]),
      tipoAtividade: new FormControl('', [Validators.required]),
      listaMedicos: new FormControl('', [Validators.required]),
    });

    this.medicoService
    .selecionarTodos()
    .subscribe((_medicos) => (this.medicos = _medicos));
  }
    
    
    formulario!: FormGroup;
    atividadeViewModel!: FormsAtividadeViewModel;
    medicos: ListarMedicoViewModel[] = [];
  
    campoEstaInvalido(nome: string) {
      const campo = this.formulario?.get(nome);
      return campo ? campo.touched && campo.invalid : false;
    } 
    

    isConsulta(): any {
      return this.formulario.get('tipoAtividade')?.value === 0;
    }

    isCirurgia(): any {
      return this.formulario.get('tipoAtividade')?.value === 1;
    }

    gravar() {
      if (this.formulario.invalid) {
        for (let erro of this.formulario.validate()) {
          this.toastrService.warning(erro);
        }
  
        return;
      }
      
      
      const dataFormatada = formatDate( this.formulario.value.data, 'yyyy/MM/dd', 'en-US' );

      
      this.atividadeViewModel = { ...this.formulario.value,  data: dataFormatada, };

      this.atividadeService.inserir(this.atividadeViewModel).subscribe(
        {
          next: (medico: FormsAtividadeViewModel) => this.processarSucesso(medico),
          error: (erro: Error) => this.processarFalha(erro),
        }
      );
    }
  
    processarSucesso(medico: FormsAtividadeViewModel) {
      this.toastrService.success(
        `A Atividade com o paciente "${medico.paciente}" foi cadastrada com sucesso!`,
        'Sucesso'
      );
  
      this.router.navigate(['/atividades/listar']);
    }
  
    processarFalha(erro: Error) {
      this.toastrService.error(erro.message, 'Error');
    }
  }
  
