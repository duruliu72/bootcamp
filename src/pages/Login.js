import React, { useState,useEffect } from 'react';
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { loginValidate} from '../models/user';
import { apiUrl } from "../config.json";
import auth from "../services/authService"
const tokenKey = "token";
const apiEndPoint = apiUrl + "/auth/login";
function Login() {
    let history = useHistory();
    let location = useLocation();
    const [isBtnActive,setIsBtnActive]=useState(true)
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    let handleOnChange=(e)=>{
        let userCopy = { ...user }
        userCopy[e.currentTarget.name] = e.currentTarget.value;
        setUser(userCopy);
    }
    let handleSubmit=(e)=>{
        e.preventDefault();
        e.preventDefault();
        const errorsCopy = loginValidate(user);
        setErrors(errorsCopy);
        setTimeout(function(){
            setErrors({});
        },2000)
        if(errorsCopy) return;
        fetch(apiEndPoint, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => {
                const {success,token:jwt}=json;
                if(success){
                    localStorage.setItem(tokenKey, jwt);
                    let { from } = location.state || { from: { pathname: "/" } };
                    window.location = from.pathname;
                }
                console.log(json);
            })
            .catch((ex)=>{
            });
    }
    if (auth.authUser()) {
        return <Redirect to="/" />
    }
  return (
    <div className="login-section">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3><span><i className="fas fa-sign-in-alt"></i></span> Login</h3>
                    <p>Login to list your bootcamp or rate,reviews and favorite</p>
                </div>
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                       
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" name="email" onChange={handleOnChange} value={user.email} className="form-control" id="email" placeholder="Enter Email" />
                            {(errors && errors.email) && <div className="alert alert-danger">{errors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" name="password" onChange={handleOnChange} value={user.password} className="form-control" id="password" placeholder="Enter Password" />
                            {(errors && errors.password) && <div className="alert alert-danger">{errors.password}</div>}
                        </div>
                        <div>
                            <button className="btn btn-block bg-danger text-white" type="submit">Login</button>
                        </div>
                        <div className="form-group row mt-4">
                            <div className="col-12">
                                <span>Forgot your password?</span><a href="">Reset password?</a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Login;