import { Link, useNavigate } from 'react-router-dom';
import './css/LoginSignup.css'
import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import Swal from 'sweetalert2';
import { useUser } from '../components/UserContext';
import { jwtDecode } from 'jwt-decode';

function Login() {
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
  function getId(token) {
    const decodedToken = jwtDecode(token);
    return decodedToken.id;
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const userData = {...login};
    console.log({...login});
    axiosClient.post("/Users/login", userData)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.token);
        const fullName = getFullName(response.data.token);
        const id = getId(response.data.token);
        localStorage.setItem('fullname', fullName);
        localStorage.setItem('id', id);
        updateUser({id: id, fullname: fullName, token: response.data.token });
        Swal.fire({
          title: "Thành công!",
          text: "Đăng nhập thành công",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate('/');
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
    <>
        <div className='login'>
          <div className='login-container'>
            <h1>Login</h1>
            <form>
                <input type='text' name='Username' onChange={handleChange} placeholder='Your name' required/>
                <input type='password' name='Password' onChange={handleChange} placeholder='Password' required/>
            </form>
            <button onClick={handleSubmit}>Login</button>
            <a className='text-dark' href=''>Forgot the password !</a>
            <p>Don't have an account ? <Link to='/signup' className='text-danger'>Signup here</Link></p>
          </div>   
        </div>
    </>
  );
}

export default Login;
