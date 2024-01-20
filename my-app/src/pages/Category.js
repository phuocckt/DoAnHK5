import { useContext } from 'react';
import './css/Category.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../components/Item/Item';
import { Link } from 'react-router-dom';


function Category(props) {
    const {all_product} = useContext(ShopContext);
 
  return (
    <>
        <div className='category'>
            <ul className='product-type '> 
                <li ><Link to='/men'>Men</Link></li>
                <li ><Link to='/women'>Women</Link></li>
                <li ><Link to='/kid'>Kid</Link></li>
            </ul>
            <div className='category-products'>
                {
                    all_product.map((item,i)=>{
                        if(item.category === props.category){
                            return <Item id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>;
                        }
                        else{
                            return null;
                        }
                    })
                }
            </div>
        </div>
    </>
  );
}

export default Category;
