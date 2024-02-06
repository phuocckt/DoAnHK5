// import ProductsAPI from '../api/productAPI';
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import Item from "../components/Item/Item";
import { useUser } from "../components/UserContext";
import { theme } from "antd";

function Products() {
  const [products, setProducts] = useState([]);
  const { updateUser } = useUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useUser();
  useEffect(() => {
    const storedId = localStorage.getItem('id');
    const storedUsername = localStorage.getItem('fullname');
    updateUser({ fullname: storedUsername, id: storedId, token: localStorage.getItem('accessToken') });
    axiosClient.get("/Products")
      .then(res => {
        setProducts(res.data)
      });
  }, []);
  // console.log(products);

  return (
    <>
      <div className="category-products">
        {
          products.map((item, i) => {
            if (i > 0 && (item.clothesId === products[i - 1].clothesId)) {
              i++;
            } else {
              return <Item productId={item.id} name={item.name} image={item.imageId} price={item.price} userId={user.id}/>;
            }

          })
        }
      </div>

    </>
  );
}

export default Products;