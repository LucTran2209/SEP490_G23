import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';

@Component({
  selector: 'app-order-statistic',
  templateUrl: './order-statistic.component.html',
  styleUrl: './order-statistic.component.scss',
})
export class OrderStatisticComponent implements OnInit{

  /**Config chart order statistic */
  barCharOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: false,
        },
        grid: {
          display: false
        }
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
            drawOnChartArea: true

        },
        ticks: {
            maxTicksLimit: 9,
            font: {
                size: 15
            }
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
  }
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
          topRight: 40
        }
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90, 65, 59, 80, 81, 56],
        label: 'Đang xử lý',
        backgroundColor: 'rgba(170, 215, 232, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40
        }
      },
      {
        data: [ 90, 65, 59, 80, 81, 56, 28, 48, 40, 19, 86, 27],
        label: 'Hoàn thành',
        backgroundColor: 'rgba(184,237,190,1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40
        }

      },
      {
        data: [1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4],
        label: 'Đã hủy',
        backgroundColor: 'rgba(247, 169, 185, 1)',
        borderWidth: 1,
        borderRadius: {
          topLeft: 40,
          topRight: 40
        }
      },
    ],
  };
  /**Config chart order statistic */

  chooseView: 'M' | 'Q' = 'M'


  onChooseView(val: 'M' | 'Q'){
    this.chooseView = val;
  }

  constructor() {
  }

  ngOnInit(): void {
    
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
