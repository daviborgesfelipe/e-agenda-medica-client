import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { MedicoService } from '../../medicos/services/medico.service';
import { AtividadeService } from '../services/atividade.service';
import { FormsAtividadeViewModel } from '../models/forms-atividade.view-model';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.vew-model';
import { TipoAtividadeEnum } from '../models/tipoAtividade.enum';

import '../../../extensions/form-group.extension'

@Component({
  selector: 'app-editar-atividades',
  templateUrl: './editar-atividades.component.html',
  styleUrls: ['./editar-atividades.component.scss']
})
export class EditarAtividadesComponent implements OnInit{
  formulario!: FormGroup;
  atividadeViewModel!: FormsAtividadeViewModel;
  medicos: ListarMedicoViewModel[] = [];
  minhaDataControl = new FormControl('2023-11-22');


  constructor(
    private formBuilder: FormBuilder,
    private atividadeService: AtividadeService,
    private medicoService: MedicoService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
        paciente: new FormControl('', [Validators.required]),
        data: new FormControl('2023-11-22', [Validators.required]),
        horarioInicio: new FormControl('08:00', [Validators.required]),
        horarioTermino: new FormControl('09:00', [Validators.required]),
        tipoAtividade: new FormControl('', [Validators.required]),
        listaMedicos: new FormControl('', [Validators.required]),
      });

      this.atividadeViewModel = this.route.snapshot.data['atividade'];

      console.log("ngOninit", this.atividadeViewModel)

      this.medicoService.selecionarTodos().subscribe((_medicos) => {

        this.medicos = _medicos;

        if(this.atividadeViewModel.tipoAtividade == TipoAtividadeEnum.Cirurgia){

          // Pré-selecione os médicos na listaMedicos do formulário
          const idsMedicosSelecionados = this.atividadeViewModel.listaMedicos.map((medico) => medico.id);

          this.formulario.patchValue(
            { 
              listaMedicos: idsMedicosSelecionados[0] ,
              data: this.atividadeService.formatStringToData(this.formulario.value.data) ,
            }
          );

        }

        if(this.atividadeViewModel.tipoAtividade == TipoAtividadeEnum.Consulta){
          
          // Pré-selecione os médicos na listaMedicos do formulário
          const idsMedicosSelecionados = this.atividadeViewModel.listaMedicos.map((medico) => medico.id);
          
          this.formulario.patchValue(
            { 
              listaMedicos: idsMedicosSelecionados ,
              data: this.atividadeService.formatStringToData(this.formulario.value.data) ,

            });
        }
      });

      this.formulario.patchValue(this.atividadeViewModel!);
    }
    
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
      
      this.atividadeViewModel.listaMedicos = [];
      
      var dataFormatada = this.atividadeService.formatDateToString(this.formulario.value.data)
      
      this.atividadeViewModel = { ...this.formulario.value,  data: dataFormatada, };

      const id = this.route.snapshot.paramMap.get('id');

      if (!id) return;
      
      this.atividadeService.editar(id, this.atividadeViewModel).subscribe(
        {
          next: (atividade: FormsAtividadeViewModel) => this.processarSucesso(atividade),
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
  
