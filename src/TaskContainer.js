import {useQuery} from '@apollo/client';
import {GET_FILTERS, GET_TASKS} from './queries';
import Task from './Task';
import {filter, includes} from 'lodash';

export default function TaskContainer() {
  const { loading, error, data } = useQuery(GET_TASKS);
  const filtersQuery = useQuery(GET_FILTERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const filterTasks = (tasks, filters) => {
    return filter(
      tasks,
      (t) => includes([...t.tags, null], filters.storyPoints) && (filters.onlyTickets === null || includes(t.tags, 'ticket')) && includes([...t.tags, null], filters.project));
  }

  const filteredTasks = filterTasks(data.tasks, filtersQuery.data.filters);
  const sortedTasks = filteredTasks.sort((a, b) => a.priority < b.priority ? -1 : 1);

  return sortedTasks.map((task) => (
    <Task key={task.id} task={task} />
  ));
}
