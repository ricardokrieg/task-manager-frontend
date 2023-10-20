import React from 'react';
import {Line} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import {COLOR_OTHER, COLOR_TOPTAL} from '../colors';
import {DateTime} from 'luxon';
import {useQuery} from '@apollo/client';
import {GET_COMPLETED_TASKS} from '../queries';
import {includes} from 'lodash';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const buildDates = (startDate, endDate) => {
  const dates = [];
  let date = startDate;

  while (date <= endDate) {
    if (date.weekday <= 5) {
      dates.push(date);
    }

    date = date.plus({ days: 1 });
  }

  return dates;
}

export default function ToptalPR() {
  const { loading, error, data } = useQuery(GET_COMPLETED_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const tasks = data
    .completedTasks
    .filter((t) => includes(t.tags, 'toptal') && includes(t.tags, 'pr'))
    .map((t) => ({...t, timestamp: DateTime.fromISO(t.completedAt)}));

  const startDate = DateTime.now().startOf('month');
  const endDate = DateTime.now().endOf('month');
  const dates = buildDates(startDate, endDate);

  const chartData = {
    labels: Array.from({ length: dates.length }, () => ''),
    datasets: [
      {
        label: 'Actual',
        data: dates.filter((date) => date <= DateTime.now()).map((date) => tasks.reduce((acc, t) => t.timestamp >= startDate && t.timestamp <= date ? acc + 1 : acc, 0)),
        borderColor: COLOR_TOPTAL,
        backgroundColor: COLOR_TOPTAL,
      },
      {
        label: 'Target',
        data: Array.from({ length: dates.length }, (_, i) => i + 1),
        borderColor: COLOR_OTHER,
        backgroundColor: COLOR_OTHER,
      },
    ],
  };

  return <Line
    data={chartData}
    options={{
      responsive: true,
      pointRadius: 1,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Toptal External PRs',
        },
      },
    }}
  />
}
