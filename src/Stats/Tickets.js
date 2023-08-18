import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {DateTime} from 'luxon';
import {useQuery} from '@apollo/client';
import {GET_COMPLETED_TASKS} from '../queries';
import {includes} from 'lodash';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const OPTIONS = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Tickets',
    },
  },
  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  }
};

const getDate = (diff) => {
  return DateTime.now().minus({ day: diff });
};

export default function Tickets() {
  const { loading, error, data } = useQuery(GET_COMPLETED_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const tasks = data
    .completedTasks
    .filter((t) => includes(t.tags, 'ticket'))
    .map((t) => ({...t, timestamp: DateTime.fromISO(t.completedAt)}));

  const toptalTasks = tasks.filter((t) => includes(t.tags, 'toptal'));
  const lulaTasks = tasks.filter((t) => includes(t.tags, 'lula'));
  const acornsTasks = tasks.filter((t) => includes(t.tags, 'acorns'));

  const labels = Array.from({ length: 7 }, (_, i) => getDate(6 - i).toFormat('ccc'));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Toptal',
        data: Array.from(
          { length: 7 },
          (_, i) => toptalTasks.filter((t) => t.timestamp.hasSame(getDate(6 - i), 'day')).length
        ),
        backgroundColor: '#0dcaf0',
      },
      {
        label: 'Lula',
        data: Array.from(
          { length: 7 },
          (_, i) => lulaTasks.filter((t) => t.timestamp.hasSame(getDate(6 - i), 'day')).length
        ),
        backgroundColor: '#ffc107',
      },
      {
        label: 'Acorns',
        data: Array.from(
          { length: 7 },
          (_, i) => acornsTasks.filter((t) => t.timestamp.hasSame(getDate(6 - i), 'day')).length
        ),
        backgroundColor: '#20c997',
      },
    ],
  };

  return <Bar options={OPTIONS} data={chartData} />;
}
