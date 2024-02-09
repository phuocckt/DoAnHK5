import { useState, useEffect } from 'react';
import './Item.css'
import { Link } from 'react-router-dom';
import axiosClient from '../../api/axiosClient';
import Swal from 'sweetalert2';

function Item(props) {
  const [isFavorited, setIsFavorited] = useState(false);

  const addFavorite = (itemId) => {
    const data = {
      userId: props.userId,
      productId: itemId
    };

    // Gọi API khi người dùng nhấp vào nút yêu thích
    axiosClient.post("/Favorites", data)
      .then(() => {
        // Cập nhật trạng thái khi API gọi thành công
        setIsFavorited(true);
        window.location.reload();
      })
      .catch((error) => {
        Swal.fire({
          title: "Thông báo!",
          text: "Sản phẩm này đã được yêu thích!",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }
  const moveFavorite=(itemId)=>{
    axiosClient.delete(`/Favorites/${itemId}`)
    .then(()=> {
      setIsFavorited(false);
      window.location.reload();
    });
  }

  useEffect(() => {
    // Kiểm tra xem sản phẩm đã được yêu thích chưa khi component mount
    setIsFavorited(props.productId === props.idFa);
  }, [props.id, props.idFa]);

  return (
    <>
      <div className='card'>
        <Link className='text-decoration-none' to={`/product/${props.productId}`}>
          <img src={`https://localhost:7258/images/product/${props.image}.jpg`} />
        </Link>

        <div className='content'>
          <div className='star'>
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
            <i className="fa-solid fa-star" />
          </div>
          <div className='price'>
            <div className='new-price'>{props.price} VNĐ</div>
          </div>
          <div className='utilities'>
            <i
              onClick={() => (!isFavorited) ? addFavorite(props.productId) : moveFavorite(props.id)}
              className={isFavorited ? "fa-solid fa-heart text-danger" : "fa-regular fa-heart"}
            ></i>
            <i className="fa-regular fa-comment"></i>
            <i className="fa-regular fa-share-from-square"></i>
          </div>
        </div>

      </div>
    </>
  );
}

export default Item;