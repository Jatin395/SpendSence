import React from 'react';
import { Pie } from '@ant-design/charts';
import { Bar } from '@ant-design/charts';

function ChartsTransitions({ balance, income, expense }) {
  // Data for Pie chart
  const pieData = [
    { type: 'Balance', value: balance },
    { type: 'Income', value: income },
    { type: 'Expense', value: expense },
  ];

  const pieConfig = {
    appendPadding: 10,
    data: pieData,
    angleField: 'value',
    colorField: 'type',
    radius: 0.7,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
  };

  // Data for Bar chart
  const barData = [
    { type: 'Balance', value: balance },
    { type: 'Income', value: income },
    { type: 'Expense', value: expense },
  ];

  const barConfig = {
    data: barData,
    xField: 'type',
    yField: 'value',
    label: {
      position: 'top',
      style: { fill: '#fff' },
    },
    colorField: 'type',
    legend: { position: 'top-left' },
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center m-4">
        <div className="overflow-hidden">
        <Pie {...pieConfig} />
        </div>
        <div className="overflow-hidden">
          <Bar className='' {...barConfig} />
        </div>
      </div>
    </>
  );
}

export default ChartsTransitions;
