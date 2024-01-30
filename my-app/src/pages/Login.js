import { Link, useNavigate } from 'react-router-dom';
import './css/LoginSignup.css'
import { useState } from 'react';
import axiosClient from '../api/axiosClient';

function Login() {
  const [login, setLogin] = useState({
    Username: '',
    Password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const userData = {...login};
    console.log({...login});
    axiosClient.post("/Users/login", userData)
      .then((response) => {
        localStorage.setItem('accessToken', response.data.token);
        navigate('/');
        console.log('đăng nhập thành công');
      })
      .catch((error) => {
        console.log('đăng nhập thất bại',error);
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
