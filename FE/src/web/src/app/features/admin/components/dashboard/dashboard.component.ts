import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../../../../store/app.state';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private store: Store<FeatureAppState>) {}
}
