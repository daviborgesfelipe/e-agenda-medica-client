import { TipoAtividadeEnum } from "./tipoAtividade.enum";

export type ListarAtividadeViewModel = {
  id: string;
  paciente: string;
  data: Date;
  horarioTermino: string;
  horarioInicio: string;
  tipoAtividade: TipoAtividadeEnum;
}