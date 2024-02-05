import { useContext, useEffect, useState } from 'react';
import './css/Category.css';
import { ShopContext } from '../Context/ShopContext';
import Item from '../components/Item/Item';
import { Link, useParams } from 'react-router-dom';
import axiosClient from '../api/axiosClient';


function Category(props) {
    const [products, setProduct] = useState([]);
    const [productTypes, setProductType] = useState([]);
    const [selectedProductType, setSelectedProductType] = useState(null);
    const { productTypeId } = useParams();
    
    useEffect(()=>{
        axiosClient.get("/Products")
        .then(res => setProduct(res.data));
        axiosClient.get("/ProductTypes")
        .then(res => setProductType(res.data));
    },[]);
    useEffect(() => {
        // Khi giá trị productTypeId thay đổi, hãy cập nhật selectedProductType
        if (productTypeId) {
            const selectedType = productTypes.find(item => item.id === parseInt(productTypeId));
            setSelectedProductType(selectedType);
        }
    }, [productTypeId, productTypes]);
    const handleProductTypeChange = (selectedType) => {
        setSelectedProductType(selectedType);
    }
    const filteredProducts = selectedProductType
        ? products.filter(item => item.productTypeId === selectedProductType.id)
        : products;
 
  return (
    <>
        <div className='category'>
            <ul className='product-type '> 
                {productTypes.map((item)=>{
                    return <li key={item.id} onClick={() => handleProductTypeChange(item)}><Link to={`/categories/${item.id}`}>{item.name}</Link></li>
                })}
            </ul>
            <div className='category-products'>
                {
                    filteredProducts.map((item,i)=>{
                        if(i > 0 && (item.clothesId === products[i - 1].clothesId)){
                            i++;
                        }else {
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
