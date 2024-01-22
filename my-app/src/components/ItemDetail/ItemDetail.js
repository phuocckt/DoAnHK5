import { useContext, useEffect, useState } from 'react';
import './ItemDetail.css'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import Comment from '../Comment/Comment';
import axiosClient from '../../api/axiosClient';

function ItemDetail(props) {
  const {product} = props;
  const {addToCart} = useContext(ShopContext);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiosClient.get("/Products")
      .then(res => {
        setProducts(res.data)
      });
  }, []);
  // console.log("hbauhbiasijdfis",product.clothes);

  return (
    <>
        <div className='item-detail'>
          <div className='left'>

          <div className='list-img'>
              {
                  products.map((item,i,arr)=>{
                    const abc = arr.findIndex(prev => prev.imageId === item.imageId) === i;
                    if(item.clothesId === product.clothesId && abc){
                      return <div><img src={`https://localhost:7258/images/product/${item.imageId}.jpg`} /></div>;
                    }  
                  })
              }
          </div>
          


            <div className='main-img'>
              <img src={`https://localhost:7258/images/product/${product.imageId}.jpg`} />
            </div>

          </div>

          <div className='right'>
            {/* <h1>{product.clothes.name}</h1> */}
            <div className='star'>
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <p>(999)</p>
              </div>
              <div className='price'>
                <div className='new-price'>${product.price}</div>
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
