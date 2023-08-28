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
import {COLOR_ACORNS, COLOR_LULA, COLOR_TOPTAL} from '../colors';

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

const calculatePoints = (tasks) => {
  return tasks.reduce((acc, task) => taskPoints(task) + acc, 0);
};

const taskPoints = (task) => {
  if (includes(task.tags, 'sp-1')) return 1;
  if (includes(task.tags, 'sp-2')) return 2;
  if (includes(task.tags, 'sp-3')) return 3;
  return 0;
}

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

  const labels = Array.from({ length: 14 }, (_, i) => getDate(13 - i).toFormat('ccc'));

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Toptal',
        data: Array.from(
          { length: 14 },
          (_, i) => calculatePoints(toptalTasks.filter((t) => t.timestamp.hasSame(getDate(13 - i), 'day')))
        ),
        backgroundColor: COLOR_TOPTAL,
      },
      {
        label: 'Lula',
        data: Array.from(
          { length: 14 },
          (_, i) => calculatePoints(lulaTasks.filter((t) => t.timestamp.hasSame(getDate(13 - i), 'day')))
        ),
        backgroundColor: COLOR_LULA,
      },
      {
        label: 'Acorns',
        data: Array.from(
          { length: 14 },
          (_, i) => calculatePoints(acornsTasks.filter((t) => t.timestamp.hasSame(getDate(13 - i), 'day')))
        ),
        backgroundColor: COLOR_ACORNS,
      },
    ],
  };

  return <Bar options={OPTIONS} data={chartData} />;
}
