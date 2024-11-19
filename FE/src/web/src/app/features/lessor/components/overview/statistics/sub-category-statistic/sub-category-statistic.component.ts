import { Component, OnInit } from '@angular/core';
import Chart, {
  ChartConfiguration,
  ChartData,
  ChartEvent,
} from 'chart.js/auto';
import { chooseFollowDate } from '../../../../../../utils/constant';
@Component({
  selector: 'app-sub-category-statistic',
  templateUrl: './sub-category-statistic.component.html',
  styleUrl: './sub-category-statistic.component.scss',
})
export class SubCategoryStatisticComponent implements OnInit {
  chooseFollowDate = chooseFollowDate;
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
            return `Ngày: ${label}`;
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
    labels: ['SP1', 'SP2', 'SP3', 'SP4', 'SP5', 'SP6', 'SP7'],
    datasets: [
      {
        data: [28, 48, 40, 19, 86, 27, 90],
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
    console.log(event, active);
  }

  chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  loadData(itemSelect: string | number){

  }

  constructor() {}

  ngOnInit() {

  }
}
