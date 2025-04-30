import React from 'react'
import Main from '../components/Main'
import { Container, ListGroup } from 'react-bootstrap';

function Dashboard() {
  return (
    <>
      <Main>
        <Container fluid>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Cras justo odio
            </ListGroup.Item>
            <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item as="li" disabled>
              Morbi leo risus
            </ListGroup.Item>
            <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
          </ListGroup>
        </Container>
      </Main>
    </>
  );
}

export default Dashboard
