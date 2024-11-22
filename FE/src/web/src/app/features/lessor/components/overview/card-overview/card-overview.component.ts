import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IPayLoad } from '../../../../../interfaces/account.interface';
import { ResponseCardOverview } from '../../../../../services/dashboard-lessor.service';
import { StorageService } from '../../../../../services/storage.service';
import { FeatureAppState } from '../../../../../store/app.state';
import { LocalStorageKey } from '../../../../../utils/constant';
import dayjs from 'dayjs';
import {
  getAllCardOverview,
  getAllCardOverview_resetState,
} from '../../../state/_card-overview/card-overview.actions';
import { selectData } from '../../../state/_card-overview/card-overview.reducer';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-card-overview',
  templateUrl: './card-overview.component.html',
  styleUrl: './card-overview.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardOverviewComponent implements OnInit, OnDestroy {
  data$?: Observable<ResponseCardOverview>;
  userCurrent?: IPayLoad;
  convertSlug = convertSlug;
  loadAllCard(rangeDate: object) {
    if (this.userCurrent) {
      let reqBody = {
        RentaiShopId: this.userCurrent.RentalShopId,
        ...rangeDate,
      };
      this.store.dispatch(getAllCardOverview({ bodyReq: reqBody }));
    }
  }

  getRangeDate(typeChoose: 'day' | 'month' | 'week') {
    let fromDate, toDate;
    toDate = dayjs().format('YYYY-MM-DD');

    if (typeChoose === 'month') {
      fromDate = dayjs()
        .subtract(12, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
    } else if (typeChoose === 'week') {
      fromDate = dayjs()
        .subtract(10, 'week')
        .startOf('week')
        .format('YYYY-MM-DD');
    } else {
      fromDate = dayjs()
        .subtract(30, 'day')
        .startOf('day')
        .format('YYYY-MM-DD');
    }
    this.loadAllCard({ EndDate: toDate, StartDate: fromDate });
    this.reWriteUrl(typeChoose);
  }

  reWriteUrl(typeChoose: 'day' | 'month' | 'week') {
    const tmp = convertSlug[typeChoose];
    this.router.navigate([], {
      queryParams: {
        'card-overview-follow': tmp,
      },
      queryParamsHandling: 'merge',
    });
  }

  constructor(
    private store: Store<FeatureAppState>,
    private storageService: StorageService,
    private router: Router
  ) {
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
  }

  ngOnDestroy(): void {
    this.store.dispatch(getAllCardOverview_resetState());
  }

  ngOnInit(): void {
    this.getRangeDate('day');
    this.data$ = this.store.select(selectData);
  }
}

const convertSlug = {
  day: 'last-30-days',
  week: 'last-10-weeks',
  month: 'last-12-months',
};
