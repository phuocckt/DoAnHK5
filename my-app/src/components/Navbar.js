import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';


function OffcanvasExample() {
  return (
    <>
        <Navbar key="lg" expand="lg" className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">
              <img style={{width:'100px'}} src="https://t3.ftcdn.net/jpg/05/36/02/06/360_F_536020641_rprZK7Kg8Cx6EtU7RJOjkLrdLNp6sB6a.jpg"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-lg`}
              aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-start flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Trang chủ</Nav.Link>
                  <Nav.Link href="#action2">Sản phẩm</Nav.Link>
                  <NavDropdown
                    title="Thể loại"
                    id={`offcanvasNavbarDropdown-expand-lg`}
                  >
                    <NavDropdown.Item href="#action3">Thể thao</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Y tá
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Khác
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Tìm kiếm"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success"><i class="fa-solid fa-magnifying-glass"></i></Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default OffcanvasExample;