import { Button, InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function BasicExample() {
  const [showLogin, setShowLogin] = useState(false);

  function handleShowLogin() {
    setShowLogin(true);
  }
  const [showRegister, setShowRegister] = useState(false);

  function handleShowRegister() {
    setShowRegister(true);
  }

  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary ">
      <Container fluid>
        <Navbar.Brand href="/">
            <img style={{width:'70px'}} src="./image/logo/logo_shop.png"/>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse className="justify-content-between" id="basic-navbar-nav">

          <Nav className="justify-content-end">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/products">Products</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          
          <Form className="d-flex me-2 mb-2 ">
                <InputGroup>
                <Form.Control
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    className='focus-ring focus-ring-light'
                />
                <Button variant="outline-success" id="button-addon2">
                <i class="fa-solid fa-magnifying-glass"></i>
                </Button>
                </InputGroup>
            </Form>

            <div>   
                <Button href='/favorites' className="me-2" variant="outline-success"><i class="fa-solid fa-heart"></i></Button>
                <Button href='/cart' className="me-2" variant="outline-success"><i class="fa-solid fa-cart-shopping"></i></Button>
                <Button onClick={handleShowLogin} className="me-2" variant="outline-success">Login</Button>
                <Button onClick={handleShowRegister} className="me-2" variant="outline-success">Register</Button>
            </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    {/* Form login */}
    <Modal centered size="sm" show={showLogin} onHide={() => setShowLogin(false)}>
    <Modal.Header closeButton>
    <Modal.Title>Login</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" required isInvalid/>
                <Form.Control.Feedback type="invalid">
                    Please choose a username.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required isInvalid/>
                <Form.Control.Feedback type="invalid">
                    Please choose a password.
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>

            <div className='d-flex justify-content-between'>
                <Link>Fogot password</Link>

                <Button variant="primary" type="submit">
                    Login
                </Button>
            </div>    
        </Form>
    </Modal.Body>
    </Modal>
    {/* Form Register */}
    <Modal centered size="lg" show={showRegister} onHide={() => setShowRegister(false)}>
    <Modal.Header closeButton>
    <Modal.Title>Register</Modal.Title>
    </Modal.Header>
    <Modal.Body className='d-flex justify-content-around align-items-center'>
        <div>
          <img style={{width:'200px'}} src="./image/logo_shop.png"/>
        </div>
        <Form className='w-50'>
            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className='d-inline'>Username</Form.Label>
                <Form.Control type="text" placeholder="Username" required isInvalid/>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicEmail">
                <Form.Label className='d-inline'>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" required/>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className='d-inline'>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required/>
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label className='d-inline'>Re-Password</Form.Label>
                <Form.Control type="password" placeholder="Re-Password" required/>
            </Form.Group>

            <div className='d-flex justify-content-between mt-4'>
                <Link>Fogot password</Link>

                <Button variant="primary" type="submit">
                    Register
                </Button>
            </div>    
        </Form>
    </Modal.Body>
    </Modal>
    </>
  );
}

export default BasicExample;