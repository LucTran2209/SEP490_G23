import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartData } from 'chart.js';
import { IPayLoad } from '../../../../../../interfaces/account.interface';
import { StorageService } from '../../../../../../services/storage.service';
import { LocalStorageKey } from '../../../../../../utils/constant';
import {
  getDATACHARTORDER,
  getDATACHARTORDER_resetState,
} from '../../../../state/_chart/chartOrder-overview.actions';
import dayjs from 'dayjs';
import { Observable, Subscription } from 'rxjs';
import { BaseChartDirective } from 'ng2-charts';
import {
  selectCancel,
  selectCompleted,
  selectInProcess,
  selectLabels,
  selectWaitingForConfirm,
} from '../../../../state/_chart/chartOrder-overview.reducer';

@Component({
  selector: 'app-order-statistic',
  templateUrl: './order-statistic.component.html',
  styleUrl: './order-statistic.component.scss',
})
export class OrderStatisticComponent implements OnInit, OnDestroy {
  /**Config chart order statistic */
  barCharOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Số lượng đơn hàng',
        },

        border: { dash: [4, 4] },

        grid: {
          color: '#aaa',
          tickColor: '#000',
          tickWidth: 2,
          offset: true,
          drawTicks: false,
          drawOnChartArea: true,
        },
        ticks: {
          maxTicksLimit: 9,
          font: {
            size: 15,
          },
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
            return `Tháng: ${label}`;
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
    labels: [],
    datasets: [
      {
        // data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86],
        data: [],
        label: 'Chờ xử lý',
        backgroundColor: 'rgba(253,233,165,1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40,
        },
      },
      {
        // data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56],
        data: [],
        label: 'Đang xử lý',
        backgroundColor: 'rgba(170, 215, 232, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40,
        },
      },
      {
        // data: [90, 65, 59, 80, 81, 56, 28, 48, 40, 19, 86, 27],
        data: [],
        label: 'Hoàn thành',
        backgroundColor: 'rgba(184,237,190,1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40,
        },
      },
      {
        // data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
        data: [],
        label: 'Đã hủy',
        backgroundColor: 'rgba(247, 169, 185, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40,
        },
      },
    ],
  };
  /**Config chart order statistic */
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  private subscriptions: Subscription = new Subscription();
  userCurrent?: IPayLoad;
  labelData$?: Observable<string[]>;
  waittingData$?: Observable<number[]>;
  inProcessData$?: Observable<number[]>;
  completedData$?: Observable<number[]>;
  cancelData$?: Observable<number[]>;
  getRangeDate(val: Date[]) {
    let fromDate, toDate;
    if (val && val.length !== 0) {
      fromDate = dayjs(val[0]).startOf('month').format('YYYY-MM-DD');
      toDate = dayjs(val[1]).endOf('month').format('YYYY-MM-DD');
      this.loadData({ StartDate: fromDate, EndDate: toDate });
    }
  }

  handleDateChange(date: Date[]): void {
    console.log('Line152', date);
    this.getRangeDate(date);
  }

  loadData(valDate: object) {
    if (this.userCurrent) {
      const bodyReq = {
        RentaiShopId: this.userCurrent.RentalShopId,
        ...valDate,
      };
      this.store.dispatch(getDATACHARTORDER({ bodyReq }));
    }
  }

  refreshChart(): void {
    if (this.chart) {
      this.chart.update();
    }
  }

  getCurrentAndLast12MonthsDate() {
    const currentDate = new Date();
    const last12MonthsDate = new Date();
    last12MonthsDate.setMonth(last12MonthsDate.getMonth() - 12);
    return {
      StartDate: dayjs(last12MonthsDate).startOf('month').format('YYYY-MM-DD'),
      EndDate: dayjs(currentDate).endOf('month').format('YYYY-MM-DD'),
    };
  }

  constructor(private store: Store, private storageService: StorageService) {
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
  }

  ngOnInit() {
    this.loadData(this.getCurrentAndLast12MonthsDate());
    this.labelData$ = this.store.select(selectLabels);
    this.waittingData$ = this.store.select(selectWaitingForConfirm);
    this.inProcessData$ = this.store.select(selectInProcess);
    this.completedData$ = this.store.select(selectCompleted);
    this.cancelData$ = this.store.select(selectCancel);

    this.subscriptions.add(
      this.labelData$.subscribe((labels) => {
        this.barChartData.labels = labels;
        this.refreshChart();
      })
    );
    this.subscriptions.add(
      this.waittingData$.subscribe((data) => {
        this.barChartData.datasets[0].data = data;
        this.refreshChart();
      })
    );
    this.subscriptions.add(
      this.inProcessData$.subscribe((data) => {
        this.barChartData.datasets[1].data = data;
        this.refreshChart();
      })
    );
    this.subscriptions.add(
      this.completedData$.subscribe((data) => {
        this.barChartData.datasets[2].data = data;
        this.refreshChart();
      })
    );
    this.subscriptions.add(
      this.cancelData$.subscribe((data) => {
        this.barChartData.datasets[3].data = data;
        this.refreshChart();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.store.dispatch(getDATACHARTORDER_resetState());
  }
}

const monthMockData = [
  '01/2024',
  '02/2024',
  '03/2024',
  '04/2024',
  '05/2024',
  '06/2024',
  '07/2024',
  '08/2024',
  '09/2024',
  '10/2024',
  '11/2024',
  '12/2024',
];
