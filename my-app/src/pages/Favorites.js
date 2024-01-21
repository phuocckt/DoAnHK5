import { useContext } from 'react';
import Item from '../components/Item/Item';
import './css/Favorite.css'
import { ShopContext } from '../Context/ShopContext';

function Favorites() {
  const {all_product,favoriteItems } = useContext(ShopContext);

  return(
    <>
      <div className='favorite'>
        {
            all_product.map((e)=>{
                if(favoriteItems[e.id]){
                    return(
                      
                        <Item id={e.id} name={e.name} image={e.image} new_price={e.new_price} old_price={e.old_price} idFA={e.id}/>
                    )
                }
            })
        }
      </div>
    </>
  )
    
}

export default Favorites;
