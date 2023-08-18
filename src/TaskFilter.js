import {Button, Col, Container, Row} from 'react-bootstrap';
import {useApolloClient} from '@apollo/client';
import {GET_FILTERS} from './queries';

export default function TaskFilter() {
  const client = useApolloClient();

  const filter = (sp) => {
    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { storyPoints: sp }
    }));
  }

  return (
    <Container>
      <Row>
        <Col><Button onClick={() => filter(null)}>All</Button></Col>
        <Col><Button onClick={() => filter('sp-1')}>1</Button></Col>
        <Col><Button onClick={() => filter('sp-2')}>2</Button></Col>
        <Col><Button onClick={() => filter('sp-3')}>3</Button></Col>
      </Row>
    </Container>
  );
}
