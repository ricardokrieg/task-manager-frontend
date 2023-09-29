import {Button, Col, Container, Row} from 'react-bootstrap';
import {useApolloClient} from '@apollo/client';
import {GET_FILTERS} from './queries';

export default function TaskFilter() {
  const client = useApolloClient();

  const filterBySP = (sp) => {
    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { storyPoints: sp, onlyTickets: null, project: null }
    }));
  }

  const filterByTicket = (onlyTickets) => {
    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { storyPoints: null, onlyTickets, project: null }
    }));
  }

  const filterByProject = (project) => {
    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { storyPoints: null, onlyTickets: null, project }
    }));
  }

  return (
    <Container>
      <Row>
        <Col><Button onClick={() => filterBySP(null)}>All</Button></Col>
        <Col><Button onClick={() => filterBySP('sp-1')}>1</Button></Col>
        <Col><Button onClick={() => filterBySP('sp-2')}>2</Button></Col>
        <Col><Button onClick={() => filterBySP('sp-3')}>3</Button></Col>
      </Row>

      <Row>
        <Col><Button onClick={() => filterByTicket(null)}>All</Button></Col>
        <Col><Button onClick={() => filterByTicket(true)}>Only Tickets</Button></Col>
      </Row>

      <Row>
        <Col><Button onClick={() => filterByProject(null)}>All</Button></Col>
        <Col><Button onClick={() => filterByProject('toptal')}>Toptal</Button></Col>
        <Col><Button onClick={() => filterByProject('lula')}>Lula</Button></Col>
        <Col><Button onClick={() => filterByProject('acorns')}>Acorns</Button></Col>
        <Col><Button onClick={() => filterByProject('strake')}>Strake</Button></Col>
        <Col><Button onClick={() => filterByProject('task-manager')}>Task Manager</Button></Col>
      </Row>
    </Container>
  );
}
