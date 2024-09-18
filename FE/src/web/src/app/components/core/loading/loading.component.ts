import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class LoadingComponent implements OnInit {
  isProcessLoading: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    // private _loading: LoadingService

  ) { }

 
  ngOnInit(): void {
    // this.listenToLoading();
  }

  // listenToLoading(): void {
  //   this._loading.loadingSub
  //     .pipe(delay(2000))
  //     .subscribe((loading) => {
  //       this.isProcessLoading = loading;
  //     });
  // }
}
