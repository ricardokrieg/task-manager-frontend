import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {Doughnut} from 'react-chartjs-2';
import {useQuery} from '@apollo/client';
import {GET_TASKS} from '../queries';
import {includes} from 'lodash';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OpenTasks() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const tasks = data.tasks;

  const toptalTasks = tasks.filter((t) => includes(t.tags, 'toptal'));
  const lulaTasks = tasks.filter((t) => includes(t.tags, 'lula'));
  const acornsTasks = tasks.filter((t) => includes(t.tags, 'acorns'));
  const taskManagerTasks = tasks.filter((t) => includes(t.tags, 'task-manager'));
  const strakeTasks = tasks.filter((t) => includes(t.tags, 'strake'));
  const otherTasks = tasks.filter((t) => !includes(t.tags, 'toptal') && !includes(t.tags, 'lula') && !includes(t.tags, 'acorns') && !includes(t.tags, 'task-manager') && !includes(t.tags, 'strake'));

  const chartData = {
    labels: ['Toptal', 'Lula', 'Acorns', 'Task Manager', 'Strake', 'Other'],
    datasets: [
      {
        label: 'Tasks',
        data: [
          toptalTasks.length,
          lulaTasks.length,
          acornsTasks.length,
          taskManagerTasks.length,
          strakeTasks.length,
          otherTasks.length,
        ],
        backgroundColor: ['#0dcaf0', '#ffc107', '#20c997', 'red', 'gray', 'white'],
        borderColor: ['#0dcaf0', '#ffc107', '#20c997', 'red', 'gray', 'white'],
        borderWidth: 1,
        cutout: '60%',
        radius: '80%',
      },
    ],
  };

  return <Doughnut data={chartData} />;
}
