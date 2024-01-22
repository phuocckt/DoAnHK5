import './Popular.css'
import Item from '../Item/Item'
import data_product from '../Assets/data'
import { useEffect, useState } from 'react';
import productApi from '../../api/productAPI';
import axiosClient from '../../api/axiosClient';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Popular() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        // const fetchProducts = async()=>{
        //     products = await productApi.getAll().then(res=>setProducts(res.data));
        //     console.log(products);
        // }

        // fetchProducts();
        axios.get(`https://api.ezfrontend.com/products`).then(res=>setProducts(res.data))
    }, []);

  return (
    <>
        <div className='popular'>
            <h1>Popular Products<i class="fa-solid fa-chevron-down ms-4 fs-3"></i></h1>
            <div className='product_list'>
                {
                    data_product.map((item, i)=>{
                        return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price}/>
                    })
                }
            </div>
            <Link className='text-decoration-none' to="/products"><button>See more <i class="fa-solid fa-arrow-right"></i></button></Link>
        </div>
    </>
  );
}

export default Popular;
