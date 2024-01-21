import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

function RowColLayoutColWidthBreakpointExample() {
  return (
    <>
        <Container className="my-5">
          <Row md={2}>
            <Col className='d-flex'>
              <div>
                <img className='border mb-2' style={{width:'100px'}} src="https://chiinstore.com/media/product/3250_634x634__4_.png"/>
                <img className='border mb-2' style={{width:'100px'}} src="https://chiinstore.com/media/product/3250_634x634__4_.png"/>
                <img className='border mb-2' style={{width:'100px'}} src="https://chiinstore.com/media/product/3250_634x634__4_.png"/>
                <img className='border mb-2' style={{width:'100px'}} src="https://chiinstore.com/media/product/3250_634x634__4_.png"/>
                <img className='border mb-2' style={{width:'100px'}} src="https://chiinstore.com/media/product/3250_634x634__4_.png"/>
              </div>
              <img className='border' style={{width:'500px'}} src="https://chiinstore.com/media/product/3250_634x634__4_.png"/>
            </Col>

            <Col className='ps-5'>
              <h1 className='mb-2'>Product name</h1>
              <div className='d-flex align-items-center'>
                <h4 className='text-danger me-3'>$9.999</h4>
                <h5 className='text-decoration-line-through'>$99.999</h5>
              </div>
              <p className='px-4 my-4'>Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem </p>
              <div className='d-flex align-items-center text-warning'>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <i class="fa-solid fa-star"></i>
                <span className='ms-2 fw-bold fs-5'>5</span>
              </div>
              <div className='my-3'>
                Color: <span className='fw-bold'>Red</span>
                <div className='my-2'>
                  <i className='fa-solid fa-circle text-danger me-2 border border-3 rounded-circle border-danger p-1'></i>
                  <i className='fa-solid fa-circle text-success me-2'></i>
                  <i className='fa-solid fa-circle text-warning me-2'></i>
                  <i className='fa-solid fa-circle text-primary me-2'></i>
                </div>
              </div>
              <div className='my-3'>
                Size: <span className='fw-bold'>XL</span>
                <div className='my-4'>
                  <span className='border p-3 fw-bold me-2'>S</span>
                  <span className='border p-3 fw-bold me-2'>M</span>
                  <span className='border p-3 fw-bold me-2'>L</span>
                  <span className='border p-3 fw-bold border-3 border-success me-2'>XL</span>
                </div>
              </div>
              <div className='my-5'>
                <a className='rounded-pill btn btn-primary me-3'><i class="fa-solid fa-cart-shopping me-2"></i>ADD TO CART</a>
                <Button className='rounded-circle me-2' variant="danger"><i class="fa-solid fa-heart"></i></Button>
              </div>
            </Col>
          </Row>
        </Container>
    </>
  );
}

export default RowColLayoutColWidthBreakpointExample;