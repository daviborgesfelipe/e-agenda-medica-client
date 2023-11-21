export type VisualizarMedicoViewModel = {
  id: string;
  nome: string;
  especialidade: string;
  crm: string;
  listaAtividades: ListarAtividadesViewModel[];
};

export type ListarAtividadesViewModel = {
  id: string;
  paciente: string;
  data: string;
  horarioTermino: string;
  horarioInicio: string;
  tipoAtividade: number;
}