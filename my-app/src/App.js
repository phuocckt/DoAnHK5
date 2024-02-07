import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout2 from './Layout_2';
import Home from './pages/Home';
import Product from './pages/Product';
import Products from './pages/Products';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Category from './pages/Category';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Invoice from './pages/Invoice';

function App() {
  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/2" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="products" element={<Products />}/> 
                <Route path="favorites" element={<Favorites />}/>
                <Route path="cart" element={<Cart />}/>    
                <Route path="productDetail" element={<ProductDetail />}/>   
                <Route path="bill" element={<Bill />}/>             
            </Route> */}
            <Route path="/" element={<Layout2 />}>
                <Route index element={<Home />} />

                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />

                <Route path="/products" element={<Products />} />

                <Route path="/product" element={<Product />}>
                  <Route path=":productId" element={<Product />} />
                </Route> 
                
                <Route path="/categories" element={<Category />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/invoice" element={<Invoice />} />

            </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
