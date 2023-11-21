import { TipoAtividadeEnum } from "./tipoAtividade.enum";

export type VisualizarAtividadeViewModel = {
  id: string;
  paciente: string;
  data: Date;
  horatioTermino: string;
  horatioInicio: string;
  tipoAtividade: TipoAtividadeEnum;
  listaMedicos: string[];
}