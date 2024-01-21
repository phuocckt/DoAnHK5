import { useContext } from 'react';
import './ItemDetail.css'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import Comment from '../Comment/Comment';

function ItemDetail(props) {
  const {product} = props;
  const {addToCart} = useContext(ShopContext);

  return (
    <>
        <div className='item-detail'>
          <div className='left'>

            <div className='list-img'>
              <div><img src={product.image} /></div>
              <div><img src={product.image} /></div>
              <div><img src={product.image} /></div>
              <div><img src={product.image} /></div>
            </div>

            <div className='main-img'>
              <img src={product.image} />
            </div>

          </div>

          <div className='right'>
            <h1>{product.name}</h1>
            <div className='star'>
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <p>(999)</p>
              </div>
              <div className='price'>
                <div className='old-price'>${product.old_price}</div>
                <div className='new-price'>${product.new_price}</div>
              </div>
              <div className='description'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Possimus iste impedit suscipit, quam quasi, cupiditate quae id atque placeat earum non ab tempora ea debitis eos ipsa ullam, architecto facilis?
              </div>
              <div className='size'>
                <h3>Select size</h3>
                <div className='sizes'>
                  <div>S</div>
                  <div>M</div>
                  <div>L</div>
                  <div>XL</div>
                  <div>XXL</div>
                </div>
                
              </div>
              <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>

          </div>
        </div>

        <Comment />
    </>
  );
}

export default ItemDetail;
