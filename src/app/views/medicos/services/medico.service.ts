import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ListarMedicoViewModel } from "../models/listar-medico.vew-model";
import { Observable, catchError, map, throwError } from "rxjs";
import { InserirMedicoViewModel } from "../models/inserir-medico.view-model";
import { EditarMedicoViewModel } from "../models/editar-medico.view-model";
import { VisualizarMedicoViewModel } from "../models/visualizar-medico.view-model";

@Injectable()
export class MedicoService {


  private endpoint: string =
    'https://localhost:7186/api/medicos/';

  constructor(
    private http: HttpClient,
  ) {}

  public inserir(
    categoria: InserirMedicoViewModel
  ): Observable<InserirMedicoViewModel> {
    return this.http
      .post<any>(this.endpoint, categoria)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public editar(id: string, medico: EditarMedicoViewModel) {
    return this.http
      .put<any>(this.endpoint + id, medico)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => {
          console.log(err)
          return this.processarErroHttp(err)
        })
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

  public selecionarTodos(): Observable<ListarMedicoViewModel[]> {
    return this.http
      .get<any>(this.endpoint)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  public selecionarPorId(id: string): Observable<InserirMedicoViewModel> {
    return this.http
      .get<any>(this.endpoint + id)
      .pipe(
        map((res) => res.dados),
        catchError((err: HttpErrorResponse) => this.processarErroHttp(err))
      );
  }

  selecionarMedicoCompletoPorId(
    id: string
  ): Observable<VisualizarMedicoViewModel> {
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