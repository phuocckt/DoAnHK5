import './Popular.css'
import Item from '../Item/Item'
import { useEffect, useState } from 'react';
import axiosClient from '../../api/axiosClient';
import { Link } from 'react-router-dom';

function Popular() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axiosClient.get(`/Products`).then(res=>setProducts(res.data))
    }, []);

  return (
    <>
        <div className='popular'>
            <h1>Popular Products<i class="fa-solid fa-chevron-down ms-4 fs-3"></i></h1>
            <div className='product_list'>
                {
                    products.slice(0, 28).map((item, i)=>{
                        if(i > 0 && (item.clothesId === products[i - 1].clothesId)){
                            i++;
                        }else{
                            return <Item productId={item.id} name={item.name} image={item.imageId} price={item.price}/>;
                        }  
                    })
                }
            </div>
            <Link className='text-decoration-none' to="/products"><button>See more <i class="fa-solid fa-arrow-right"></i></button></Link>
        </div>
    </>
  );
}

export default Popular;
