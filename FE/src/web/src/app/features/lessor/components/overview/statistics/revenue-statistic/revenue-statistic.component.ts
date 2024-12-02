import { ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartData } from 'chart.js';
import dayjs from 'dayjs';
import { BaseChartDirective } from 'ng2-charts';
import { Observable, Subscription } from 'rxjs';
import { IPayLoad } from '../../../../../../interfaces/account.interface';
import { StorageService } from '../../../../../../services/storage.service';
import {
  chooseFollowDate,
  LocalStorageKey,
} from '../../../../../../utils/constant';
import { getDATACHARTREVENUE, getDATACHARTREVENUE_resetState } from '../../../../state/_chart/chartRevenue-overview.actions';
import { selectArrLabelData, selectArrRevenueData, selectArrTransactionData, selectTypeOption } from '../../../../state/_chart/chartRevenue-overview.reducer';

@Component({
  selector: 'app-revenue-statistic',
  templateUrl: './revenue-statistic.component.html',
  styleUrl: './revenue-statistic.component.scss',
})
export class RevenueStatisticComponent implements OnInit, OnDestroy {
  chooseFollowDate = chooseFollowDate;
  optionChooseDate$?: Observable<string>;  
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  barChartOptions: ChartConfiguration<'bar' | 'line'>['options'] = {
    plugins: {
      legend: {
        position: 'bottom' as 'bottom',
      },
      tooltip: {
        backgroundColor: 'white',
        titleColor: 'black',
        bodyColor: 'black',
        callbacks: {
          title: function (context) {
            const label = context[0].label;
            return `Tháng: ${label}`;
          },
          labelTextColor: function () {
            return '#000';
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        position: 'left' as 'left',
        ticks: {
          callback: (tickValue: string | number) => {
            const value =
              typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
            if (value >= 1e9) {
              return `${(value / 1e9).toFixed(1)}B`;
            } else if (value >= 1e6) {
              return `${(value / 1e6).toFixed(1)}M`;
            } else if (value >= 1e3) {
              return `${Math.floor(value / 1e3)}K`;
            }
            return value.toString();
          },
        },
        title: {
          display: true,
          text: 'Doanh thu (VND)',
        },
      },
      y1: {
        grid: {
          display: false,
        },
        position: 'right' as 'right',
        ticks: {
          callback: function (value: any) {
            return value;
          },
        },
        title: {
          display: true,
          text: 'Số lượng thanh khoản',
        },
      },
    },
  };

  barChartType = 'bar' as const;
  barChartData: ChartData<'line' | 'bar'> = {
    labels: [
    ],
    datasets: [
      {
        type: 'line' as const,
        label: 'Số lượng giao dịch',
        borderColor: 'rgb(20, 24, 31)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: 'rgb(20, 24, 31)',
        data: [],
        yAxisID: 'y1',
      },
      {
        type: 'bar' as const,
        label: 'Doanh thu',
        backgroundColor: '#1890FF',
        data: [],
        borderColor: 'white',
        borderRadius: {
          topLeft: 40,
          topRight: 40,
        },
        borderSkipped: false,
        barThickness: 40,
      },
    ],
  };
  userCurrent?: IPayLoad;
  labelData$?: Observable<string[]>;
  transactionData$?: Observable<number[]>;
  revenueData$?: Observable<number[]>;
  private subscriptions: Subscription = new Subscription();


  getRangeDate(typeChoose: string | number) {
    let fromDate, toDate;
    toDate = dayjs().endOf('month').format('YYYY-MM-DD');

    if (typeChoose === 'month') {
      fromDate = dayjs().endOf('month')
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
    this.loadData(
      { StartDate: fromDate, EndDate: toDate },
      typeChoose === 'week' ? 'w' : 'm'
    );
  }

  loadData(valDate: object, typeOption: 'm' | 'w' = 'm') {
    if (this.userCurrent) {
      const bodyReq = {
        RentaiShopId: this.userCurrent.RentalShopId,
        ...valDate,
      };
      this.store.dispatch(getDATACHARTREVENUE({ bodyReq, typeOption }));
    }
  }

  refreshChart(): void {
    if (this.chart) {
      this.chart.update(); 
    }
  }

  constructor(private store: Store, private storageService: StorageService, private cdRef: ChangeDetectorRef) {
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
  }

  ngOnInit() {
    this.getRangeDate('month');
    this.optionChooseDate$ = this.store.select(selectTypeOption);
    this.labelData$ = this.store.select(selectArrLabelData);
    this.transactionData$ = this.store.select(selectArrTransactionData);
    this.revenueData$ = this.store.select(selectArrRevenueData);

    this.subscriptions.add(
      this.labelData$.subscribe((labels) => {
        this.barChartData.labels = labels;
       this.refreshChart();
      })
    );
    this.subscriptions.add(
      this.transactionData$.subscribe((transactions) => {
        this.barChartData.datasets[0].data = transactions;
       this.refreshChart();

      })
    );
    this.subscriptions.add(
      this.revenueData$.subscribe((revenues) => {
        this.barChartData.datasets[1].data = revenues;
       this.refreshChart();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(getDATACHARTREVENUE_resetState());
  }
}
