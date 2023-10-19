import {Container, Form, Row} from 'react-bootstrap';
import {useApolloClient, useQuery} from '@apollo/client';
import {GET_FILTERS} from './queries';

export default function TaskFilter() {
  const client = useApolloClient();
  const filtersQuery = useQuery(GET_FILTERS);

  if (!filtersQuery.data) return '';

  const filterBySP = (id) => {
    const storyPoints = id === 'sp-all' ? null : id;

    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { ...filtersQuery.data.filters, storyPoints }
    }));
  }

  const filterByTicket = (id) => {
    const onlyTickets = id === 'tickets-all' ? null : true;

    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { ...filtersQuery.data.filters, onlyTickets }
    }));
  }

  const filterByProject = (id) => {
    const project = id === 'project-all' ? null : id.replace('project-', '');

    client.cache.updateQuery({ query: GET_FILTERS }, () => ({
      filters: { ...filtersQuery.data.filters, project }
    }));
  }

  return (
    <Container>
      <Row>
        <h6>Story Points</h6>
        <Form onChange={(event) => filterBySP(event.target.id)}>
          <Form.Check inline label='All' name='sp' type='radio' id='sp-all' defaultChecked={true} />
          <Form.Check inline label='1' name='sp' type='radio' id='sp-1' />
          <Form.Check inline label='2' name='sp' type='radio' id='sp-2' />
          <Form.Check inline label='3' name='sp' type='radio' id='sp-3' />
        </Form>
      </Row>

      <Row>
        <h6>Tickets</h6>
        <Form onChange={(event) => filterByTicket(event.target.id)}>
          <Form.Check inline label='All' name='tickets' type='radio' id='tickets-all' defaultChecked={true} />
          <Form.Check inline label='Only Tickets' name='tickets' type='radio' id='tickets-1' />
        </Form>
      </Row>

      <Row>
        <h6>Project</h6>
        <Form onChange={(event) => filterByProject(event.target.id)}>
          <Form.Check inline label='All' name='project' type='radio' id='project-all' defaultChecked={true} />
          <Form.Check inline label='Toptal' name='project' type='radio' id='project-toptal' />
          <Form.Check inline label='Lula' name='project' type='radio' id='project-lula' />
          <Form.Check inline label='Acorns' name='project' type='radio' id='project-acorns' />
          <Form.Check inline label='Strake' name='project' type='radio' id='project-strake' />
          <Form.Check inline label='Task Manager' name='project' type='radio' id='project-task-manager' />
        </Form>
      </Row>
    </Container>
  );
}
