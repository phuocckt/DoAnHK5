import { Link } from 'react-router-dom';
import './css/LoginSignup.css'
import axiosClient from '../api/axiosClient';
import { useState } from 'react';

function Signup() {
  const [register, setRegister] = useState([]);

  const handleSubmit = (e)=>{
    e.preventDefault();
    const userData = {...register};
    console.log({...register});
    axiosClient.post("/Users/register", userData)
      .then(() => {
        console.log('thành công');
      })
      .catch((error) => {
        console.log('thất bại');
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
                <input type='text' placeholder='Your name' name='username' onChange={handleChange}/>
                <input type='email' placeholder='Email address' name='email' onChange={handleChange}/>
                <input type='password' placeholder='Enter the Password' name='password' onChange={handleChange}/>
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
