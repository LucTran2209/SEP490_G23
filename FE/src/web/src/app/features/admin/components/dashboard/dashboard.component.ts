import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FeatureAppState } from '../../../../store/featureApp.state';
import { selectDataUser } from '../../../auth/state/auth.feature';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  constructor(private store: Store<FeatureAppState>) {
    this.store.select(selectDataUser).subscribe({
      next: (res) => {console.log('after reload line 15:',res)}
    })
    
  }
}
