import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MedicoService } from '../../medicos/services/medico.service';
import { FormsAtividadeViewModel } from '../models/forms-atividade.view-model';
import { AtividadeService } from '../services/atividade.service';
import { ListarMedicoViewModel } from '../../medicos/models/listar-medico.vew-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-atividades',
  templateUrl: './editar-atividades.component.html',
  styleUrls: ['./editar-atividades.component.scss']
})
export class EditarAtividadesComponent implements OnInit{
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
        data: new FormControl('19/11/2023', [Validators.required,]),
        horarioInicio: new FormControl('08:00', [Validators.required]),
        horarioTermino: new FormControl('09:00', [Validators.required]),
        tipoAtividade: new FormControl('', [Validators.required]),
        listaMedicos: new FormControl('', [Validators.required]),
      });

      this.medicoService.selecionarTodos().subscribe((_medicos) => (this.medicos = _medicos));

      this.route.data.pipe(map((dados) => dados['atividade'])).subscribe({
        next: (atividade) => this.obterAtividade(atividade),
        error: (erro) => this.processarFalha(erro),
      });
    }

    obterAtividade(atividade: FormsAtividadeViewModel) {
      this.atividadeViewModel = atividade;
      this.formulario.patchValue(this.atividadeViewModel);
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
      
      // Convertendo a data para o formato desejado (yyyy/MM/dd)
      const dataFormatada = formatDate(
        this.formulario.value.data,
        'yyyy/MM/dd',
        'en-US' // Você pode ajustar isso para o seu locale
      );

      // Criando o objeto a ser enviado
      this.atividadeViewModel = {
       ...this.formulario.value,
       data: dataFormatada,
      };

      const id = this.route.snapshot.paramMap.get('id');

      if (!id) return;
      
      console.log(this.atividadeViewModel)
  
      this.atividadeService.editar(id, this.atividadeViewModel).subscribe(
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
  