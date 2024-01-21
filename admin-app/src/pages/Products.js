import React, { useEffect, useState } from 'react'
import axiosAdmin from '../Components/axiosAdmin';
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const Products = () => {
  const [products, setProduct] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [images, setImage] = useState([]);
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
  const [newVariant, setNewVariant] = useState({
    sizeId: [],
    colorId: [],
    imageId: [],
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
    setNewVariant(prevVariant => ({
      ...prevVariant,
      [name]: Array.isArray(prevVariant[name]) ? [...prevVariant[name], newValue] : [newValue],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const variantData = { ...newVariant };
    setIsAddSuccess(false);
    setShowAdd(false);
    console.log({ ...variantData });
    axiosAdmin.post("/Products", variantData)
      .then(() => {

        setIsAddSuccess(false);
        setShowAdd(false);
        setNotification('Thêm sản phẩm thành công');
        setProduct(prevVariants => [...prevVariants, variantData]);
        setNewVariant({
          sizeId: null,
          colorId: null,
          imageId: null,
        });
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
        console.error("Error fetching colors data:", error);
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
              <Form.Label>ClothesId:</Form.Label>
              <Form.Control type="number" name="clothesId" onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price:</Form.Label>
              <Form.Control type="text" name="price" onChange={handleChange} placeholder='Nhập giá tiền' required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sizes:</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="sizeId"
                onChange={handleChange}
                value={newVariant.sizeId || []}
              >
                {size.map(size => (
                  <option key={size.id} value={size.id}>
                    {size.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Images:</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="imageId"
                onChange={handleChange}
                value={newVariant.imageId || []}
              >
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
                multiple
                name="colorId"
                onChange={handleChange}
                value={newVariant.colorId || []}
              >
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