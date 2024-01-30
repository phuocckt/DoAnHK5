import { useParams } from "react-router-dom";
import Comment from "../components/Comment/Comment";
import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import './css/Product.css'

function Product() {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [clothes, setClothes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [image, setImage] = useState(null);

  
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
  // console.log("check color",selectColor);

  const handleClick = (item)=> ()=>{
    setImage(item.imageId);
    setSelectColor(item.colorId);
  }

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
                <p> Color:
                  {
                    colors.map((item,i)=>{
                      if(item.id === selectColor){
                        // handleClick(product);
                        return <span className="mx-2 fw-bold">{item.name}</span>;
                      }
                    })
                  }
                </p>
              </div>          
              <div className='size'>
                <h5>Select size</h5>
                <div className='sizes'>
                  {
                      products.map((item,i,arr)=>{
                        const abc = arr.findIndex(prev => prev.sizeId === item.sizeId) === i;
                        if(item.sizeId === product.sizeId && abc){
                          return<>
                        {
                                sizes.map((item1,i1)=>{
                                  if(item.sizeId === item1.id){return <>{item1.name}</>;}
                                })
                              }
                            </>;
                        }  
                      })
                      // sizes.map((item,i)=>{
                      //   if(item.id === product.sizeId){
                      //     return <>
                      //     {item.name+"    "}
                      //     {
                      //       colors.map((item,i)=>{
                      //         if(item.id === product.colorId){return <>{item.name} <br></br></>;}
                      //       })
                      //     }
                      //   </>;
                      //   }
                        
                      // })
                    }
                  {/* <div>S</div>
                  <div>M</div>
                  <div>L</div>
                  <div>XL</div>
                  <div>XXL</div> */}
                </div>
                
              </div>
              {/* <button >ADD TO CART</button> */}

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
