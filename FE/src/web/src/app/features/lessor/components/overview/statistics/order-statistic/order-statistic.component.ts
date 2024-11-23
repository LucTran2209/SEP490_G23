import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChartConfiguration, ChartData } from 'chart.js';
import { isArray } from 'chart.js/dist/helpers/helpers.core';
import dayjs from 'dayjs';
import { IPayLoad } from '../../../../../../interfaces/account.interface';
import { StorageService } from '../../../../../../services/storage.service';
import { LocalStorageKey } from '../../../../../../utils/constant';
import { getDATACHARTORDER } from '../../../../state/_chart/chartOrder-overview.actions';

@Component({
  selector: 'app-order-statistic',
  templateUrl: './order-statistic.component.html',
  styleUrl: './order-statistic.component.scss',
})
export class OrderStatisticComponent implements OnInit {
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
    labels: [...monthMockData],
    datasets: [
      {
        data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86],
        label: 'Chờ xử lý',
        backgroundColor: 'rgba(253,233,165,1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40,
        },
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56],
        label: 'Đang xử lý',
        backgroundColor: 'rgba(170, 215, 232, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40,
        },
      },
      {
        data: [90, 65, 59, 80, 81, 56, 28, 48, 40, 19, 86, 27],
        label: 'Hoàn thành',
        backgroundColor: 'rgba(184,237,190,1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40,
        },
      },
      {
        data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
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
  userCurrent?: IPayLoad;

  selectValue: any;

  getRangeDate(val?: string[]) {
    if (isArray(val) && val.length !== 0) {
      this.loadData({ StartDate: val[0], EndDate: val[1] });
    }
    this.loadData(this.getRangeDateCurrentAndBefore12M());
  }

  getRangeDateCurrentAndBefore12M() {
    let fromDate, toDate;
    toDate = dayjs().format('YYYY-MM-DD');
    fromDate = dayjs()
      .subtract(12, 'month')
      .startOf('month')
      .format('YYYY-MM-DD');
    return { StartDate: fromDate, EndDate: toDate };
  }

  handleDateChange(date: string[]): void {
    console.log('Date received in parent:', date);
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

  constructor(private store: Store, private storageService: StorageService) {
    this.userCurrent = this.storageService.get(LocalStorageKey.currentUser)
      ? (JSON.parse(
          this.storageService.get(LocalStorageKey.currentUser)!
        ) as IPayLoad)
      : undefined;
  }

  ngOnInit() {
    this.getRangeDate();
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
