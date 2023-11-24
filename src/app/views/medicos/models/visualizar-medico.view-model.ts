import { ListarAtividadeViewModel } from '../../atividades/models/listar-atividades.view-model'
export type VisualizarMedicoViewModel = {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  listaAtividades: ListarAtividadeViewModel[];
};
