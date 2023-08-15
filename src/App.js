import {Container} from 'react-bootstrap';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TaskForm from './TaskForm';
import TaskContainer from './TaskContainer';

function App() {
  return (
    <main>
      <Container>
        <DndProvider backend={HTML5Backend}>
          <div style={{ marginBottom: 300 }}>
            <TaskContainer />
          </div>
        </DndProvider>

        <TaskForm />
      </Container>
    </main>
  );
}

export default App;
