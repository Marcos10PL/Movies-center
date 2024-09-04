import React, { useState, useRef } from 'react';
import { Alert, Container, Row, Col, Form, Button } from 'react-bootstrap';
import useLocalStorage from '../myHooks/useLocalStorage';

function AlertName({ name, setName }) 
{
  const nameRef = useRef();
  const [showAlert, setShowAlert] = useLocalStorage('ALERT', true);
  const [error, setError] = useState('Enter your name...');

  const handleSetName = () =>
  {
    const input = nameRef.current.value;
    if(input)
      setName(input);
    else
      setError('You must enter your name...');
  }

  return (
    showAlert && (
      <Alert 
      className='m-0 text-center py-3 container m-auto mt-4' 
      variant='secondary'
      dismissible
    >
      {name !== '' ? (
        <>
          <p className='fs-5 m-0'>Hello, {name}!</p>
          <a 
            href='#' 
            className='link-primary text-decoration-none' 
            onClick={() => setShowAlert(false)}>
          [don't show again]
          </a>
        </>
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
              By entering your name you can save the list.
            </Col>
          </Row>
        </Container>
      )}
    </Alert>
    )
  );
}

export default AlertName;