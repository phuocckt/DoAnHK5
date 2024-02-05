import React, { useEffect, useState } from 'react'
import axiosAdmin from '../Components/axiosAdmin';
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const Image = () => {
  const [images, setImages] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null); // Thêm trạng thái để theo dõi id của item đang được sửa
  const [editingItem, setEditingItem] = useState({
    id: null,
    status: false,
    productId: null,
    nameFile: null
  });
  const [isEditing, setIsEditing] = useState(false);


  const handleShowAdd = () => {
    setShowAdd(true);
    setIsAddSuccess(true);
  }
  const handleClose = () => { setShowAdd(false); }
  const handleCheck = (e) => {
    let name = e.target.name;
    let value = e.target.checked;
    setImages(prev => ({ ...prev, [name]: value }));
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Nếu là select, giữ giá trị của productTypeId
    const newValue = type === 'select-one' ? e.target.selectedOptions[0].value : (type === 'checkbox' ? checked : value);

    setImages(prevProductType => ({
      ...prevProductType,
      [name]: newValue
    }));
  };
  const handleFileChange = (event) => {
    setImages({
      ...images,
      imageFile: event.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //const fileName = images.name.replace(/^.*[\\\/]/, '');
    setIsAddSuccess(false);
    setShowAdd(false);
    const formData = new FormData();
      formData.append('status', images.status);
      formData.append('productId', images.productId);
      formData.append('nameFile', images.imageFile);
      console.log(...formData);
    axiosAdmin.post("/Images", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      })
      .then(() => {

        setIsAddSuccess(false);
        setShowAdd(false);
        setNotification('Thêm ảnh thành công');
      })
  };
  const handleDelete = (imageId) => {
    axiosAdmin.delete(`/Images/${imageId}`)
      .then(() => {
        // Sau khi xóa thành công, cập nhật danh sách ảnh
        setImages(prevImage => prevImage.filter(images => images.id !== imageId));
        setNotification('Xóa thành công');
        handleClose();
      });
  };
  
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditingItem({
      id: item.id,
      name: item.name,
      status: item.status,
      productId: item.productId !== null ? item.productId : 0,
    });
    setIsEditing(true);
  };
  

  const handleSaveEdit = (itemId) => {
    // Gọi API hoặc xử lý cập nhật dữ liệu tại đây
    axiosAdmin.put(`/Images/${itemId}`, editingItem)
      .then(() => {

        setEditingItemId(null);
        setEditingItem({
          id: null,
          status: false,
          productId:null
        });
        setNotification('Cập nhật ảnh thành công');
      })
      .catch((error) => {
        setNotification('Tên ảnh trùng nhau');
      });
  };

  const handleCancelEdit = (itemId) => {
    setEditingItemId(null);
    setEditingItem({
      id: null,
      nameFile:null,
      status: false,
      productId:null
    });
  };

  const handleDeleteConfirmation = (imageId) => {
    const shouldDelete = window.confirm("Bạn có chắc chắn muốn xóa không?");
    if (shouldDelete) {
      handleDelete(imageId);
    }
  };

  const closeNotification = () => {
    setNotification(null);
  };
  useEffect(() => {
    axiosAdmin.get("/Images")
      .then(res => {
        setImages(res.data)
        if (notification) {
          // Đặt hàm closeNotification để chạy sau 3 giây
          const timeoutId = setTimeout(closeNotification, 3000);

          // Clear timeout khi component unmount hoặc khi notification thay đổi
          return () => clearTimeout(timeoutId);
        }
      });
  }, [notification]);
  return (
    <div>
      <h3>Images</h3>
      {!isAddSuccess && (
        <Button variant='success' onClick={handleShowAdd}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </Button>
      )}
      {showAdd && (
        <Form className="col-md-3" onSubmit={handleSubmit} data>
          <Form.Group className="mb-3">
            <Form.Label>Name File:</Form.Label>
            <Form.Control type="file" name="nameFile" onChange={handleFileChange} required />
          </Form.Group>
          <Form.Check
            type="switch"
            name="status"
            label="Hoạt động"
            onClick={handleCheck}
          />
          <Form.Group className="mb-3">
            <Form.Label>ProductId:</Form.Label>
            <Form.Control type="number" name="productId" value={images.productId || ''} onChange={handleChange} placeholder='Chọn mã sản phẩm' min={1}/>
          </Form.Group>
          <Button type="submit" variant='success'>
            <FontAwesomeIcon icon={faPlus} /> Thêm
          </Button>
        </Form>
      )}

      <Table>
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Image</th>
            <th>Status</th>
            <th>ProductId</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(images) && (
              images.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>
                    {isEditing && editingItemId === item.id ? (
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, name: e.target.value })
                        }
                        readOnly
                      />
                    ) : (
                      <img src={`https://localhost:7258/images/product/${item.name}`} alt='no_image' className='card-img-top'/>
                    )}
                  </td>
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
                    )}
                    </td>
                    <td>
                    {isEditing && editingItemId === item.id ? (
                      <input
                        type="number"
                        value={editingItem.productId}
                        onChange={(e) => setEditingItem({ ...editingItem, productId: e.target.value })}
                      />
                    ) : (
                      item.productId
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

export default Image;
