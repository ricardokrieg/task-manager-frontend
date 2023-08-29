import {Col, Container, Row} from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskForm from './TaskForm';
import TaskContainer from './TaskContainer';
import TaskFilter from './TaskFilter';
import ToptalPR from './Stats/ToptalPR';
import Tickets from './Stats/Tickets';
import OpenTasks from './Stats/OpenTasks';

function App() {
  return (
    <main>
      <Container fluid>
        <Row>
          <Col xs={3}>
            <TaskFilter />
            <hr />
            <ToptalPR />
            <hr />
            <Tickets />
            <hr />
            <Row>
              <Col xs={{ span: 8, offset: 2 }}>
                <OpenTasks />
              </Col>
            </Row>
            <hr />
            <div>
              <a href='vnc://8.tcp.ngrok.io:17952' target='_blank' rel='noreferrer'>Access Acorns</a>
            </div>
          </Col>
          <Col xs={6}>
            <DndProvider backend={HTML5Backend}>
              <div style={{ marginBottom: 300 }}>
                <TaskContainer />
              </div>
            </DndProvider>
          </Col>
          <Col xs={3}>
            <TaskForm />
          </Col>
        </Row>
      </Container>
    </main>
  );
}

export default App;
