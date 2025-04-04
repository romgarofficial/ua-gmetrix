import React, { useEffect, useState } from 'react';
import {Container, Col, Row, Image, Form, Button} from 'react-bootstrap';
import UA from '../images/ua.png'
import Swal from 'sweetalert2';


const Track = () => {

  const [Email, setEmail] = useState("");
  const [Pin, setPin] = useState("");

  const [certifications, setCertifications] = useState([]); // State to hold certification names
  const [selectedCertification, setSelectedCertification] = useState(''); // Track selected option
  const [btnActive, setBtnActive] = useState(true);

  const apiURL = 'https://api.sheetbest.com/sheets/96839f23-9fa7-4136-8d9a-dbcf04027d9a'; // Replace with your SheetBest API URL for certification-type sheet

  useEffect(() => {

    document.title = "UAGCDA - Code Tracking";

    const fetchCertifications = async () => {
  
      try {
        const response = await fetch(apiURL, { method: 'GET' });
        const data = await response.json();
  
        // Filter rows for certification-type and extract certificate names
        const certNames = data
          .filter((row) => row.sheetType === 'certification-type') // Filter for certification-type rows
          .map((row) => row.certificateName); // Extract certificateName field
  
        setCertifications(certNames); // Update state with certification names
      } catch (error) {
        console.error('Error fetching certifications:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Unable to fetch certifications. Please try again later.',
          icon: 'error',
        });
      }
    };
  
    fetchCertifications();
  }, []);

  const generate = async (e) => {
    setBtnActive(false);
    e.preventDefault();
  
    if (!Email || !Pin || !selectedCertification) {
      Swal.fire({
        title: 'Missing Information!',
        text: 'Please fill out all fields and select a certification type.',
        icon: 'warning',
      });
      setBtnActive(true);
      return;
    }
  
    try {
      const response = await fetch(apiURL, { method: 'GET' });
      const data = await response.json();
  
      // Step 1: Check if the email exists in `registration-data`
      const registeredUser = data.find(
        (row) => row.sheetType === 'registration-data' && row.Email.toLowerCase() === Email.toLowerCase()
      );
  
      if (!registeredUser) {
        Swal.fire({
          title: 'Not Registered!',
          text: 'This email is not registered. Please sign up first.',
          icon: 'error',
        });
        setBtnActive(true);
        return;
      }
  
      // Step 2: Verify the PIN
      if (registeredUser.Pin !== Pin) {
        Swal.fire({
          title: 'Incorrect PIN!',
          text: 'The PIN you entered is incorrect. Please try again.',
          icon: 'error',
        });
        setBtnActive(true);
        return;
      }
  
      // Step 3: Find the email under the provided certificates section
      let certificationData = null;
      let userCode = '';
  
      if (selectedCertification === 'ITS-CYBERSECURITY') {
        certificationData = data.find(
          (row) => row.sheetType === 'provided-cybersecurity' && row['ITS-CYBERSECURITY-EMAIL'].toLowerCase() === Email.toLowerCase()
        );
        userCode = certificationData ? certificationData['ITS-CYBERSECURITY-CODE'] : '';
      } else if (selectedCertification === 'ITS-DATABASES') {
        certificationData = data.find(
          (row) => row.sheetType === 'provided-databases' && row['ITS-DATABASES-EMAIL'].toLowerCase() === Email.toLowerCase()
        );
        userCode = certificationData ? certificationData['ITS-DATABASES-CODE'] : '';
      }
  
      if (!certificationData || !userCode) {
        Swal.fire({
          title: 'No Certification Found!',
          text: 'This email is not linked to the selected certification.',
          icon: 'error',
        });
        setBtnActive(true);
        return;
      }
  
      // Step 4: Display the GMETRIX Code
      Swal.fire({
        title: 'Your GMETRIX Code',
        text: `Certification: ${selectedCertification} Code: ${userCode}`,
        icon: 'success',
      });
  
      // Reset form
      setEmail('');
      setPin('');
      setSelectedCertification('');
      setBtnActive(true);
    } catch (error) {
      console.error('Error fetching data:', error);
      Swal.fire({
        title: 'Error!',
        text: 'Unable to retrieve your GMETRIX code. Please try again later.',
        icon: 'error',
      });
      setBtnActive(true);
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
              Code Dissemination App
            </p>
          </Container>
        </Col>
        <Col lg={6} xs={12} className=' d-flex flex-column bg-light justify-content-center align-items-center vh-100 p-0'>
          <Container fluid className='p-lg-5 p-3'>
            <Container fluid className='mt-5'>
                <Row className=' d-flex justify-content-center align-items-center'>
                    <Col lg={8} md={8} sm={12} >

                    <h1 className='fw-bold display-4'>Track Account</h1>

                        <Form className='mt-5' onSubmit={generate}>

                            <Form.Group className="mb-3">
                                <Form.Label>Select Certification Type</Form.Label>
                                <Form.Select
                                value={selectedCertification}
                                onChange={(e) => setSelectedCertification(e.target.value)}
                                className='py-2'
                                >
                                <option value="">-- Select a Certification --</option>
                                {certifications.map((cert, index) => (
                                    <option key={index} value={cert}>
                                    {cert}
                                    </option>
                                ))}
                                </Form.Select>
                            </Form.Group>

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
                                <Form.Label>Pin</Form.Label>
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
                              <p>Enter your pin</p>
                              :
                              Pin.length < 6
                              ?
                              <p className='text-danger fw-bold'>Please input 6 digit pin only.</p>
                              :
                              <p className='text-danger fw-bold'>
                              </p>
                            }

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                {
                                  !btnActive
                                  ?
                                  <Button className='btn btn-primary w-100 py-3 mt-3 rounded-3' disabled>LOADING</Button>
                                  :
                                  <Button className='btn btn-warning w-100 py-3 mt-3 rounded-3' type='submit'>Get GMETRIX Code</Button>
                                }
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

export default Track