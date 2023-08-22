import {Button, Col, Container, Row} from 'react-bootstrap';
import {useApolloClient} from '@apollo/client';
import {GET_FILTERS} from './queries';

export default function TaskFilter() {
  const client = useApolloClient();

  const filterBySP = (sp) => {
    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { storyPoints: sp, onlyTickets: null }
    }));
  }

  const filterByTicket = (onlyTickets) => {
    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { storyPoints: null, onlyTickets }
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
    </Container>
  );
}
