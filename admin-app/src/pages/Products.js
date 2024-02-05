import React, { useEffect, useState } from 'react'
import axiosAdmin from '../Components/axiosAdmin';
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Products = () => {
  const [products, setProduct] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [clothes, setClothes] = useState([]);
  const [images, setImage] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null); // Thêm trạng thái để theo dõi id của item đang được sửa
  const [editingItem, setEditingItem] = useState({
    id: null,
    price: null,
    clothesId: null,
    sizeId: null,
    colorId: null,
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
  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setProduct(prev => ({ ...prev, [name]: value }));
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
    const productData = { ...products };
    setIsAddSuccess(false);
    setShowAdd(false);
    console.log(productData);
    axiosAdmin.post("/Products", productData)
      .then(() => {
        setIsAddSuccess(false);
        setShowAdd(false);
        setNotification('Thêm sản phẩm thành công');
      })
      .catch((error) => {
        setNotification('Lỗi khi thêm');
      });
  };
  const handleDelete = (productsId) => {
    axiosAdmin.delete(`/Products/${productsId}`)
      .then(() => {
        // Sau khi xóa thành công, cập nhật danh sách sản phẩm
        setProduct(prevProducts => prevProducts.filter(products => products.id !== productsId));
        handleClose();
      });
  };
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditingItem({
      id: item.id,
      price: item.price,
      clothesId: item.clothes.id,
      sizeId: item.size.id,
      colorId: item.color.id,
      imageId: item.imageId,
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
      .put(`/Products/${itemId}`, editingItem)
      .then(() => {

        setEditingItemId(null);
        setEditingItem({
          id: null,
          price: null,
          clothesId: null,
          sizeId: null,
          colorId: null,
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
      sizeId: null,
      colorId: null,
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
      .catch(error => {
        console.error("Error fetching sizes data:", error);
      });
    axiosAdmin.get("/Colors")
      .then(res => {
        setColor(res.data);
      })
      .catch(error => {
        console.error("Error fetching colors data:", error);
      });
    axiosAdmin.get("/Images")
      .then(res => {
        setImage(res.data);
      })
      .catch(error => {
        console.error("Error fetching images data:", error);
      });
    axiosAdmin.get("/Clothes")
      .then(res => {
        setClothes(res.data);
      })
      .catch(error => {
        console.error("Error fetching clothes data:", error);
      });
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
              <Form.Label>Clothes:</Form.Label>
              <Form.Control
                as="select"
                name="clothesId"
                onChange={handleChange}
              >
                <option>Chọn tên sản phẩm</option>
                {clothes.map(clothes => (
                  <option key={clothes.id} value={clothes.id}>
                    {clothes.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="text" name="price" onChange={handleChange} placeholder='Nhập giá tiền' required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sizes:</Form.Label>
              <Form.Control as="select" name="sizeId" onChange={handleChange}>
                <option>Chọn size sản phẩm</option>
                {size.map(size => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Images:</Form.Label>
              <Form.Control as="select" name="imageId" onChange={handleChange}>
                <option>Chọn hình sản phẩm</option>
                {images.map(images => (
                  <option key={images.id} value={images.id}>
                    {images.productId}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Colors:</Form.Label>
              <Form.Control
                as="select"
                name="colorId"
                onChange={handleChange}
              >
                <option>Chọn màu sản phẩm</option>
                {color.map(color => (
                  <option key={color.id} value={color.id}>
                    {color.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Stock:</Form.Label>
              <Form.Control type="number" name="stock" onChange={handleChange} placeholder='Nhập số lượng' min={1} required />
            </Form.Group>
            <Form.Check
              type="switch"
              name="status"
              label="Hoạt động"
              onClick={handleCheck}
            />
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
            <th>Name</th>
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
                    <select
                      aria-label="Name"
                      name="clothesId"
                      value={editingItem.clothesId}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, clothesId: e.target.value })
                      }
                    >
                      <option>Chọn loại sản phẩm</option>
                      {clothes.map((clothes) => (
                        <option key={clothes.id} value={clothes.id}>
                          {clothes.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.clothes.name
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
                    <select
                      aria-label="Size"
                      name="sizeId"
                      value={editingItem.sizeId}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, sizeId: e.target.value })
                      }
                    >
                      <option>Chọn size sản phẩm</option>
                      {size.map((size) => (
                        <option key={size.id} value={size.id}>
                          {size.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.size.name
                  )}
                  </td>
                  <td>{isEditing && editingItemId === item.id ? (
                    <select
                      aria-label="Color"
                      name="colorId"
                      value={editingItem.colorId}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, colorId: e.target.value })
                      }
                    >
                      <option>Chọn màu sản phẩm</option>
                      {color.map((color) => (
                        <option key={color.id} value={color.id}>
                          {color.name}
                        </option>
                      ))}
                    </select>
                  ) : (
                    item.color.name
                  )}</td>
                  <td>
                    {isEditing && editingItemId === item.id ? (
                      <input
                        type="text"
                        value={editingItem.imageId}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, imageId: e.target.value })
                        }
                        readOnly
                      />
                    ) : (
                      <img src={`https://localhost:7258/images/product/${item.imageId}.jpg`} alt='no_image' className='card-img-top' />
                    )}
                  </td>
                  <td>{isEditing && editingItemId === item.id ? (
                    <input
                      value={editingItem.stock}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, stock: e.target.value })
                      }
                      min={0}
                    />
                  ) : (
                    item.stock
                  )}</td>
                  <td>
                    {isEditing && editingItemId === item.id ? (
                      <input
                        type="checkbox"
                        checked={editingItem.status}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, status: e.target.checked })
                        }
                      />
                    ) : (
                      item.status ? "Hoạt động" : "Không hoạt động"
                    )}</td>
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