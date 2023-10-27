import {Col, Container, Row} from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskForm from './TaskForm';
import TaskContainer from './TaskContainer';
import TaskFilter from './TaskFilter';
import ToptalPR from './Stats/ToptalPR';
import ToptalSprint from './Stats/ToptalSprint';
import LulaSprint from './Stats/LulaSprint';

function App() {
  return (
    <main>
      <Container fluid>
        <Row>
          <Col xs={3}>
            <ToptalPR />
            <hr />
            <ToptalSprint />
            <hr />
            <LulaSprint />
            <hr />
          </Col>
          <Col xs={6}>
            <DndProvider backend={HTML5Backend}>
              <div style={{ marginBottom: 300 }}>
                <TaskContainer />
              </div>
            </DndProvider>
          </Col>
          <Col xs={3}>
            <TaskFilter />
            <hr />
            <TaskForm />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
