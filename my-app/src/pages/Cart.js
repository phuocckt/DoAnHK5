import { Button, Col, Form, FormText, Modal, Row, Table } from 'react-bootstrap';
import './css/Cart.css'
import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import Swal from 'sweetalert2';
import { useUser } from '../components/UserContext';
import { theme } from 'antd';

function Cart() {
    const [carts, setCart] = useState([]);
    const [show, setShow] = useState(false);
    const [totals, setTotal] = useState(0);
    const [invoices, setInvoice] = useState({});
    const [invoiceDetail, setInvoiceDetail] = useState({});
    const { updateUser } = useUser();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const { user } = useUser();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    useEffect(() => {
        // Định nghĩa một hàm bất đồng bộ để gọi API
        // const id = Number(productId);
        const storedId = localStorage.getItem('id');
        const storedUsername = localStorage.getItem('fullname');
        updateUser({ fullname: storedUsername, id: storedId, token: localStorage.getItem('accessToken') });

        const fetchData = async () => {
            try {
                // Gọi API và chờ nhận kết quả
                const response = await axiosClient.get(`/Carts`);
        
                // Xử lý dữ liệu nhận được từ API và cập nhật state
                const cartTotal = response.data.reduce((acc, item) => {
                    if (user.id === item.userId) {
                        return acc + item.product.price * item.quantity;
                    }
                    return acc;
                }, 0);
                setTotal(cartTotal);
                setCart(response.data);
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [user.id]);
    const handleDelete = (cartId) => {
        axiosClient.delete(`/Carts/${cartId}`)
            .then(() => {
                window.location.reload();
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
    const addStock = (idx, quan, proId, stock) => {
        const data = {
            id: idx,
            userId: user.id,
            productId: proId,
            quantity: quan + 1
        }
        if (quan >= stock) {
            Swal.fire({
                title: "Thông báo!",
                text: "Không còn đủ sản phẩm",
                icon: "error",
                confirmButtonText: "OK",
            });
        } else {
            axiosClient.put(`/Carts/${idx}`, data)
                .then(() => {
                    // Sau khi xóa thành công, cập nhật danh sách sản phẩm
                    window.location.reload();
                });
        }
    }
    const moveStock = (idx, quan, proId) => {
        const data = {
            id: idx,
            userId: user.id,
            productId: proId,
            quantity: quan - 1
        }
        if (quan === 1) {
            handleDeleteConfirmation(idx);
        } else {
            axiosClient.put(`/Carts/${idx}`, data)
                .then(() => {
                    // Sau khi xóa thành công, cập nhật danh sách sản phẩm
                    window.location.reload();
                });
        }
    }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
    
        setInvoice((prevInvoice) => ({
            ...(prevInvoice || {}),
            [name]: type === 'select-one' ? e.target.selectedOptions[0].value : (type === 'checkbox' ? checked : value),
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const invoiceData = {...invoices, userId:user.id, status:true, total:totals};
        axiosClient.post("/Invoices", invoiceData)
          .then(() => {
            Swal.fire({
                title: "Thành công!",
                text: "Đặt hàng thành công",
                icon: "success",
                confirmButtonText: "OK",
            });
            handleClose();
          })
          .catch((error) => {
            Swal.fire({
                title: "Lỗi!",
                text: "Vui lòng nhập đầy đủ thông tin",
                icon: "error",
                confirmButtonText: "OK",
            });
          });
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
                                if (item.userId === user.id) {
                                    return (
                                        <tr>
                                            <td><img className='img-cart-item' src={`https://localhost:7258/images/product/${item.product.imageId}.jpg`} /></td>
                                            <td><p>{item.product.clothes.name}</p></td>
                                            <td><p>{item.product.price}</p></td>
                                            <td><p>{item.product.size.name}</p></td>
                                            <td><p>{item.product.color.name}</p></td>
                                            <td>
                                                <Button onClick={() => moveStock(item.id, item.quantity, item.productId)} variant='outline-none'><i class="fa-solid fa-minus"></i></Button>
                                                <input className='w-25' type='text' value={item.quantity} readOnly />
                                                <Button onClick={() => addStock(item.id, item.quantity, item.productId, item.product.stock)} variant='outline-none'><i class="fa-solid fa-plus"></i></Button>
                                            </td>
                                            <td><p>{item.product.price * item.quantity}</p></td>
                                            <td><Button variant='danger' onClick={() => handleDeleteConfirmation(item.id)}><i class="fa-solid fa-trash"></i></Button></td>
                                        </tr>
                                    )
                                }
                            })
                        }
                        <h1>Tổng tiền: {totals}</h1>
                    </tbody>
                    <Button variant="danger" onClick={handleShow} className='px-5'>
                        Đặt hàng
                    </Button>
                </Table>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Nhập thông tin hóa đơn</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Label>Ngày lập hóa đơn</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="date"
                                    name="invoiceDate"
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Label>Tổng tiền</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="total"
                                    value={totals}
                                    onChange={handleChange}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Label>Địa chỉ giao hàng</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="addressShip"
                                    placeholder='57 D5 xxxxxxxxx'
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Group className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    placeholder='0xxxxxxxxx'
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Control
                                type="hidden"
                                name="userId"
                                value={user.id}
                                onChange={handleChange}
                            />
                            <Form.Control
                                type="hidden"
                                name="status"
                                value={1}
                                onChange={handleChange}
                            />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button variant="success" onClick={handleSubmit}>
                            Thanh toán
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
}

export default Cart;
