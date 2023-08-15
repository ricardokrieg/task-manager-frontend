import {includes} from 'lodash';
import {useMutation} from '@apollo/client';
import {COMPLETE_TASK, GET_TASKS, UPDATE_TASK} from './queries';
import {useState} from 'react';
import {Button} from 'react-bootstrap';
import StoryPointsIndicator from './StoryPointsIndicator';

function CompleteTaskButton({ task: { id } }) {
  const [completeTask] = useMutation(COMPLETE_TASK, {
    update(cache, { data: { completeTask } }) {
      const tasks = cache.readQuery({ query: GET_TASKS });

      cache.modify({
        fields: {
          tasks() {
            return tasks.tasks.filter((task) => task?.id !== completeTask.task?.id);
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

export default function Task({ task: { id, title, tags, priority } }) {
  const getClassName = () => {
    let className = 'card m-3';

    if (includes(tags, 'blocked')) {
      return className + ' bg-danger text-white';
    }

    if (includes(tags, 'toptal')) {
      return className + ' bg-info';
    }

    if (includes(tags, 'lula')) {
      return className + ' bg-warning';
    }

    if (includes(tags, 'task-manager')) {
      return className + ' bg-primary text-white';
    }

    return className;
  }

  return (
    <div className={getClassName()}>
      <div className='card-body p-3 d-flex justify-content-between'>
        <div>
          {title}
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
