import './Navbar.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import { useUser } from '../UserContext';
import { theme } from 'antd';

function Navbar() {
    const [active, setActive] = useState("home");
    const [carts, setCart] = useState([]);
    const navigate= useNavigate();
    const [showStatus, setShowStatus] = useState(false);
    const { updateUser } = useUser();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { user } = useUser();
    useEffect(() => {
        const storedId = localStorage.getItem('id');
        const storedUsername = localStorage.getItem('fullname');
        updateUser({ fullname: storedUsername, id: storedId, token: localStorage.getItem('accessToken') });
        axiosClient.get("/Carts")
            .then(res => setCart(res.data));
    }, []);
    const handleLogoutClick = () => {
        localStorage.removeItem('id',"fullname","accessToken");
        window.location.href = '/';
    };

    return (
        <>
            <div className='navbar'>
                <div className='nav-logo'>
                    <Link to='/'><img src="./image/logo/logo_shop.png" /></Link>
                    <p>CLOTHES SHOP</p>
                </div>
                <ul className='nav-menu'>
                    <Link className='text-decoration-none' to='/'><li onClick={() => setActive("home")} className={active === "home" ? "active" : ""}>HOME</li></Link>
                    <Link className='text-decoration-none' to='/products'><li onClick={() => setActive("product")} className={active === "product" ? "active h" : "h"}>PRODUCT</li></Link>
                    <Link className='text-decoration-none' to='/favorites'><li onClick={() => setActive("favorite")} className={active === "favorite" ? "active" : ""}>FAVORITE</li></Link>
                    <Link className='text-decoration-none' to='/categories'><li onClick={() => setActive("category")} className={active === "category" ? "active" : ""}>CATEGORY</li></Link>
                    <Link className='text-decoration-none' to='/invoice'><li onClick={() => setActive("invoice")} className={active === "invoice" ? "active" : ""}>INVOICE</li></Link>
                </ul>
                <div className='nav-end'>
                    {user.id ? (
                        <>
                            <div className='status'>
                                <a onClick={() => setShowStatus(!showStatus)}><i className="fa-solid fa-user"/>{user.fullname}</a>
                                {showStatus && (
                                    <table>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <a onClick={handleLogoutClick}>Logout</a>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                )}
                            </div>
                            <Link to='cart' className='text-light'><i className="fa-solid fa-cart-shopping" /></Link>
                        </>
                    ) : (
                        <Link to='login'><button>Login</button></Link>
                    )}
                </div>
            </div>

        </>
    );
}

export default Navbar;
