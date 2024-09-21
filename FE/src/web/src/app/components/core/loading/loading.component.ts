import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';

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

  ) { }

 
  ngOnInit(): void {
  }


}
