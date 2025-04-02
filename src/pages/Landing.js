import React from 'react'
import {Container, Col, Row} from 'react-bootstrap';

const Landing = () => {
  return (
    <Container fluid className='zero-p-m'>
      <Row className='zero-p-m'>
        <Col lg={6} xs={12} className='p-0'>
          <Container fluid className='p-5 d-flex flex-column bg-dark justify-content-center align-items-center vh-100'>
            <p className='display-3 fw-bold text-warning'>
              UA GMETRIX
            </p>

            <p className='display-6 text-light'>
              Dissemination App
            </p>
          </Container>
        </Col>
        <Col lg={6} xs={12} className='p-5 d-flex flex-column bg-dark justify-content-center align-items-center vh-100 p-0'>
          asd
        </Col>
      </Row>
    </Container>
  )
}

export default Landing