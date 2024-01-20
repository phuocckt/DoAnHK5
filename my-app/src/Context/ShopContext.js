import {createContext, useState } from "react";
import all_product from '../components/Assets/all_product'

export const ShopContext = createContext(null);

const getDeafaultCart = ()=>{
    let cart = {};
    for(let i=0; i< all_product.length+1; i++){
        cart[i]=0;
    }
    return cart;
}

const getDeafaultFavorite = ()=>{
    let favorite = {};
    for(let i=0; i< all_product.length+1; i++){
        favorite[i]=false;
    }
    return favorite;
}

const ShopContextProvider = (props) => {
    
    const [cartItems, setcartItems] = useState(getDeafaultCart());
    const [favoriteItems, setfavoriteItems] = useState(getDeafaultFavorite());

    //giỏ hàng
    const addToCart = (itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}));
    }
    const minusQuantity = (itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}));
    }
    const removeFromCart = (itemId)=>{
        setcartItems((prev)=>({...prev,[itemId]:0}));
    }
    const getTotalCartItem = ()=>{
        let sum=0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                sum+=cartItems[item];
            }
        }
        return sum;
    }
    //yêu thích
    const addToFavorite = (itemId)=>{
        setfavoriteItems((prev)=>({...prev,[itemId]:true}));
        // console.log(favoriteItems);
    }
    const removeFromFavorite = (itemId)=>{
        setfavoriteItems((prev)=>({...prev,[itemId]:false}));
    }
    
    const contextValue = {
        all_product, 
        cartItems ,addToCart, removeFromCart,minusQuantity,getTotalCartItem,
        favoriteItems,addToFavorite,removeFromFavorite
    };

    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    );
}
export default ShopContextProvider;