import {Col, Container, Row} from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskForm from './TaskForm';
import TaskContainer from './TaskContainer';
import TaskFilter from './TaskFilter';
import ToptalPR from './Stats/ToptalPR';
import Tickets from './Stats/Tickets';

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
            <div>
              <a href='vnc://0.tcp.ngrok.io:11544' target='_blank' rel='noreferrer'>Access Acorns</a>
            </div>
          </Col>
          <Col xs={6}>
            <DndProvider backend={HTML5Backend}>
              <div style={{ marginBottom: 300 }}>
                <TaskContainer />
              </div>
            </DndProvider>
          </Col>
          <Col xs={3}></Col>
        </Row>
      </Container>

      <TaskForm />
    </main>
  );
}

export default App;
