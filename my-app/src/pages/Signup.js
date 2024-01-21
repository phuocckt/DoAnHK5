import { Link } from 'react-router-dom';
import './css/LoginSignup.css'

function Signup() {
  return (
    <>
        <div className='signup'>
          <div className='signup-container'>
            <h1>Sign up</h1>
            <form>
                <input type='text' placeholder='Your name'/>
                <input type='email' placeholder='Email address'/>
                <input type='password' placeholder='Enter the Password'/>
                <input type='password' placeholder='Confirm the Password'/>
            </form>
            <button>Sign up</button>
            <p>Already have an account ? <Link to='/login' className='text-danger'>Login here</Link></p>
          </div>   
        </div>
    </>
  );
}

export default Signup;
