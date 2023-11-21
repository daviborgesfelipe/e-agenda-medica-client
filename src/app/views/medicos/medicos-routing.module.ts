import { NgModule, inject } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { InserirMedicosComponent } from './inserir-medicos/inserir-medicos.component';
import { ListarMedicoViewModel } from './models/listar-medico.vew-model';
import { MedicoService } from './services/medico.service';

const listarMedicosResolver: ResolveFn<ListarMedicoViewModel[]> = () => {
  return inject(MedicoService).selecionarTodos();
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarMedicosComponent,
    resolve: { medicos: listarMedicosResolver },
  },
  {
    path: 'inserir',
    component: InserirMedicosComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicosRoutingModule { }
