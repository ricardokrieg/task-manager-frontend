import {useQuery} from '@apollo/client';
import {GET_TASKS} from './queries';
import Task from './Task';

export default function TaskContainer() {
  const { loading, error, data } = useQuery(GET_TASKS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.tasks.sort((a, b) => a.priority < b.priority ? -1 : 1).map((task) => (
    <Task key={task.id} task={task} />
  ));
}
