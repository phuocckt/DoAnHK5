import { Button, Col, Row, Table } from 'react-bootstrap';
import './css/Cart.css'
import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import Swal from 'sweetalert2';


function Cart() {
    const [carts, setCart] = useState([]);
    useEffect(() => {
        // Định nghĩa một hàm bất đồng bộ để gọi API
        // const id = Number(productId);

        const fetchData = async () => {
            try {
                // Gọi API và chờ nhận kết quả
                const response = await axiosClient.get(`/Carts`);

                // Xử lý dữ liệu nhận được từ API và cập nhật state
                setCart(response.data);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    const handleDelete = (cartId) => {
        axiosClient.delete(`/Carts/${cartId}`)
          .then(() => {
            // Sau khi xóa thành công, cập nhật danh sách sản phẩm
            setCart(prevcartId => prevcartId.filter(carts => carts.id !== cartId));
          });
    };
    const handleDeleteConfirmation = (cartId) => {
        const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (shouldDelete) {
          handleDelete(cartId);
          Swal.fire({
            title: "Thành công!",
            text: "Xóa thành công",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
    };

    return (
        <>
            <div className='cart'>
                <Table className="table-light text-center align-middle">
                    <thead className="table-dark">
                        <tr>
                            <th>Product</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Size</th>
                            <th>Color</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            carts.map((item) => {
                                return (
                                    <tr>
                                        <td><img className='img-cart-item' src={`https://localhost:7258/images/product/${item.product.imageId}.jpg`} /></td>
                                        <td><p>{item.product.clothes.name}</p></td>
                                        <td><p>{item.product.price}</p></td>
                                        <td><p>{item.product.size.name}</p></td>
                                        <td><p>{item.product.color.name}</p></td>
                                        <td>
                                            <Button variant='outline-none'><i class="fa-solid fa-minus"></i></Button>
                                            <input className='w-25' type='text' value={item.quantity} readOnly/>
                                            <Button variant='outline-none'><i class="fa-solid fa-plus"></i></Button>
                                        </td>
                                        <td><p>{item.product.price * item.quantity}</p></td>
                                        <td><Button variant='danger' onClick={() => handleDeleteConfirmation(item.id)}><i class="fa-solid fa-trash"></i></Button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
            </div>
        </>
    );
}

export default Cart;
