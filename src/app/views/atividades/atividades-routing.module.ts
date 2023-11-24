import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';

import { AtividadeService } from './services/atividade.service';
import { InserirAtividadesComponent } from './inserir-atividades/inserir-atividades.component';
import { EditarAtividadesComponent } from './editar-atividades/editar-atividades.component';
import { ListarAtividadesComponent } from './listar-atividades/listar-atividades.component';
import { ListarMedComMaisAtvdPeriodoComponent } from './listar-med-com-mais-atvd-periodo/listar-med-com-mais-atvd-periodo.component';
import { ExcluirAtividadesComponent } from './excluir-atividades/excluir-atividades.component';

import { ListarAtividadeViewModel } from './models/listar-atividades.view-model';
import { FormsAtividadeViewModel } from './models/forms-atividade.view-model';
import { VisualizarAtividadeViewModel } from './models/visualizar-atividades.view-model';

const listarAtividadeResolver: ResolveFn<ListarAtividadeViewModel[]> = () => {
  return inject(AtividadeService).selecionarTodos();
};

const editarMedicosResolver: ResolveFn<VisualizarAtividadeViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(AtividadeService).selecionarAtividadeCompletoPorId(route.paramMap.get('id')!);
};

const visualizarMedicoResolver: ResolveFn<FormsAtividadeViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(AtividadeService).selecionarPorId(
    route.paramMap.get('id')!
  );
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full',
  },
  {
    path: 'listar',
    component: ListarAtividadesComponent,
    resolve: { atividades: listarAtividadeResolver },
  },
  {
    path: 'inserir',
    component: InserirAtividadesComponent
  },
  {
    path: 'editar/:id',
    component: EditarAtividadesComponent,
    resolve: { atividade: editarMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirAtividadesComponent,
    resolve: { atividade: visualizarMedicoResolver },
  },
  {
    path: 'medicos-mais-horas-trabalhadas',
    component: ListarMedComMaisAtvdPeriodoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadesRoutingModule { }
