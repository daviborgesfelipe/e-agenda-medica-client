import { Component, OnInit } from '@angular/core';
import { Event, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { Observable } from 'rxjs';
import { LoadingService } from './core/loading/services/services.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'e-agenda-medica-client';
  estaCarregando$?: Observable<boolean>;

  constructor(private loadingService: LoadingService, private router: Router) {
    this.router.events.subscribe((event: Event) =>
      this.atualizarStatusCarregamento(event)
    );
  }

  ngOnInit(): void {
    this.estaCarregando$ = this.loadingService.obterStatusCarregamento();
  }

  atualizarStatusCarregamento(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loadingService.carregar();
    } else if (
      event instanceof NavigationEnd ||
      event instanceof NavigationCancel ||
      event instanceof NavigationError
    ) {
      this.loadingService.parar();
    }
  }
}