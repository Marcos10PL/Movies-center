import { Container, Form, Navbar, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function MyNavbar({ searchValue, setSearchValue }) 
{
  return (
    <Navbar expand="sm" data-bs-theme="dark" className="bg-primary">
      <Container>
        <Navbar.Brand className='text-secondary d-flex flex-column flex-sm-row w-100 align-items-center'>
          This is Your Movie Center
        </Navbar.Brand>
        <Form className="d-flex mt-2 mt-sm-0 w-100">
          <Form.Control
            type="search"
            placeholder="Search..."
            className="me-2"
            aria-label="Search"
            variant="secondary"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Button className='text-secondary'>
            <FontAwesomeIcon icon={faSearch} />
          </Button>
        </Form>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;