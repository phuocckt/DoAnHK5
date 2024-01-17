import React, { useEffect, useState } from 'react'
import axiosAdmin from '../Components/axiosAdmin';
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const AddClothes = () => {
    const [clothes, setClothes] = useState([]);
    const [productTypes, setProductTypes] = useState([]);
    const [showAdd, setShowAdd] = useState(false);
    const [isAddSuccess, setIsAddSuccess] = useState(false);
    const [notification, setNotification] = useState(null);
    const [editingItemId, setEditingItemId] = useState(null); // Thêm trạng thái để theo dõi id của item đang được sửa
    const [editingItem, setEditingItem] = useState({
        id: null,
        sku: generateRandomSKU(),
        name: "",
        description: "",
        productTypeId: null,
    });
    const [isEditing, setIsEditing] = useState(false);
    //const [selectedProductType, setSelectedProductType] = useState('');
    const [sku, setSku] = useState(generateRandomSKU());


    const handleShowAdd = () => {
        setShowAdd(true);
        setIsAddSuccess(true);
    }
    const handleClose = () => { setShowAdd(false); }
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        const newValue =
            type === 'select-one'
                ? e.target.selectedOptions[0].value
                : type === 'checkbox'
                    ? checked
                    : value;

        setClothes(prevClothes => ({
            ...prevClothes,
            [name]: newValue
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const clothesData = { ...clothes, sku: sku };
        setIsAddSuccess(false);
        setShowAdd(false);
        console.log({ ...clothesData });
        axiosAdmin.post("/Clothes", clothesData)
            .then(() => {

                setIsAddSuccess(false);
                setShowAdd(false);
                setNotification('Thêm sản phẩm thành công');
                setSku(generateRandomSKU()); // Cập nhật SKU khi thêm sản phẩm thành công
            })
            .catch((error) => {
                setNotification('Tên sản phẩm trùng nhau');
            });
    };
    const handleDelete = (clothesId) => {
        axiosAdmin.delete(`/Clothes/${clothesId}`)
            .then(() => {
                // Sau khi xóa thành công, cập nhật danh sách sản phẩm
                setClothes(prevClothes => prevClothes.filter(clothes => clothes.id !== clothesId));
                handleClose();
            });
    };
    const handleEdit = (item) => {
        setEditingItemId(item.id);
        setEditingItem({
            id: item.id,
            sku: item.sku,
            name: item.name,
            description: item.description,
            productTypeId: item.productType.id,
        });
        setIsEditing(true);
    };


    const handleSaveEdit = (itemId) => {
        // Gọi API hoặc xử lý cập nhật dữ liệu tại đây

        // Gọi API hoặc xử lý cập nhật dữ liệu tại đây
        axiosAdmin
            .put(`/Clothes/${itemId}`, editingItem)
            .then(() => {

                setEditingItemId(null);
                setEditingItem({
                    id: null,
                    sku: "",
                    name: "",
                    description: "",
                    productTypeId: null,
                });
                setNotification('Cập nhật loại sản phẩm thành công');
            })
            .catch((error) => {
                setNotification('Lỗi giá trị khi sửa');
            });
    };

    const handleCancelEdit = (itemId) => {
        setEditingItemId(null);
        setEditingItem({
            id: null,
            sku: "",
            name: "",
            description: "",
            productTypeId: null,
        });
    };

    const handleDeleteConfirmation = (productTypeId) => {
        const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (shouldDelete) {
            handleDelete(productTypeId);
            setNotification('Xóa thành công');
        }
    };

    const closeNotification = () => {
        setNotification(null);
    };

    function generateRandomSKU() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const length = 12;
        let sku = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            sku += characters[randomIndex];
        }
        return sku;
    }

    useEffect(() => {
        axiosAdmin.get("/Clothes")
            .then(res => {
                console.log(res.data);
                setClothes(res.data)
                if (notification) {
                    // Đặt hàm closeNotification để chạy sau 3 giây
                    const timeoutId = setTimeout(closeNotification, 3000);

                    // Clear timeout khi component unmount hoặc khi notification thay đổi
                    return () => clearTimeout(timeoutId);
                }
            });
        axiosAdmin.get("/ProductTypes")
            .then(res => setProductTypes(res.data));
    }, [notification]);
    return (
        <div>
            <h3>Clothes</h3>
            {!isAddSuccess && (
                <Button variant='success' onClick={handleShowAdd}>
                    <FontAwesomeIcon icon={faPlus} /> Thêm
                </Button>
            )}
            {showAdd && (
                <Form className="row" onSubmit={handleSubmit}>
                    <div className='col-md-6'>
                        <Form.Group className="mb-3">
                            <Form.Label>SKU:</Form.Label>
                            <Form.Control type="text" name="sku" value={sku} onChange={handleChange} readOnly />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Name:</Form.Label>
                            <Form.Control type="text" name="name" onChange={handleChange} placeholder='Nhập tên sản phẩm' required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control as="textarea" name="description" onChange={handleChange} placeholder='Mô tả' required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Product Type:</Form.Label><br />
                            <Form.Select
                                aria-label="Product Type"
                                name="productTypeId"
                                value={clothes.productTypeId} // Sử dụng trực tiếp giá trị của productTypeId
                                onChange={handleChange} // Sử dụng hàm handleChange để xử lý sự kiện
                            >
                                <option>Chọn loại sản phẩm</option>
                                {productTypes.map(item => (
                                    <option key={item.id}handleChange>
                                        {item.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Button type="submit" variant='success'>
                            <FontAwesomeIcon icon={faPlus} /> Thêm
                        </Button>
                    </div>
                </Form>
            )}
            <Table>
                <thead className="table-dark">
                    <tr>
                        <th>STT</th>
                        <th>SKU</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Product Type</th>
                        <th>Function</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        Array.isArray(clothes) && (
                            clothes.map((item, index) => (
                                <tr key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{isEditing && editingItemId === item.id ? (
                                        <input
                                            type="text"
                                            value={editingItem.sku}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, sku: e.target.value })
                                            }
                                            readOnly
                                        />
                                    ) : (
                                        item.sku
                                    )}
                                    </td>
                                    <td>{isEditing && editingItemId === item.id ? (
                                        <input
                                            type="text"
                                            value={editingItem.name}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, name: e.target.value })
                                            }
                                        />
                                    ) : (
                                        item.name
                                    )}
                                    </td>
                                    <td>{isEditing && editingItemId === item.id ? (
                                        <textarea
                                            value={editingItem.description}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, description: e.target.value })
                                            }
                                        />
                                    ) : (
                                        item.description
                                    )}
                                    </td>
                                    <td>{isEditing && editingItemId === item.id ? (
                                        <select
                                            aria-label="Product Type"
                                            name="productTypeId"
                                            value={editingItem.productTypeId}
                                            onChange={(e) =>
                                                setEditingItem({ ...editingItem, productTypeId: e.target.value })
                                            }
                                        >
                                            <option>Chọn loại sản phẩm</option>
                                            {productTypes.map((productType) => (
                                                <option key={productType.id} value={productType.id}>
                                                    {productType.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        item.productType.name
                                    )}
                                    </td>
                                    <td>
                                        {editingItemId === item.id ? (
                                            <React.Fragment>
                                                <Button
                                                    variant='success'
                                                    onClick={() => handleSaveEdit(item.id)}
                                                >
                                                    <FontAwesomeIcon icon={faCheck} /> Lưu
                                                </Button>
                                                <Button
                                                    variant='danger'
                                                    onClick={() => handleCancelEdit(item.id)}
                                                >
                                                    <FontAwesomeIcon icon={faClose} />Hủy
                                                </Button>
                                            </React.Fragment>
                                        ) : (
                                            <Button
                                                variant='warning'
                                                onClick={() => handleEdit(item)}
                                            >
                                                <FontAwesomeIcon icon={faPen} /> Sửa
                                            </Button>
                                        )}
                                        <Button
                                            variant='danger'
                                            onClick={() => handleDeleteConfirmation(item.id)}
                                        >
                                            <FontAwesomeIcon icon={faTrash} /> Xóa
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )
                    }
                </tbody>
            </Table>
            {notification && (
                <div className="notification">
                    {notification}
                </div>
            )}
        </div>
    )
}

export default AddClothes;
