import { AfterContentChecked, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loading.service';
import { Observable } from 'rxjs';
import { StatusProcess } from './interfaces/anonymous.interface';
import { ActivatedRoute, ActivationEnd, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit{
  loading$?: Observable<StatusProcess>;
  constructor(private loadingService: LoadingService, private route: ActivatedRoute) {
    this.loading$ = this.loadingService.status$;
  }

  ngOnInit(): void {
  }
}
