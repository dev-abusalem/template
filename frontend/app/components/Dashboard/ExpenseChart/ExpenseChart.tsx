"use client"

import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface ChartState {
  series: number[];
  options: ApexOptions;
}

function ExpenseChart() {
  const [chartState] = useState<ChartState>({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        floating: false,
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart options={chartState.options} series={chartState.series} type="pie" width={380} />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default ExpenseChart;
