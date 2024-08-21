import { Container, Form, Navbar } from 'react-bootstrap';

function MyNavbar({ searchValue, setSearchValue }) 
{
  const handleSearchValue = e => 
  {
    e.preventDefault();
    setSearchValue(e.target.value)
  }

  return (
    <Navbar expand="sm" data-bs-theme="dark" className="bg-primary shadow">
      <Container>
        <Navbar.Brand className='text-secondary d-flex flex-column flex-sm-row w-100 align-items-center'>
          This is Your Movie Center
        </Navbar.Brand>
        <div className="d-flex mt-2 mt-sm-0 w-100">
          <Form.Control
            type="search"
            placeholder="Search for a movie..."
            className="me-2"
            aria-label="Search"
            variant="secondary"
            value={searchValue}
            onChange={(e) => handleSearchValue(e)}
          />
        </div>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;