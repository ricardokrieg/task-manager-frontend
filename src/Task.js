import {includes} from 'lodash';
import {useMutation} from '@apollo/client';
import {useState} from 'react';
import {Button} from 'react-bootstrap';

import {COMPLETE_TASK, GET_COMPLETED_TASKS, GET_TASKS, UPDATE_TASK} from './queries';
import StoryPointsIndicator from './StoryPointsIndicator';
import {
  COLOR_ACORNS,
  COLOR_LULA, COLOR_OTHER, COLOR_STRAKE,
  COLOR_TASK_MANAGER,
  COLOR_TOPTAL,
} from './colors';
import TaskAge from './TaskAge';


function CompleteTaskButton({ task: { id } }) {
  const [completeTask] = useMutation(COMPLETE_TASK, {
    update(cache, { data: { completeTask } }) {
      const tasks = cache.readQuery({ query: GET_TASKS });
      const completedTasks = cache.readQuery({ query: GET_COMPLETED_TASKS });

      cache.modify({
        fields: {
          tasks() {
            return tasks.tasks.filter((task) => task?.id !== completeTask.task?.id);
          },
          completedTasks() {
            return [...completedTasks.completedTasks, completeTask.task];
          }
        }
      });
    }
  });

  return (<Button
    className='btn-sm btn-light btn-outline-dark'
    onClick={() => completeTask(({ variables: { id } }))}
  >
    Done #{id}
  </Button>)
}

function EditTask({ task: { id, tags, priority } }) {
  const [textPriority, setTextPriority] = useState(priority);
  const [textTags, setTextTags] = useState(tags.join(','));
  const [updateTask] = useMutation(UPDATE_TASK);

  const handleSubmit = (e, id) => {
    e.preventDefault();
    updateTask(({ variables: { id, priority: parseFloat(textPriority), tags: textTags.split(',') } }));
  }

  return (<form className='d-flex justify-content-center align-items-center mx-2' onSubmit={(e) => handleSubmit(e, id)}>
    <input value={textTags} onChange={(e) => setTextTags(e.target.value)} type='text' className='form-control form-control-sm' style={{ width: 100 }} />
    <input value={textPriority} onChange={(e) => setTextPriority(e.target.value)} type='text' className='form-control form-control-sm' style={{ width: 50 }} />
    <input type="submit"/>
  </form>);
}

export default function Task({ task: { id, title, tags, priority, createdAt } }) {
  const getClassName = () => {
    let className = 'card m-3';

    if (includes(tags, 'blocked')) {
      return className + ' bg-danger text-white';
    }

    return className;
  }

  const getStyle = () => {
    if (includes(tags, 'toptal')) {
      return { backgroundColor: COLOR_TOPTAL, color: 'white' };
    }

    if (includes(tags, 'lula')) {
      return { backgroundColor: COLOR_LULA, color: '#222' };
    }

    if (includes(tags, 'acorns')) {
      return { backgroundColor: COLOR_ACORNS, color: 'white' };
    }

    if (includes(tags, 'task-manager')) {
      return { backgroundColor: COLOR_TASK_MANAGER, color: 'white' };
    }

    if (includes(tags, 'strake')) {
      return { backgroundColor: COLOR_STRAKE, color: 'white' };
    }

    return { backgroundColor: COLOR_OTHER, color: '#222' };
  }

  return (
    <div className={getClassName()} style={getStyle()}>
      <div className='card-body p-3 d-flex justify-content-between'>
        <div className='d-flex flex-column'>
          <div>{title}</div>
          <TaskAge task={{ createdAt }} />
        </div>

        <div className='d-flex'>
          <StoryPointsIndicator task={{ tags }} />
          <EditTask task={{ id, tags, priority }} />
          <CompleteTaskButton task={{ id }} />
        </div>
      </div>
    </div>
  )
}
