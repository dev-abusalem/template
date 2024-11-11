"use client";

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartState {
  series: Array<{
    name: string;
    data: number[];
  }>;
  options: ApexOptions; // Use ApexOptions type
}

function TopSaleProductChart() {
  const [chartState] = useState<ChartState>({
    series: [{
      name: 'Servings',
      data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 33, 87, 65, 35]
    }],
    options: {
      annotations: {
        points: [{
          x: 'Bananas',
          seriesIndex: 0,
          label: {
            borderColor: '#775DD0',
            offsetY: 0,
            style: {
              color: '#fff',
              background: '#775DD0',
            },
          }
        }]
      },
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          columnWidth: '50%',
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 0
      },
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2']
        }
      },
      xaxis: {
        labels: {
          rotate: -45
        },
        categories: ['Apples', 'Oranges', 'Strawberries', 'Pineapples', 'Mangoes', 'Bananas',
          'Blackberries', 'Pears', 'Watermelons', 'Cherries', 'Pomegranates', 'Tangerines','Strawberries', 'Papayas'
        ],
        tickPlacement: 'on'
      },
      yaxis: {
        title: {
          text: 'Servings',
        },
      },
      fill: {
        colors: ['#065f46', '#d1d5db'],  
         type: 'gradient',
                gradient: {
                  shade: 'light',
                  type: "horizontal",
                  shadeIntensity: 0.25,
                  gradientToColors: undefined,
                  inverseColors: true,
                  opacityFrom: 0.85,
                  opacityTo: 0.85,
                  stops: [50, 0, 100]
                },
      }
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartState.options} series={chartState.series} type="bar" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default TopSaleProductChart;
