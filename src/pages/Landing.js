import React from 'react'
import {Container, Col, Row, Image} from 'react-bootstrap';
import UA from '../images/ua.png'
import COVER from '../images/ua-cover.jpg'

const Landing = () => {
  return (
    <Container fluid className='zero-p-m'>
      <Row className='zero-p-m'>
        <Col lg={6} xs={12} className='p-0 bg-ua'>
          <Container fluid className='p-5 d-flex flex-column  justify-content-center align-items-center vh-100'>

          <Row className='d-flex flex-column justify-content-center align-items-center mb-5'>
            <Col lg={6} sm={4} > 
              <Image src={UA} className='img-fluid p-3'/>
            </Col>
          </Row>
          
            <p className='display-3 fw-bold text-warning'>
              UA GMETRIX
            </p>

            <p className='display-6 text-light'>
              Dissemination App
            </p>
          </Container>
        </Col>
        <Col lg={6} xs={12} className=' d-flex flex-column bg-light justify-content-center align-items-center vh-100 p-0'>
          <Image src={COVER} className='center-cropped'/>
        </Col>
      </Row>
    </Container>
  )
}

export default Landing