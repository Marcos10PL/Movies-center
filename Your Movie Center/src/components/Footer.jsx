import { Container, Row, Col } from 'react-bootstrap';

function Footer()
{
  const reset = () =>
  {
    localStorage.removeItem('NAME');
    localStorage.removeItem('ALERT');
    localStorage.removeItem('MOVIES');
    localStorage.removeItem('INFO');
    location.reload();
  }

  return(
    <footer className="py-4">
      <Container className='text-center'>
        <p className="mb-0">
          © 2024 All rights reserved | <a href="#" className="link-secondary text-decoration-none" onClick={reset}>reset</a>
        </p>
      </Container>
    </footer>
  )
}

export default Footer;