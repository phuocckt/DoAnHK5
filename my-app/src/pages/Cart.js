import { Button, Col, Row, Table } from 'react-bootstrap';
import './css/Cart.css'
import { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';


function Cart() {
    const {all_product, cartItems, addToCart, removeFromCart, minusQuantity} = useContext(ShopContext);

  return (
    <>
        <div className='cart'>
            <Table className="table-light text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Product</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            all_product.map((e)=>{
                                if(cartItems[e.id]>0){
                                    return(
                                        <tr>
                                            <td><img className='img-cart-item' src={e.image} /></td>
                                            <td><p>{e.name}</p></td>
                                            <td><p>${e.new_price}</p></td>
                                            <td>
                                                <Button onClick={()=>{minusQuantity(e.id)}} variant='outline-none'><i class="fa-solid fa-minus"></i></Button>
                                                <input className='w-25' type='text' value={cartItems[e.id]}/>
                                                <Button onClick={()=>{addToCart(e.id)}} variant='outline-none'><i class="fa-solid fa-plus"></i></Button>
                                            </td>
                                            <td><p>${e.new_price * cartItems[e.id]}</p></td>
                                            <td><Button onClick={()=>{removeFromCart(e.id)}} variant='danger'><i class="fa-solid fa-trash"></i></Button></td>
                                        </tr>
                                    )
                                }
                            })
                        }
                    </tbody>        
            </Table>
        </div>
    </>
  );
}

export default Cart;
