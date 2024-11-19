import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { chooseFollowDate } from '../../../../../../utils/constant';

@Component({
  selector: 'app-revenue-statistic',
  templateUrl: './revenue-statistic.component.html',
  styleUrl: './revenue-statistic.component.scss',
})
export class RevenueStatisticComponent implements OnInit {
  chooseFollowDate = chooseFollowDate;

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
    labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8' , 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    datasets: [
      {
        type: 'line' as const,
        label: 'Số lượng giao dịch',
        borderColor: 'rgb(20, 24, 31)',
        borderWidth: 2,
        fill: false,
        tension: 0.4,
        pointBackgroundColor: 'rgb(20, 24, 31)',
        data: [120, 140, 180, 200, 170, 190, 120, 140, 180, 200, 170, 190],
        yAxisID: 'y1',
      },
      {
        type: 'bar' as const,
        label: 'Doanh thu',
        backgroundColor: '#1890FF',
        data: [3000000, 4500000, 5500000, 7000000, 6500000, 8000000, 3000000, 4500000, 5500000, 7000000, 6500000, 8000000],
        borderColor: 'white',
        borderRadius: {
          topLeft: 40,
          topRight: 40
        },
        borderSkipped: false,
        barThickness: 40,
      },
    ],
  };
  loadData(itemSelect: string | number) {}

  constructor() {}

  ngOnInit(): void {}
}
