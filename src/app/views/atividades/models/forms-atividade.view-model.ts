import { ListarMedicoViewModel } from "../../medicos/models/listar-medico.vew-model";
import { TipoAtividadeEnum } from "./tipoAtividade.enum";

export type FormsAtividadeViewModel = {
  paciente: string;
  data: Date;
  horarioTermino: string;
  horarioInicio: string;
  tipoAtividade: TipoAtividadeEnum;
  listaMedicos: any[];
}