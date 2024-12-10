import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BaseComponentsComponent } from './components/base-components/base-components.component';
import { StatusProcess } from './interfaces/anonymous.interface';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseComponentsComponent implements OnInit {
  loading$?: Observable<StatusProcess>;
  constructor(
    private loadingService: LoadingService,
    private router: Router
  ) {
    super();
    this.loading$ = this.loadingService.status$;
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.scrollToTop();
      }
    });
  }
}
