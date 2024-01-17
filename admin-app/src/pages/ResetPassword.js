import React from 'react'
import CustomerInput from '../Components/CustomerInput';

const ResetPassword = () => {
  return (
    <div className="py-5" style={{ "background": "#ffd333", minHeight: "100vh" }}>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center">Reset Password</h3>
        <p className="text-center">Please Enter your new password.</p>
        <form action="">
          <CustomerInput type="password" label="New Password" id="pass" />
          <CustomerInput type="password" label="Confirm Password" id="confirmpass" />
          <button className="border-0 px-3 py-2 text-white fw-bold w-100" style={{ background: "#ffd333" }} type="submit">Send Link</button>
        </form>
      </div>
    </div>
  )
}

export default ResetPassword;
