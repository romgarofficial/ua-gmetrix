import React, { useState } from 'react'
import {Container, Col, Row, Image, Form, Button} from 'react-bootstrap';
import UA from '../images/ua.png'
import Swal from 'sweetalert2';


const Landing = () => {

  const [Email, setEmail] = useState("");
  const [Pin, setPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [message, setMessage] = useState('');

  const register = async (e) => {
    e.preventDefault();
  
    const apiURL = 'https://api.sheetbest.com/sheets/96839f23-9fa7-4136-8d9a-dbcf04027d9a'; // Single connection for all sheets
  
    const date = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    const dateRegistered = formatter.format(date);
  
    try {
      // Step 1: Fetch existing registration data to check if the email is already registered
      const response = await fetch(apiURL, { method: 'GET' });
      const existingData = await response.json();
  
      // Filter for rows marked as 'registration-data'
      const registrations = existingData.filter((row) => row.sheetType === 'registration-data');
  
      // Check if the email already exists
      const emailExists = registrations.some((row) => row.Email === Email);
  
      if (emailExists) {
        Swal.fire({
          title: 'Email Already Registered!',
          text: 'The provided email is already registered. Please use a different email or contact the admin.',
          icon: 'warning',
        });
        return; // Stop execution if email is already registered
      }
  
      // Step 2: Proceed with registration
      const registerResponse = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sheetType: 'registration-data', // Add the sheetType to categorize the data
          Email,
          Pin,
          dateRegistered,
        }),
      });
  
      if (registerResponse.ok) {
        Swal.fire({
          title: 'SIGN UP SUCCESS!',
          text: 'You are now registered in UA GMETRIX DISSAPP.',
          icon: 'success',
        });
  
        // Reset form
        setEmail('');
        setPin('');
        setConfirmPin('');
      } else {
        console.error('Error:', registerResponse.statusText);
        Swal.fire({
          title: 'SIGN UP FAILED!',
          text: 'Please try again later or contact the admin.',
          icon: 'error',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        title: 'ERROR OCCURRED!',
        text: 'Unable to complete registration. Please try again later.',
        icon: 'error',
      });
    }
  };
  
  

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
          <Container fluid className='p-lg-5 p-3'>
            <Container fluid className='mt-5'>
                <Row className=' d-flex justify-content-center align-items-center'>
                    <Col lg={8} md={8} sm={12} >

                    <h1 className='fw-bold display-4'>Sign Up</h1>

                        <Form className='mt-5' onSubmit={register}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Email address</Form.Label>
                                {/* EMAIL */}
                                <Form.Control 
                                type="email" 
                                placeholder="sample@ua.edu.ph"
                                className='p-3'
                                value={Email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Enter Pin</Form.Label>
                                {/* PIN */}
                                <Form.Control 
                                type="password" 
                                placeholder="123456"
                                className='p-3'
                                required
                                value={Pin}
                                onChange={(e) => setPin(e.target.value)}
                                />
                            </Form.Group>
                            
                            {
                              Pin.length === 0
                              ?
                              <p>Set up your pin</p>
                              :
                              Pin.length < 6
                              ?
                              <p className='text-danger fw-bold'>Please input 6 digit pin only.</p>
                              :
                              Pin.length > 6
                              ?
                              <p className='text-danger fw-bold'>Please input 6 digit pin only.</p>
                              :
                              <p className='text-success fw-bold'>STRONG: Your pin is secured.</p>
                            }
                            
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Confirm Pin</Form.Label>
                                {/* CONFIRM PIN */}
                                <Form.Control 
                                type="password" 
                                placeholder="123456"
                                className='p-3'
                                required
                                value={confirmPin}
                                onChange={(e) => setConfirmPin(e.target.value)}
                                />
                            </Form.Group>

                            {
                              confirmPin.length === 0
                              ?
                              <p></p>
                              :
                              Pin !== confirmPin
                              ?
                              <p className='text-danger fw-bold'>Your pin do not match.</p>
                              :
                              Pin.length > 6
                              ?
                              <p className='text-danger fw-bold'>Please input 6 digit pin only.</p>
                              :
                              <p className='text-success fw-bold'>Pin matched!</p>
                            }

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Button className='btn btn-warning w-100 py-3 mt-3 rounded-3' type='submit'>Sign Up</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
          </Container>
        </Col>
      </Row>
    </Container>
  )
}

export default Landing