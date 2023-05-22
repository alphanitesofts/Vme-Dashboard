import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import Baseurl from '../Sourcefiles/url';

toast.configure()
const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [roleID, setRoleID] = useState()
  const [fieldStatus, setFieldStatus] = useState(false)

  // const signUp = () => {

  //   setFieldStatus(true)
  //   if (!name && !email && !password && !confirmPassword && !phone && !roleID) {
  //     toast.info("Fields are empty")
  //   }
  //   else {
  //     if (name == "") {
  //       toast.warning("Please Enter your Name")
  //     }
  //     if (email == "") {
  //       toast.warning("Please Enter your Email")
  //     }
  //     if (phone <= 10) {
  //       toast.warning("Please Enter your Phone Number")
  //     }
  //     if (password !== confirmPassword) {
  //       toast.info("Password does no match")
  //     }
  //     if (password <= 6) {
  //       toast.info("Password minimum length is 6")
  //     }
  //   }
  //   if (name && email && password && confirmPassword &&
  //     phone && roleID && password == confirmPassword
  //     && password > 6) {
  //     const signUpObj = {
  //       username: name,
  //       email: email,
  //       password: password,
  //       password_confirmation: confirmPassword,
  //       phone: phone,
  //       role_id: roleID
  //     }
  //     axios.post(`${Baseurl}register`, signUpObj)
  //       .then((res) => {
  //         console.log(res)
  //         alert("YES")
  //         toast.info("Successfully Added Member")
  //         setInterval(() => {
  //           window.location.reload(true)
  //         }, 2000)

  //       })
  //       .catch((error) => {
  //         console.log(error)
  //         alert("!YES")
  //       })
  //   }
  // }

  const checkRegister = () => {
    setFieldStatus(true)
    var formdata = new FormData();
    formdata.append("username", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("password_confirmation", confirmPassword);
    formdata.append("phone", phone);
    formdata.append("role_id", roleID);

    axios.post(`${Baseurl}register`, formdata)
      .then((res) => {
        setFieldStatus(false)
        toast.info('Registered')
        setInterval(() => {
          window.location.reload(true)
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
        toast.warning('Error while submitting details')
      })

  }

  return (
    <div className='hold-transition register-page'>
      <div className="register-box">
        <div className="register-logo">
          <a><b>Digi</b>CARD</a>
        </div>
        <div className="card">
          <div className="card-body register-card-body">
            <p className="login-box-msg">Register a new membership</p>
            <div >

              <div className="form-control formStyle d-flex" style={{ borderColor: name === "" && fieldStatus === true ? "red" : '#ced4da', marginTop: "20px" }}>
                <input type="text" className=' placeHolderStyle' placeholder="Username" onChange={(e) => setName(e.target.value)} />
                <span className="fas fa-user" />
              </div>
              <p>{name === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

              <div className="mt-3 form-control formStyle d-flex" style={{ borderColor: email === "" && fieldStatus === true ? "red" : '#ced4da' }} >
                <input type="email" className="placeHolderStyle " placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                <span className="fas fa-envelope" />
              </div>
              <p>{email === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

              <div className="form-control formStyle d-flex" style={{ borderColor: password === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="password" className="placeHolderStyle" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <span className="fas fa-lock" />
              </div>
              <p>{password === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

              <div className="form-control formStyle d-flex" style={{ borderColor: confirmPassword === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="password" className="placeHolderStyle" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                <span className="fas fa-lock" />
              </div>
              <p>{confirmPassword === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

              <div className="form-control formStyle d-flex" style={{ borderColor: phone === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                <input type="number" className="placeHolderStyle" placeholder="Phone Number" onChange={(e) => setPhone(e.target.value)} />
                <span className="fa-solid fa-phone" />
              </div>
              <p>{phone === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

              <div className='input-group mb-3'>
                <select class="form-select textColor" style={{ color: "black" }} onChange={(e) => setRoleID(e.target.value)} aria-label="Default select example">
                  <option value="3">Admin</option>
                  <option value="2">Employee</option>
                </select>
                <div className="input-group-append">
                  <div className="input-group-text">
                    <span className="fa-solid fa-key" />
                  </div>
                </div>
              </div>

              <div className="row mt-1">
                <div className="col-8">
                  <div className="icheck-primary">
                    &nbsp;<input type="checkbox" id="agreeTerms" name="terms" defaultValue="agree" />
                    &nbsp;<label htmlFor="agreeTerms">
                      I agree to the <a href="#">terms</a>
                    </label>
                  </div>
                </div>
                {/* /.col */}
                <div className="col-4">
                  <button className='btn btn-secondary btn-block' onClick={checkRegister}>Register</button>
                </div>
                {/* /.col */}
              </div>
            </div>
            <Link to="/" className="mt-2 btn btn-block btn-primary text-center">I already have a membership</Link>
          </div>
        </div>
      </div>

    </div >

  )
}
export default Register