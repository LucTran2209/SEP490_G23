import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartEvent,
} from 'chart.js/auto';
import {
  chooseFollowDate,
  LocalStorageKey,
} from '../../../../../../utils/constant';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  getDATACHARTSUBCATEGORY,
  getDATACHARTSUBCATEGORY_resetState,
} from '../../../../state/_chart/chartTopSubCategory-overview.actions';
import { IPayLoad } from '../../../../../../interfaces/account.interface';
import { StorageService } from '../../../../../../services/storage.service';
import dayjs from 'dayjs';
import {
  selectLabelsCategory,
  selectTotalsQuantity,
} from '../../../../state/_chart/chartTopSubCategory-overview.reducer';
import { BaseChartDirective } from 'ng2-charts';
@Component({
  selector: 'app-sub-category-statistic',
  templateUrl: './sub-category-statistic.component.html',
  styleUrl: './sub-category-statistic.component.scss',
})
export class SubCategoryStatisticComponent implements OnInit, OnDestroy {
  chooseFollowDate = chooseFollowDate;
  labelData$?: Observable<string[]>;
  quantityData$?: Observable<number[]>;
  userCurrent?: IPayLoad;
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private subscriptions: Subscription = new Subscription();
  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Số lượng được thuê của từng loại sản phẩm',
        },
        position: 'bottom',
      },
      y: {
        title: {
          display: true,
          text: 'Tên loại sản phẩm',
        },
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        callbacks: {
          title: function (context) {
            const label = context[0].label;
            return `Tên loại sản phẩm: ${label}`;
          },
          labelTextColor: function () {
            return '#000';
          },
        },
      },
    },
  };
  barChartType = 'bar' as const;

  barChartData: ChartData<'bar'> = {
    // labels: ['SP1', 'SP2', 'SP3', 'SP4', 'SP5', 'SP6', 'SP7'],
    labels: [],
    datasets: [
      {
        // data: [28, 48, 40, 19, 86, 27, 90],
        data: [],
        label: 'Số lần được thuê',
        backgroundColor: 'rgba(15, 108, 248, 0.7)',
        borderColor: '#aad0f0',
        borderWidth: 1,
      },
    ],
  };

  // events
  chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }

  chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    // console.log(event, active);
  }
  getRangeDate(typeChoose: string | number) {
    let fromDate, toDate;
    toDate = dayjs().endOf('month').format('YYYY-MM-DD');

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
        .subtract(12, 'month')
        .startOf('month')
        .format('YYYY-MM-DD');
    }
    this.loadData({ StartDate: fromDate, EndDate: toDate, typeChoose });
  }

  loadData(valDate: object) {
    if (this.userCurrent) {
      const bodyReq = {
        RentaiShopId: this.userCurrent.RentalShopId,
        ...valDate,
      };
      this.store.dispatch(getDATACHARTSUBCATEGORY({ bodyReq }));
    }
  }

  refreshChart(): void {
    if (this.chart) {
      this.chart.update();
    }
  }

  constructor(private store: Store, private storageService: StorageService) {
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
  }

  ngOnInit() {
    this.getRangeDate('month');
    this.labelData$ = this.store.select(selectLabelsCategory);
    this.quantityData$ = this.store.select(selectTotalsQuantity);

    this.subscriptions.add(
      this.labelData$.subscribe((labels) => {
        this.barChartData.labels = labels;
        this.refreshChart();
      })
    );
    this.subscriptions.add(
      this.quantityData$.subscribe((data) => {
        this.barChartData.datasets[0].data = data;
        this.refreshChart();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(getDATACHARTSUBCATEGORY_resetState());
  }
}
