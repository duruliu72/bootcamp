import React, { useState,useEffect } from 'react';
// import { useHistory, useLocation, Redirect } from "react-router-dom";
import auth from "../services/authService"
import { apiUrl } from "../config.json";
import _ from 'lodash';
const apiEndPoint = apiUrl + "/bootcamps";
const AddCourse = () => {
    let [msg,setMsg]=useState("");
    const [couserBean,setCourseBean]=useState({
        title: "Full Stack Web Development",
        weeks: 12,
        tuition: 8000,
        minimumSkill: "intermediate",
        description: "In this course you will learn full stack web development, first learning all about the frontend with HTML/CSS/JS/Vue and then the backend with Node.js/Express/MongoDB",
        scholarhipsAvailable: true
    });
    let handleOnChange=(e)=>{
        let couserBeanCopy={...couserBean};
        const target = e.currentTarget;
        const name = target.name;
        if(target.type==='checkbox'){
            couserBeanCopy[name]=target.checked;
        }else{
            couserBeanCopy[name]=target.value;
        }
        setCourseBean(couserBeanCopy);
    }
    let handleSubmit=(e)=>{
        e.preventDefault();
        fetch(apiEndPoint+"/"+localStorage.getItem("ownbootcampid")+"/courses",{
            method:"POST",
            body:JSON.stringify(couserBean),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                'Authorization': 'Bearer ' + auth.getJwt()
            }
        })
        .then((response)=>response.json())
        .then((json)=>{
            if(json.success){
                setMsg("Course Added successfully");
                setTimeout(() =>{
                    setMsg("");
                },3000)
            }else{
                setMsg(json.error);
                setTimeout(() =>{
                    setMsg("");
                },3000)
            }
            console.log("addd course",json);
        });
        console.log("Add Course");
    }
    return ( 
        <div className="addcourse-section mt-5">
            <div className="container">
                <div className="row">
                    <div className="col">
                       <i className="fa fa-chevron-left" aria-hidden="true"></i>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col-md-12">
                        <h2>DevWords Bootcamps</h2>
                        {msg && <h4>{msg}</h4>}
                        <h4 className="addcourse_title">Add Course</h4>
                    </div>
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Course Title</label>
                                <input type="text" name="title" onChange={handleOnChange} value={couserBean.title} className="form-control" id="title" placeholder="Title" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="weeks">Duration</label>
                                <input type="text" name="weeks" onChange={handleOnChange} value={couserBean.weeks} className="form-control" id="weeks" placeholder="Duration" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="tuition">Course Tuition</label>
                                <input type="text" name="tuition" onChange={handleOnChange} value={couserBean.tuition} className="form-control" id="tuition" placeholder="Tuition" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="minimumSkill">Minimum Skills Required</label>
                                <select name="minimumSkill" onChange={handleOnChange} value={couserBean.minimumSkill} className="form-control" id="minimumSkill">
                                    <option value="Beginer (Any)">Beginer (Any)</option>
                                    <option value="intermediate">intermediate</option>
                                </select>
                                
                            </div>
                            <div className="form-group">
                                <textarea className="form-control" name="description" onChange={handleOnChange} value={couserBean.description} id="description" rows="3" />
                                <p>No more than 500 characters</p>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="scholarhipsAvailable" onChange={handleOnChange} checked={couserBean.scholarhipsAvailable} id="scholarhipsAvailable" />
                                <label className="form-check-label" htmlFor="scholarhipsAvailable">
                                    Schollership Available
                                </label>
                            </div>
                            <div className="form-group mt-3">
                                <button className="btn btn-block bg-dark text-white" type="submit">Add Course</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AddCourse;