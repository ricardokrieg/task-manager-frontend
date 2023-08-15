import {includes} from 'lodash';

export default function StoryPointsIndicator({ task: { tags } }) {
  const storyPoints = (tags) => {
    if (includes(tags, 'sp-1')) return 1;
    if (includes(tags, 'sp-2')) return 2;
    if (includes(tags, 'sp-3')) return 3;

    return 0;
  }

  const badges = [];
  for (let i= 0; i < storyPoints(tags); i++) {
    badges.push(<span style={{ width: 10, height: 10, marginRight: 2 }} className='bg-danger rounded-circle'></span>);
  }

  return (
    <div className='d-flex'>{badges}</div>
  );
}
