import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, map, throwError } from "rxjs";
import { ListarAtividadeViewModel } from "../models/listar-atividades.view-model";
import { FormsAtividadeViewModel } from "../models/forms-atividade.view-model";
import { VisualizarAtividadeViewModel } from "../models/visualizar-atividades.view-model";

@Injectable()
export class AtividadeService {


  private endpoint: string =
    'https://localhost:7186/api/atividades/';

  constructor(
    private http: HttpClient,
  ) {}

  public inserir(
    atividade: FormsAtividadeViewModel
  ): Observable<FormsAtividadeViewModel> {
    return this.http
      .post<any>(this.endpoint, atividade)
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

  selecionarMedicoCompletoPorId(
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
}