import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { formatDate } from "@angular/common";

import { ListarAtividadeViewModel } from "../models/listar-atividades.view-model";
import { FormsAtividadeViewModel } from "../models/forms-atividade.view-model";
import { VisualizarAtividadeViewModel } from "../models/visualizar-atividades.view-model";
import { MedicoComHoraViewModel } from "../models/listar-medicos-com-hora.view-model";

@Injectable()
export class AtividadeService {


  private endpoint: string =
    'https://localhost:7186/api/atividades/';

  constructor(
    private http: HttpClient,
  ) {}

  public inserir( atividade: FormsAtividadeViewModel ): Observable<FormsAtividadeViewModel> {
    return this.http
      .post<any>(this.endpoint, atividade)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, medico: FormsAtividadeViewModel) {
    console.log("public editar", medico)
    return this.http
      .put<any>(this.endpoint + id, medico)
      .pipe(
        map( (res) => res.dados ),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  excluir(id: string) {
    return this.http.delete<any>(
      this.endpoint + id)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarTodos(): Observable<ListarAtividadeViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarPorId(id: string): Observable<FormsAtividadeViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarMedMaisPorPeriodo(inicio: any, final:any): Observable<MedicoComHoraViewModel[]> {
    return this.http
      .get<any>(this.endpoint + 'medicos-mais-horas-trabalhadas/' + inicio + '/' + final)
      .pipe(
        map((res) => {
          return res.dados
        }),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  selecionarAtividadeCompletoPorId(
    id: string
  ): Observable<VisualizarAtividadeViewModel> {
    return this.http
      .get<any>(this.endpoint + 'visualizacao-completa/' + id)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  private processarErroHttp(erro: HttpErrorResponse) {
    let mensagemErro = '';

    if (erro.status == 0)
      mensagemErro = 'Ocorreu um erro ao processar a requisição.';
    if (erro.status == 401)
      mensagemErro =
        'O usuário não está autorizado. Efetue login e tente novamente.';
    else mensagemErro = erro.error?.erros[0];

    console.log(erro.error?.erros[0])

    return throwError(() => new Error(mensagemErro));
  }

  formatStringToData(data: any): string {
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
  }

  formatDateToString(date: Date): string {
    return formatDate(date, 'yyyy/MM/dd', 'en-US');
  } 
}