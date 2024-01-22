// import Product from '../components/Product';
import { useParams } from "react-router-dom";
import ItemDetail from "../components/ItemDetail/ItemDetail";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  
  useEffect(() => {
    // Chắc chắn rằng productId được chuyển thành số (do bạn so sánh với Number(productId) ở dòng 5)
    const id = Number(productId);

    axiosClient.get(`/Products/${id}`)
      .then(res => {
        setProduct(res.data);
      })
      .catch(error => {
        console.error('Error fetching product details:', error);
      });

  
  }, [productId]);
  // console.log("check",product.clothes.name);
  return (
    <>
      <ItemDetail product={product}/>
    </>
  ); 
// function Product(props) {
//   const [products, setProducts] = useState([]);
//   useEffect(() => {
//     axiosClient.get("/Products")
//       .then(res => {
//         setProducts(res.data)
//       });
//   }, []);

//   const {productId} = useParams();
//   const id = products.find((e)=>e.id === Number(productId))
  
//   const [product, setProduct] = useState({});
//   useEffect(() => {
//     axiosClient.get(`/Products/${id}`)
//       .then(res => {
//         setProduct(res.data)
//       });
//   }, []);
//   console.log(products);

//   return (
//     <>
//         <ItemDetail product={product} />  
//     </>
//   );
 }

export default Product;
