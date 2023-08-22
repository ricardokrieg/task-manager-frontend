import {includes} from 'lodash';

export default function StoryPointsIndicator({ task: { tags } }) {
  const calculateStoryPoints = (tags) => {
    if (includes(tags, 'sp-1')) return 1;
    if (includes(tags, 'sp-2')) return 2;
    if (includes(tags, 'sp-3')) return 3;

    return 0;
  }

  const storyPoints = calculateStoryPoints(tags);

  const badges = Array.from({ length: 3 }, (_, i) => {
    const className = `bg-danger rounded-circle ${i >= storyPoints ? 'opacity-0' : ''}`

    return <span key={i} style={{ width: 10, height: 10 }} className={className}></span>;
  });

  return (
    <div className='d-flex flex-column-reverse justify-content-between mx-1'>{badges}</div>
  );
}
