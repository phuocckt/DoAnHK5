import './Navbar.css'
import {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';

function Navbar() {
    const [active, setActive] = useState("home");
    const [carts, setCart]=useState([]);
    useEffect(()=>{
        axiosClient.get("/Carts")
        .then(res=>setCart(res.data));
    },[]);
    const getTotalCartItem=()=>{
        return carts.length;
    }

  return (
    <>
        <div className='navbar'>
            <div className='nav-logo'>
                <Link to='/'><img src="./image/logo/logo_shop.png"/></Link>
                <p>CLOTHES SHOP</p>
            </div>
            <ul className='nav-menu'>
                <Link className='text-decoration-none' to='/'><li onClick={()=>setActive("home")} className={active==="home"?"active":""}>HOME</li></Link>
                <Link className='text-decoration-none' to='/products'><li onClick={()=>setActive("product")} className={active==="product"?"active h":"h"}>PRODUCT</li></Link>
                <Link className='text-decoration-none' to='/favorites'><li onClick={()=>setActive("favorite")} className={active==="favorite"?"active":""}>FAVORITE</li></Link>
                <Link className='text-decoration-none' to='/categories'><li onClick={()=>setActive("category")} className={active==="category"?"active":""}>CATEGORY</li></Link>
                <Link className='text-decoration-none' to='/invoice'><li onClick={()=>setActive("invoice")} className={active==="invoice"?"active":""}>INVOICE</li></Link>
            </ul>
            <div className='nav-end'>
                <Link to='login'><button>Login</button></Link>
                <Link to='cart' className='text-light'><i class="fa-solid fa-cart-shopping" /></Link>      
                <div className='cart-count'>{getTotalCartItem()}</div>
            </div>
        </div>
        
    </>
  );
}

export default Navbar;
