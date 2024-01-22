import { useContext } from 'react';
import './Item.css'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

function Item(props) {
  const {all_product,favoriteItems,addToFavorite,removeFromFavorite } = useContext(ShopContext);

  return (
    <>
        <div className='card'>
           <Link className='text-decoration-none' to={`/product/${props.id}`}>
             {/* <img src='https://chiinstore.com/media/product/3250_634x634__4_.png' /> */}
             <img src={`https://localhost:7258/images/product/${props.image}.jpg`} />
           </Link>
           
            <div className='content'>
              <div className='star'>
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
              </div>
              {/* <p className='name_product'>{props.name}</p> */}
              <div className='price'>
                <div className='new-price'>${props.price}</div>
                <div className='old-price'>${props.old_price}</div>
              </div>
              <div className='utilities'>
                <i onClick={(props.id===props.idFA)?()=>{removeFromFavorite(props.id)}:()=>{addToFavorite(props.id)}} class={(props.id===props.idFA)?"fa-solid fa-heart text-danger":"fa-regular fa-heart"}></i>    
                <i class="fa-regular fa-comment"></i>
                <i class="fa-regular fa-share-from-square"></i>
              </div>
            </div>
            
        </div>
    </>
  );
}

export default Item;
