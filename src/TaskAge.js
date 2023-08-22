import {DateTime} from 'luxon';

export default function TaskAge({ task: { createdAt } }) {
  const age = (createdAt) => {
    return DateTime.now().diff(DateTime.fromISO(createdAt)).as('days');
  }

  const badges = [];
  for (let i= 0; i < age(createdAt); i++) {
    badges.push(<span key={i} style={{ width: 10, height: 10, marginRight: 2 }} className='bg-danger rounded-circle'></span>);
  }

  return (
    <div className='d-flex'>{badges}</div>
  );
}
