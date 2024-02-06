import { useEffect, useState } from 'react';
import Item from '../components/Item/Item';
import './css/Favorite.css';
import axiosClient from '../api/axiosClient';
import { useUser } from '../components/UserContext';
import { theme } from 'antd';

function Favorites() {
  // Sử dụng useState để khởi tạo state favorites
  const [favorites, setFavorites] = useState([]);
  const { updateUser } = useUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { user } = useUser();

  useEffect(() => {
    // Gọi API để lấy danh sách sản phẩm yêu thích khi component mount
    const storedId = localStorage.getItem('id');
    const storedUsername = localStorage.getItem('fullname');
    updateUser({ fullname: storedUsername, id: storedId, token: localStorage.getItem('accessToken') });
    axiosClient.get("/Favorites")
      .then(res => {
        // Cập nhật state favorites khi có dữ liệu trả về từ API
        setFavorites(res.data);
      })
      .catch(error => {
        console.error('Error fetching favorites:', error);
      });
  }, []);

  return (
    <>
      <div className='favorite'>
        {
          // Sử dụng map để render danh sách sản phẩm yêu thích
          favorites.map((e) => {
            if (user.id === e.userId) {
              return (
                <Item id={e.id} productId={e.productId} name={e.product.name} image={e.product.imageId} price={e.product.price} idFa={e.id} />
              );
            }
            return null; // Trả về null nếu không có id
          })
        }
      </div>
    </>
  )
}

export default Favorites;
