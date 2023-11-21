import { Component, OnInit } from '@angular/core';
import { InserirMedicoViewModel } from '../models/inserir-medico.view-model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MedicoService } from '../services/medico.service';
import { ToastrService } from 'ngx-toastr';
import '../../../extensions/form-group.extension'

@Component({
  selector: 'app-inserir-medicos',
  templateUrl: './inserir-medicos.component.html',
  styleUrls: ['./inserir-medicos.component.scss']
})
export class InserirMedicosComponent implements OnInit{

constructor(
  private formBuilder: FormBuilder,
  private medicoService: MedicoService,
  private toastrService: ToastrService,
  private router: Router
){}

ngOnInit(): void {
  this.formulario = this.formBuilder.group({
    nome: new FormControl('', [Validators.required]),
    especialidade: new FormControl('', [Validators.required]),
    crm: new FormControl('', [Validators.required]),
  });
}
  
  
  formulario!: FormGroup;
  categoriaViewModel!: InserirMedicoViewModel;


  campoEstaInvalido(nome: string) {
    const campo = this.formulario?.get(nome);
    return campo ? campo.touched && campo.invalid : false;
  } 
  
  gravar() {
    if (this.formulario.invalid) {
      for (let erro of this.formulario.validate()) {
        this.toastrService.warning(erro);
      }

      return;
    }

    this.categoriaViewModel = this.formulario.value

    this.medicoService.inserir(this.formulario?.value).subscribe(
      {
        next: (medico: InserirMedicoViewModel) => this.processarSucesso(medico),
        error: (erro: Error) => this.processarFalha(erro),
      }
    );
  }

  processarSucesso(medico: InserirMedicoViewModel) {
    this.toastrService.success(
      `A medico "${medico.nome}" foi cadastrada com sucesso!`,
      'Sucesso'
    );

    this.router.navigate(['/medicos/listar']);
  }

  processarFalha(erro: Error) {
    this.toastrService.error(erro.message, 'Error');
  }
}
