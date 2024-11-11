"use client"
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartState {
  series: Array<{
    name: string;
    data: number[];
  }>;
  options: ApexOptions;
}

function SalesAndPurchaseChart() {
  const [chartState] = useState<ChartState>({
    series: [
      {
        name: 'Sales',
        data: [31, 40, 28, 51, 42, 109, 100]
      },
      {
        name: 'Purchase',
        data: [11, 32, 45, 32, 34, 52, 41]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: 'area'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth'
      },
      xaxis: {
        type: 'datetime',
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z"
        ]
      },
      tooltip: {
        x: {
          format: 'dd/MM/yy HH:mm'
        }
      }
    }
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartState.options} series={chartState.series} type="area" height={350} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default SalesAndPurchaseChart;
