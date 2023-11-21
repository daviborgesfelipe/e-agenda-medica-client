import { NgModule, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarAtividadesComponent } from './listar-atividades/listar-atividades.component';
import { ListarAtividadeViewModel } from './models/listar-atividades.view-model';
import { AtividadeService } from './services/atividade.service';
import { InserirAtividadesComponent } from './inserir-atividades/inserir-atividades.component';
import { EditarAtividadesComponent } from './editar-atividades/editar-atividades.component';
import { FormsAtividadeViewModel } from './models/forms-atividade.view-model';
import { ExcluirAtividadesComponent } from './excluir-atividades/excluir-atividades.component';

const listarAtividadeResolver: ResolveFn<ListarAtividadeViewModel[]> = () => {
  return inject(AtividadeService).selecionarTodos();
};

const editarrMedicosResolver: ResolveFn<FormsAtividadeViewModel> = (
  route: ActivatedRouteSnapshot
) => {
  return inject(AtividadeService).selecionarPorId(route.paramMap.get('id')!);
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
    resolve: { atividade: editarrMedicosResolver },
  },
  {
    path: 'excluir/:id',
    component: ExcluirAtividadesComponent,
    resolve: { atividade: visualizarMedicoResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadesRoutingModule { }