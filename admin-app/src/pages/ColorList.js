import React, { useEffect, useState } from 'react'
import axiosAdmin from '../Components/axiosAdmin';
import { Button, Form, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faClose, faPen, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ColorList = () => {
  const [colors, setColor] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [isAddSuccess, setIsAddSuccess] = useState(false);
  const [notification, setNotification] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null); // Thêm trạng thái để theo dõi id của item đang được sửa
  const [editingItem, setEditingItem] = useState({
    id: null,
    name: "",
    status: false,
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
    setColor(prev => ({ ...prev, [name]: value }));
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Nếu là select, giữ giá trị của productTypeId
    const newValue = type === 'select-one' ? e.target.selectedOptions[0].value : (type === 'checkbox' ? checked : value);

    setColor(prevProductType => ({
      ...prevProductType,
      [name]: newValue
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const colorData = {...colors};
    setIsAddSuccess(false);
    setShowAdd(false);
    axiosAdmin.post("/Colors", colorData)
      .then(() => {

        setIsAddSuccess(false);
        setShowAdd(false);
        setNotification('Thêm màu thành công');
      })
      .catch((error) => {
        setNotification('Tên màu trùng nhau');
      });
  };
  const handleDelete = (colorId) => {
    axiosAdmin.delete(`/Colors/${colorId}`)
      .then(() => {
        // Sau khi xóa thành công, cập nhật danh sách sản phẩm
        setColor(prevColor => prevColor.filter(sizes => sizes.id !== colorId));
        handleClose();
      });
  };
  const handleEdit = (item) => {
    setEditingItemId(item.id);
    setEditingItem({
      id: item.id,
      name: item.name,
      status: item.status,
    });
    setIsEditing(true);
  };


  const handleSaveEdit = (itemId) => {
    // Gọi API hoặc xử lý cập nhật dữ liệu tại đây
    axiosAdmin
      .put(`/Colors/${itemId}`, editingItem)
      .then(() => {

        setEditingItemId(null);
        setEditingItem({
          id: null,
          name: "",
          status: false,
        });
        setNotification('Cập nhật màu thành công');
      })
      .catch((error) => {
        setNotification('Lỗi giá trị khi sửa');
      });
  };

  const handleCancelEdit = (itemId) => {
    setEditingItemId(null);
    setEditingItem({
      id: null,
      name: "",
      status: false,
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
  useEffect(() => {
    axiosAdmin.get("/Colors")
      .then(res => {
        setColor(res.data)
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
      <h3>Colors</h3>
      {!isAddSuccess && (
        <Button variant='success' onClick={handleShowAdd}>
          <FontAwesomeIcon icon={faPlus} /> Thêm
        </Button>
      )}
      {showAdd && (
        <Form className="col-md-3" onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" onChange={handleChange} placeholder='Nhập tên màu' required />
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
        </Form>
      )}

      <Table>
        <thead className="table-dark">
          <tr>
            <th>STT</th>
            <th>Name</th>
            <th>Status</th>
            <th>Function</th>
          </tr>
        </thead>
        <tbody>
          {
            Array.isArray(colors) && (
              colors.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
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

export default ColorList;
