import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes, } from '@angular/router';

import { MedicoService } from './services/medico.service';
import { ListarMedicosComponent } from './listar-medicos/listar-medicos.component';
import { InserirMedicosComponent } from './inserir-medicos/inserir-medicos.component';
import { EditarMedicosComponent } from './editar-medicos/editar-medicos.component';
import { ExcluirMedicosComponent } from './excluir-medicos/excluir-medicos.component';

import { ListarMedicoViewModel } from './models/listar-medico.vew-model';
import { EditarMedicoViewModel } from './models/editar-medico.view-model';
import { InserirMedicoViewModel } from './models/inserir-medico.view-model';

const listarMedicosResolver: ResolveFn<ListarMedicoViewModel[]> = () => {
  return inject(MedicoService).selecionarTodos();
};

const editarrMedicosResolver: ResolveFn<EditarMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicoService).selecionarPorId(route.paramMap.get('id')!);
};

const visualizarMedicoResolver: ResolveFn<InserirMedicoViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(MedicoService).selecionarPorId(route.paramMap.get('id')!);
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
    component: InserirMedicosComponent,
  },
  {
    path: 'editar/:id',
    component: EditarMedicosComponent,
    resolve: { medico: editarrMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirMedicosComponent,
    resolve: { medico: visualizarMedicoResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicosRoutingModule {}
