import React, { useEffect, useState } from 'react'
import axiosAdmin from '../Components/axiosAdmin';
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
  const [products, setProduct] = useState([]);
  const [sizes, setSize] = useState([]);
  const [colors, setColor] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null); // Thêm trạng thái để theo dõi id của item đang được sửa
  const [editingItem, setEditingItem] = useState({
    id: null,
    price: null,
    clothesId: null,
    sizeId: [],
    colorId: [],
    imageId: null,
    stock: null,
    rateId: null,
    status: false
  });
  const [isEditing, setIsEditing] = useState(false);
  //const [selectedProductType, setSelectedProductType] = useState('');


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

    setProduct(prevClothes => ({
      ...prevClothes,
      [name]: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productsData = { ...products };
    setIsAddSuccess(false);
    setShowAdd(false);
    console.log({ ...productsData });
    axiosAdmin.post("/Products", productsData)
      .then(() => {

        setIsAddSuccess(false);
        setShowAdd(false);
        setNotification('Thêm sản phẩm thành công');
      })
      .catch((error) => {
        setNotification('Lỗi khi thêm');
      });
  };
  const handleDelete = (prouctsId) => {
    axiosAdmin.delete(`/Proucts/${prouctsId}`)
      .then(() => {
        // Sau khi xóa thành công, cập nhật danh sách sản phẩm
        setProduct(prevProducts => prevProducts.filter(products => products.id !== prouctsId));
        handleClose();
      });
  };
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditingItem({
      id: item.id,
      price: item.price,
      clothesId: item.clothes.id,
      sizeId: item.sizeId,
      colorId: item.colorId,
      imageId: item.image.productId,
      stock: item.stock,
      rateId: item.rateId,
      status: item.status
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
          price: null,
          clothesId: null,
          sizeId: [],
          colorId: [],
          imageId: null,
          stock: null,
          rateId: null,
          status: false
        });
        setNotification('Cập nhật sản phẩm thành công');
      })
      .catch((error) => {
        setNotification('Lỗi giá trị khi sửa');
      });
  };

  const handleCancelEdit = (itemId) => {
    setEditingItemId(null);
    setEditingItem({
      id: null,
      price: null,
      clothesId: null,
      sizeId: [],
      colorId: [],
      imageId: null,
      stock: null,
      rateId: null,
      status: false
    });
  };

  const handleDeleteConfirmation = (productId) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (shouldDelete) {
      handleDelete(productId);
      setNotification('Xóa thành công');
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };


  useEffect(() => {
    axiosAdmin.get("/Products")
      .then(res => {
        console.log(res.data);
        setProduct(res.data)
        if (notification) {
          // Đặt hàm closeNotification để chạy sau 3 giây
          const timeoutId = setTimeout(closeNotification, 3000);

          // Clear timeout khi component unmount hoặc khi notification thay đổi
          return () => clearTimeout(timeoutId);
        }
      });
    axiosAdmin.get("/Sizes")
      .then(res => {
        setSize(res.data);
      })
      axiosAdmin.get("/Colors")
      .then(res => {
        setColor(res.data);
      })
  }, [notification]);
  return (
    <div>
      <h3>Products</h3>
      {!isAddSuccess && (
        <Button variant='success' onClick={handleShowAdd}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </Button>
      )}
      {showAdd && (
        <Form className="row" onSubmit={handleSubmit}>
          <div className='col-md-6'>
            <Form.Group className="mb-3">
              <Form.Label>ClothesId:</Form.Label>
              <Form.Control type="number" name="clothesId" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="text" name="price" onChange={handleChange} placeholder='Nhập giá tiền' required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sizes:</Form.Label>
              <Form.Select
                aria-label="Size"
                name="sizeId"
                value={products.sizeId}
                onChange={handleChange}
              >
                <option>Chọn size</option>
                {sizes.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Colors:</Form.Label>
              <Form.Select
                aria-label="Color"
                name="colorId"
                value={products.colorId}
                onChange={handleChange}
              >
                <option>Chọn màu</option>
                {colors.map(item => (
                  <option key={item.id} value={item.id}>
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
            <th>ClothesId</th>
            <th>Price</th>
            <th>Sizes</th>
            <th>Colors</th>
            <th>Images</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(products) && (
              products.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{isEditing && editingItemId === item.id ? (
                    <input
                      type="text"
                      value={editingItem.clothesId}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, clothesId: e.target.value })
                      }
                      readOnly
                    />
                  ) : (
                    item.clothesId
                  )}
                  </td>
                  <td>{isEditing && editingItemId === item.id ? (
                    <input
                      type="number"
                      value={editingItem.price}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, price: e.target.value })
                      }
                    />
                  ) : (
                    item.price
                  )}
                  </td>
                  <td>{isEditing && editingItemId === item.id ? (
                    <textarea
                      value={editingItem.sizeId}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, sizeId: e.target.value })
                      }
                    />
                  ) : (
                    item.sizeId
                  )}
                  </td>
                  <td></td>
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

export default Products;