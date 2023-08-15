import {useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {map} from 'lodash';

import {CREATE_TASK, GET_TASKS} from './queries';

export default function TaskForm() {
  const [title, setTitle] = useState('');
  const { data } = useQuery(GET_TASKS);

  const [createTask] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            const newTaskRef = cache.writeFragment({
              data: createTask.task,
              fragment: gql`
                fragment NewTask on Task {
                  id
                  type
                }
              `
            });
            return [...existingTasks, newTaskRef];
          }
        }
      });
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const priority = Math.max(...map(data.tasks, 'priority')) + 1;

    createTask(({ variables: { title, priority } }));
    setTitle('');
  }

  return (
    <div className='fixed-bottom p-5 bg-white'>
      <form className='d-flex justify-content-center align-items-center mb-4' onSubmit={handleSubmit}>
        <div className='form-outline flex-fill'>
          <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' className='form-control form-control-lg' />
        </div>
      </form>
    </div>
  );
}
