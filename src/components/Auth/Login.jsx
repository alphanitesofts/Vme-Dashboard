import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { AsyncStorage } from 'AsyncStorage';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios'
import Baseurl from '../Sourcefiles/url';

toast.configure()
const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [fieldStatus, setFieldStatus] = useState(false)

    const submitData = () => {

        setFieldStatus(true)
        if (!email || !password) {
            toast.warning("Please fill all fields")
        }
        else if (!email && password) {
            toast.warning("Please Enter your Email")
        }
        else if (email && !password) {
            toast.warning("Please Enter your Password")
        }
        else {

            const userObj = {
                email: email,
                password: password
            }

            axios.post(`${Baseurl}login`, userObj)
                .then((res) => {
                    AsyncStorage.setItem('logIN', JSON.stringify(true));
                    AsyncStorage.setItem('email', JSON.stringify(email));
                    AsyncStorage.setItem('password', JSON.stringify(password));

                    AsyncStorage.setItem('user', JSON.stringify(res.data.user));

                    toast.info("Successfully Logged In")
                    setInterval(() => {
                        window.location.reload(true)
                    }, 1500)
                }
                )
                .catch((error) => {
                    toast.warn("Incorrect Credentials");
                    console.log(error)
                })
        }

    }
    return (
        <div className='hold-transition login-page'>
            <div className="login-box">
                <div className="login-logo">
                    <a href="#"><b>Digi</b>CARD</a>
                </div>
                {/* /.login-logo */}
                <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Sign in to start your session</p>
                        <div>
                            <div className="mb-3 form-control formStyle d-flex" style={{ borderColor: email === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                <input type="email" className="placeHolderStyle" name='Username' onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                                <span className="fas fa-envelope" />
                            </div>
                            <p>{email === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

                            <div className="mb-3 form-control formStyle d-flex" style={{ borderColor: password === "" && fieldStatus === true ? "red" : '#ced4da' }}>
                                <input type="password" className="placeHolderStyle" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                                <span className="fas fa-lock" />
                            </div>
                            <p>{password === "" && fieldStatus === true ? <span className='text-danger'>Input field is empty</span> : ""}</p>

                            <div className="row">
                                <div className="col-8">
                                    <div className="icheck-primary">
                                        <input type="checkbox" id="remember" />
                                        <label htmlFor="remember">
                                            Remember Me
                                        </label>
                                    </div>
                                </div>
                                {/* /.col */}
                                <div className="col-4">
                                    <button type="submit" className="btn btn-secondary btn-block" onClick={submitData}>Sign In</button>
                                </div>
                                {/* /.col */}
                            </div>
                        </div>
                        {/* /.social-auth-links */}
                        <p className="mb-1 mt-2">
                            <Link to="/Forgotpassword" className='btn btn-block btn-danger'>I forgot my password</Link>
                        </p>
                        <p className="mb-0">
                            <Link to="/Register" className="text-center btn btn-block btn-primary">Register a new membership</Link>
                        </p>
                    </div>
                    {/* /.login-card-body */}
                </div>
            </div>

        </div>
    )
}

export default Login