import {Container, ProgressBar, Row} from 'react-bootstrap';
import {useQuery} from '@apollo/client';
import {GET_COMPLETED_TASKS} from '../queries';
import {includes} from 'lodash';
import {DateTime} from 'luxon';
import {COLOR_STRAKE, COLOR_TOPTAL} from '../colors';

const barWidth = (tasks) => {
  return (tasks.length / 20) * 100;
};

export default function ToptalPR() {
  const { loading, error, data } = useQuery(GET_COMPLETED_TASKS);
  const now = DateTime.now();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const tasks = data
    .completedTasks
    .filter((t) => includes(t.tags, 'toptal') && includes(t.tags, 'pr'))
    .map((t) => ({...t, timestamp: DateTime.fromISO(t.completedAt)}));
  const month = tasks.filter((t) => t.timestamp.hasSame(now, 'month') && !t.timestamp.hasSame(now, 'day'));
  const today = tasks.filter((t) => t.timestamp.hasSame(now, 'day'));

  return (
    <Container>
      <Row>
        <h3>Toptal's External PRs</h3>

        <div>
          <ProgressBar>
            <ProgressBar now={barWidth(month)} min={0} max={100} style={{ backgroundColor: COLOR_TOPTAL }} />
            <ProgressBar now={barWidth(today)} min={0} max={100} style={{ backgroundColor: COLOR_STRAKE }} />
          </ProgressBar>
        </div>
      </Row>
    </Container>
  );
}
