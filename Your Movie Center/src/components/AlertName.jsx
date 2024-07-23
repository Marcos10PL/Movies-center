import React, { useState, useEffect, useRef } from 'react';
import { Alert, Container, Row, Col, Form, Button } from 'react-bootstrap';

function AlertName() 
{
  const nameRef = useRef();
  const [name, setName] = useState();
  const [error, setError] = useState('Enter your name...');

  useEffect(() => {
    const nameLS = localStorage.getItem('NAME');
    nameLS && setName(nameLS);
  }, []);

  function handleSetName()
  {
    const input = nameRef.current.value;
    if(input)
    {
      setName(input);
      localStorage.setItem('NAME', input);
    } 
    else
      setError('You must enter your name...');
  }
  //localStorage.removeItem('NAME');
  return (
    <Alert 
      className='m-0 text-center py-3' 
      variant='secondary'
      dismissible
    >
      {name ? (
        <p className='fs-5 m-0'>Hello, {name}!</p>
      ) : (
        <Container>
          <Row>
            <Col md={6} className='d-flex align-items-center justify-content-center'>
              <Form.Control
                type='text'
                placeholder={error}
                className='bg-white my-2'
                ref={nameRef}
              />
              <Button 
                variant='outline-light'
                onClick={handleSetName}
              >
              SUBMIT
              </Button>
            </Col>
            <Col md={6} className='d-flex align-items-center justify-content-center mb-2 mb-md-0'>
              By entering your name, you save the list and agree to the use of cookies on this website.
            </Col>
          </Row>
        </Container>
      )}
    </Alert>
  );
}

export default AlertName;