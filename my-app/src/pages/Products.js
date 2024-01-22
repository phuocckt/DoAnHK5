// import ProductsAPI from '../api/productAPI';
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Item from "../components/Item/Item";

function Products() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiosClient.get("/Products")
      .then(res => {
        setProducts(res.data)
      });
  }, []);
  console.log(products);

  return (
    <>
      <div className="category-products">
      {
          products.map((item,i)=>{
            if(i > 0 && (item.clothesId === products[i - 1].clothesId)){
              i++;
            }else{
              return <Item id={item.id} name={item.name} image={item.imageId} price={item.price}/>;
            }  
            
          })
      }
      </div>
      
    </>
  );
}

export default Products;