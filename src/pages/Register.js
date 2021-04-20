import React, { useState,useEffect } from 'react';
import { useHistory, useLocation, Redirect } from "react-router-dom";
import { validate,validateProperty } from '../models/user';
import auth from "../services/authService"
import { apiUrl } from "../config.json";
import _ from 'lodash';
const tokenKey = "token";
const apiEndPoint = apiUrl + "/auth/register";
function Register() {
    let history = useHistory();
    let location = useLocation();
    const [user,setUser]=useState({
        name: '',
        email:"",
        password:"",
        confirm_password:"",
        role:"user"
    });
    const [errors, setErrors] = useState({});
    let handleOnChange=(e)=>{
        var errorsCopy = { ...errors };
        const errorMessage = validateProperty(e.currentTarget);
        if (errorMessage) errorsCopy[e.currentTarget.name] = errorMessage;
        else delete errorsCopy[e.currentTarget.name];
        setErrors(errorsCopy);
        let userCopy = { ...user }
        userCopy[e.currentTarget.name] = e.currentTarget.value;
        setUser(userCopy);
    }
    let handleSubmit=(e)=>{
        e.preventDefault();
        const errorsCopy = validate(user);
        setErrors(errorsCopy);
        if(errorsCopy) return;

        console.log(_.pick(user,["name","email","password","role"]));
        fetch(apiEndPoint, {
            method: 'POST',
            body: JSON.stringify(_.pick(user,["name","email","password","role"])),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
            },
          })
            .then((response) => response.json())
            .then((json) => {
                const {success,token:jwt}=json;
                console.log(json);
                if(success){
                    localStorage.setItem(tokenKey, jwt);
                    let { from } = location.state || { from: { pathname: "/" } };
                    window.location = from.pathname;
                }
            })
            .catch((ex)=>{
            });
    }
    if (auth.authUser()) {
        return <Redirect to="/" />
    }
    return (
    <div className="singup-section">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h3><span><i className="fas fa-user-plus"></i></span> Register</h3>
                    <p>Register to list your bootcamp or rate,reviews and favorite</p>
                </div>
                <div className="col-md-12">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" onChange={handleOnChange} value={user.name} name="name" className="form-control" id="name" placeholder="Enter full Name" />
                            {(errors && errors.name) && <div className="alert alert-danger">{errors.name}</div>}
                        </div>
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
                        <div className="form-group">
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input type="password" name="confirm_password" onChange={handleOnChange} value={user.confirm_password} className="form-control" id="confirm_password" placeholder="Confirm Password" />
                            {(errors && errors.confirm_password) && <div className="alert alert-danger">{errors.confirm_password}</div>}
                        </div>
                        <div className="user-role">
                            <p>User Role</p>
                            <div className="form-check">
                                <input  className="form-check-input" type="radio" name="role" onChange={handleOnChange} id="regularUser" value="user" defaultChecked />
                                <label className="form-check-label" htmlFor="regularUser">
                                    Regular User(Browse,Write reviews,etc)
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="role" id="pubisherUser" onChange={handleOnChange} value="publisher" />
                                <label className="form-check-label" htmlFor="pubisherUser">
                                    Bootcamp Publisher
                                </label>
                            </div>
                        </div>
                        <div className="bootcamp--text">
                            <p className="text-danger">* You must be affiliated with the bootcamp in some way in order to add to DevCamper</p>
                        </div>
                        <div>
                            <button className="btn btn-block bg-danger text-white" type="submit">Register</button>
                        </div>
                        
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Register;