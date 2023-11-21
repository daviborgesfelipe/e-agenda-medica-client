import { NgModule, inject } from '@angular/core';
import { ResolveFn, RouterModule, Routes } from '@angular/router';
import { ListarAtividadesComponent } from './listar-atividades/listar-atividades.component';
import { ListarAtividadeViewModel } from './models/listar-atividades.view-model';
import { AtividadeService } from './services/atividade.service';
import { InserirAtividadesComponent } from './inserir-atividades/inserir-atividades.component';

const listarMedicosResolver: ResolveFn<ListarAtividadeViewModel[]> = () => {
  return inject(AtividadeService).selecionarTodos();
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
    resolve: { atividades: listarMedicosResolver },
  },
  {
    path: 'inserir',
    component: InserirAtividadesComponent,
    resolve: { atividades: listarMedicosResolver },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtividadesRoutingModule { }
