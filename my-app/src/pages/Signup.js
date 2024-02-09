import { Link, useNavigate } from 'react-router-dom';
import './css/LoginSignup.css'
import axiosClient from '../api/axiosClient';
import { useState } from 'react';

function Signup() {
  const [register, setRegister] = useState({
    Username: '',
    Password: '',
    Email: '',
    Repassword:''
  });
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const userData = {...register};
    console.log({...register});
    axiosClient.post("/Users/register", userData)
      .then(() => {
        navigate('/login');
        console.log('thành công');
      })
      .catch((error) => {
        console.log('thất bại',error);
        if (error.response) {
          console.log('Server trả về lỗi:', error.response.data);
        }
      });
  }
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Nếu là select, giữ giá trị của productTypeId
    const newValue = type === 'select-one' ? e.target.selectedOptions[0].value : (type === 'checkbox' ? checked : value);

    setRegister(prevProductType => ({
      ...prevProductType,
      [name]: newValue
    }));
  };

  return (
    <>
        <div className='signup'>
          <div className='signup-container'>
            <h1>Sign up</h1>
            <form>
                <input type='text' placeholder='Your name' name='Username' onChange={handleChange} required/>
                <input type='text' placeholder='Full name' name='FullName' onChange={handleChange} required/>
                <input type='email' placeholder='Email address' name='Email' onChange={handleChange} required/>
                <input type='password' placeholder='Enter the Password' name='Password' onChange={handleChange} required/>
                <input type='password' placeholder='Enter the Repassword' name='Repassword' onChange={handleChange} required/>

                {/* <input type='password' placeholder='Confirm the Password'/> */}
            </form>
            <button onClick={handleSubmit}>Sign up</button>
            <p>Already have an account ? <Link to='/login' className='text-danger'>Login here</Link></p>
          </div>   
        </div>
    </>
  );
}

export default Signup;
