import { useContext, useEffect, useState } from 'react';
import './css/Category.css';
import Item from '../components/Item/Item';
import axiosClient from '../api/axiosClient';


function Category() {
    const [products, setProduct] = useState([]);
    const [productTypes, setProductType] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState(1);
    
    useEffect(()=>{
        axiosClient.get("/Products")
        .then(res => setProduct(res.data));
        axiosClient.get("/ProductTypes")
        .then(res => setProductType(res.data));
    },[]);
    const handleProductTypeChange = (selectedType) => {
        setSelectedProductType(selectedType);
    }
  return (
    <>
        <div className='category'>
            <ul className='product-type '> 
                {productTypes.map((item)=>{
                    return <li key={item.id} onClick={()=>handleProductTypeChange(item.id)} className={selectedProductType===item.id?"active-protype":""}>{item.name}</li>
                })}
                
            </ul>
            <div className='category-products'>
                {
                    products.map((item,i)=>{
                        if(i > 0 && (item.clothesId === products[i - 1].clothesId)){
                            i++;
                        }else if(item.clothes.productTypeId === selectedProductType){
                            return <Item id={item.id} name={item.name} image={item.imageId} price={item.price}/>;
                        }
                    })
                }
            </div>
        </div>
    </>
  );
}

export default Category;
