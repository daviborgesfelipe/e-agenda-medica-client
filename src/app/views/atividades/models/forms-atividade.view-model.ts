import { TipoAtividadeEnum } from "./tipoAtividade.enum";

export type FormsAtividadeViewModel = {
  paciente: string;
  data: Date;
  horatioTermino: string;
  horatioInicio: string;
  tipoAtividade: TipoAtividadeEnum;
  listaMedicos: string[];
}