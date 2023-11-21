import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InserirMedicoViewModel } from '../models/inserir-medico.view-model';
import { MedicoService } from '../services/medico.service';
import { EditarMedicoViewModel } from '../models/editar-medico.view-model';
import { map } from 'rxjs';

@Component({
  selector: 'app-editar-medicos',
  templateUrl: './editar-medicos.component.html',
  styleUrls: ['./editar-medicos.component.scss']
})
export class EditarMedicosComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private medicoService: MedicoService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ){
    console.log(this.medico)
  }
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      nome: new FormControl('', [Validators.required]),
      especialidade: new FormControl('', [Validators.required]),
      crm: new FormControl('', [Validators.required]),
    });

    this.route.data.pipe(map((dados) => dados['medico'])).subscribe({
      next: (medico) => this.obterMedico(medico),
      error: (erro) => this.processarFalha(erro),
    });
  }
    
    
    formulario!: FormGroup;

    medico!: EditarMedicoViewModel;
  
  
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
  
      this.medico = this.formulario.value
  
      const id = this.route.snapshot.paramMap.get('id');

      if (!id) return;

      this.medicoService.editar(id ,this.medico).subscribe(
        {
          next: (medico: EditarMedicoViewModel) => this.processarSucesso(medico),
          error: (erro: Error) => this.processarFalha(erro),
        }
      );
    }
  
    processarSucesso(medico: EditarMedicoViewModel) {
      this.toastrService.success(
        `A medico "${medico.nome}" foi cadastrada com sucesso!`,
        'Sucesso'
      );
  
      this.router.navigate(['/medicos/listar']);
    }
  
    processarFalha(erro: Error) {
      this.toastrService.error(erro.message, 'Error');
    }
    obterMedico(medico: EditarMedicoViewModel) {
      this.medico = medico;
      this.formulario.patchValue(this.medico);
    }
}
