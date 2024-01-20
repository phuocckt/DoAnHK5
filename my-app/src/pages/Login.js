import { Link } from 'react-router-dom';
import './css/LoginSignup.css'

function Login() {
  return (
    <>
        <div className='login'>
          <div className='login-container'>
            <h1>Login</h1>
            <form>
                <input type='text' placeholder='Your name'/>
                <input type='password' placeholder='Password'/>
            </form>
            <button>Login</button>
            <a className='text-dark' href=''>Forgot the password !</a>
            <p>Don't have an account ? <Link to='/signup' className='text-danger'>Signup here</Link></p>
          </div>   
        </div>
    </>
  );
}

export default Login;
