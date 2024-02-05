import { useState } from 'react';
import axiosAdmin from '../Components/axiosAdmin';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useUser } from '../Components/UserContext';
import Swal from 'sweetalert2';

const Login = () => {
  const [login, setLogin] = useState({
    Username: '',
    Password: '',
  });
  const navigate = useNavigate();
  const { updateUser } = useUser();
  function getFullName(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.fullname;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const userData = {...login};
    console.log({...login});
    axiosAdmin.post("/Users/login", userData)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.token);
        const fullName = getFullName(response.data.token);
        localStorage.setItem('fullname', fullName);
        updateUser({ fullname: fullName, token: response.data.token });
        Swal.fire({
          title: "Thành công!",
          text: "Đăng nhập thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate('/admin');
      })
      .catch((error) => {
        Swal.fire({
          title: "Thất bại!",
          text: "Đăng nhập thất bại",
          icon: "error",
          confirmButtonText: "OK",
        });
        if (error.response) {
          console.log('Server trả về lỗi:', error.response.data);
        }
        console.log(JSON.stringify(userData));
      });
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Nếu là select, giữ giá trị của productTypeId
    const newValue = type === 'select-one' ? e.target.selectedOptions[0].value : (type === 'checkbox' ? checked : value);

    setLogin(prevProductType => ({
      ...prevProductType,
      [name]: newValue
    }));
  };
  return (
    <div className="py-5" style={{ "background": "#ffd333",minHeight:"100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form>
          <input type="text" className='form-control' label="Username" name='Username' onChange={handleChange}/>
          <input type="password" className='form-control' label="Password" name='Password' onChange={handleChange}/>
        </form>
        <button className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5" style={{background: "#ffd333"}} onClick={handleSubmit}>Login</button>
      </div>
    </div>
  )
}

export default Login;
