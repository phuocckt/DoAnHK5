// import Product from '../components/Product';
import { useParams } from "react-router-dom";
import all_product from "../components/Assets/all_product";
import ItemDetail from "../components/ItemDetail/ItemDetail";

function Products() {
  const {productId} = useParams();
  const product = all_product.find((e)=>e.id === Number(productId))

  return (
    <>
        <ItemDetail product={product} />  
    </>
  );
}

export default Products;
