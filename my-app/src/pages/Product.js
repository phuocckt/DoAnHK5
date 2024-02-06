import {useNavigate, useParams } from "react-router-dom";
import Comment from "../components/Comment/Comment";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import './css/Product.css'
import Swal from 'sweetalert2';
import { useUser } from '../components/UserContext';
import { theme } from "antd";

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [clothes, setClothes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);
  const { updateUser } = useUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useUser();
  const navigate = useNavigate();

  
  // handleClick(product);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axiosClient.get("/Products")
      .then(res => {
        setProducts(res.data)
      });
      axiosClient.get("/Clothes")
      .then(res => {
        setClothes(res.data)
      });
      axiosClient.get("/Sizes")
      .then(res => {
        setSizes(res.data)
      });
      axiosClient.get("/Colors")
      .then(res => {
        setColors(res.data)
      });
  }, []);
  useEffect(() => {
    // Định nghĩa một hàm bất đồng bộ để gọi API
    // const id = Number(productId);
    const storedId = localStorage.getItem('id');
    const storedUsername = localStorage.getItem('fullname');
    updateUser({fullname: storedUsername, id: storedId, token: localStorage.getItem('accessToken') });
    const fetchData = async () => {
      try {
        // Gọi API và chờ nhận kết quả
        const response = await axiosClient.get(`/Products/${productId}`);
        
        // Xử lý dữ liệu nhận được từ API và cập nhật state
        setProduct(response.data);
      } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [productId]);

  const [selectColor, setSelectColor] = useState(product.colorId);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedClothes, setSelectedClothes] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleClick = (item)=> ()=>{
    setImage(item.imageId);
    setSelectColor(item.colorId);
    setSelectedColor(item.colorId);
    setSelectedClothes(item.clothesId);
  }
  const uniqueSizeIds = new Set();
  useEffect(() => {
    if(selectedColor!==null && selectedSize!== null&&selectedClothes!==null){
      axiosClient.get(`/Products/GetProductId/${selectedClothes}/${selectedSize}/${selectedColor}`)
      .then(res => {
        setSelectedProductId(res.data.id);
      }
      )
    }
  },[selectedColor, selectedSize, selectedClothes]);
  const addToCart = () => {
    // Kiểm tra xem đã chọn size và màu chưa
    if (selectedSize && selectedColor && user.id) {
      // Gửi dữ liệu lên server để thêm vào giỏ hàng
      const data = {
        productId: selectedProductId,
        userId: user.id,
        quantity: 1
      };
      console.log(data);
  
      // Gọi API để thêm sản phẩm vào giỏ hàng
      axiosClient.post("/Carts", data)
        .then(response => {
          // Xử lý khi thêm vào giỏ hàng thành công
          Swal.fire({
            title: "Thành công!",
            text: "Sản phẩm đã được thêm vào giỏ hàng!",
            icon: "success",
            confirmButtonText: "OK",
          });
        })
        .catch((error)=> {
          // Xử lý khi có lỗi thêm vào giỏ hàng
          Swal.fire({
            title: "Lỗi!",
            text: "Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng!",
            icon: "error",
            confirmButtonText: "OK",
          });
        });
    }else if(!selectedSize){
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng nhập đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "OK",
      });
    }else if(!selectColor){
      Swal.fire({
        title: "Lỗi!",
        text: "Vui lòng nhập đầy đủ thông tin",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
     else {
      // Hiển thị thông báo hoặc xử lý khi size hoặc màu chưa được chọn
      window.location.href="/login";
    }
  };

  return (
      
    <>
        <div className='item-detail'>
          <div className='left'>

          <div className='list-img'>
              {
                  products.map((item,i,arr)=>{
                    const abc = arr.findIndex(prev => prev.imageId === item.imageId) === i;
                    if(item.clothesId === product.clothesId && abc){
                      return <div className="border" onClick={handleClick(item)}><img src={`https://localhost:7258/images/product/${item.imageId}.jpg`} /></div>;
                    }  
                  })
              }
          </div>
          


            <div className='main-img'>
              <img src={`https://localhost:7258/images/product/${image || product.imageId}.jpg`} />
            </div>

          </div>

          <div className='right'>
            {
              clothes.map((item,i)=>{
                if(item.id === product.clothesId){return <h1>{item.name}</h1>;}
              })
            }
            <div className='star'>
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <i class="fa-solid fa-star" />
                <p>(999)</p>
              </div>
              <div className='price'>
                <div className='new-price'>${product.price}</div>
              </div>
                {
                  clothes.map((item,i)=>{
                    if(item.id === product.clothesId){return <div className='description'>{item.description} </div>;}
                  })
                }   
              <div className='colors my-3'> 
                <h5>Color:
                  {
                    colors.map((item,i)=>{
                      if(item.id === selectColor){
                        return <span className="mx-2 fw-bold">{item.name}</span>;
                      }
                    })
                  }
                </h5>
              </div>          
              <div className='size'>
                <h5>Select size</h5>
                <div className='sizes'>
                <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                <option>Chọn size</option>
                  {
                      products.map((item)=>{
                        if(item.clothesId === product.clothesId && !uniqueSizeIds.has(item.sizeId)){
                          uniqueSizeIds.add(item.sizeId);
                          return (
                            <option key={item.sizeId} value={item.sizeId}>
                              {sizes.map((item1) => (item.sizeId === item1.id && item1.name))}
                            </option>
                          );
                        }  
                      })
                    }
                </select>
                </div>
                
              </div>
               <button onClick={addToCart}>ADD TO CART</button>

          </div>
        </div>

        <Comment />
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
