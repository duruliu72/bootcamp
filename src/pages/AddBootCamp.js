import React, { useState,useEffect } from 'react';
import _ from 'lodash';
// import { useHistory, useLocation, Redirect } from "react-router-dom";
import auth from "../services/authService"
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/bootcamps";
const AddBootCamp = () => {
    let [msg,setMsg]=useState("");
    let [bootcampBean,setBootcampBean] =useState({
		name: "",
        address: "",
        phone: "",
        email: "",
        website: "",
		description: "",
		careers: [],
		housing: false,
		jobAssistance: false,
		jobGuarantee: false,
		acceptGi: true
    });
    let handleOnChange=(e)=>{
        let bootcampBeanCopy={...bootcampBean};
        const target = e.currentTarget;
        const name = target.name;
        if(target.type==='checkbox'){
            bootcampBeanCopy[name]=target.checked;
            console.log(target.checked);
        }else{
            bootcampBeanCopy[name]=target.value;
        }
        setBootcampBean(bootcampBeanCopy);
    }
    let handleMSelectOnChange=(e) => {
        let bootcampBeanCopy={...bootcampBean};
        const target = e.currentTarget;
        const name = target.name;
        let value = Array.from(target.selectedOptions, option => option.value);
        bootcampBeanCopy[name]=value;
        setBootcampBean(bootcampBeanCopy);
    }
    let handleSubmit=(e)=>{
        e.preventDefault();
        fetch(apiEndPoint, {
            method: 'POST',
            body: JSON.stringify(bootcampBean),
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + auth.getJwt()
            },
          })
            .then((response) => response.json())
            .then((json) => {
                if(json.success){
                    setMsg("Bootcamp Submitted successfully");
                    setTimeout(() =>{
                        setMsg("");
                    },3000)
                }else{
                    setMsg(json.error);
                    setTimeout(() =>{
                        setMsg("");
                    },3000)
                }
                console.log(json);
            })
            .catch((ex)=>{
                console.log(ex);
            });
    }
    return ( 
        <div className="add-bootcamp-section">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Add Bootcamp</h2>
                        {msg && <h4>{msg}</h4>}
                        <p>Important: You must be affiliated with a Bootcamp to add to DevCamper</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <h2>Location & Contact</h2>
                            <p>if multiple locations use the main or largest</p>
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" name="name" onChange={handleOnChange} value={bootcampBean.name} className="form-control" id="name" placeholder="Bootcamp Name" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="address">Address</label>
                                <input type="text" name="address" onChange={handleOnChange} value={bootcampBean.address} className="form-control" id="address" placeholder="Full Address" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" name="phone" onChange={handleOnChange} value={bootcampBean.phone} className="form-control" id="phone" placeholder="Phone" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" onChange={handleOnChange} value={bootcampBean.email} className="form-control" id="email" placeholder="Contact Email" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="website">Website</label>
                                <input type="text" name="website" onChange={handleOnChange} value={bootcampBean.website}className="form-control" id="website" placeholder="Website  URL" />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <h2>Other info</h2>
                            {/* <p>Important: You must be affiliated with a Bootcamp to add to DevCamper</p> */}
                            <div className="form-group">
                                <label htmlFor="description">Description</label>
                                <textarea className="form-control" name="description" onChange={handleOnChange} value={bootcampBean.description} id="description" rows="3" />
                                <p>No more than 500 characters</p>
                            </div>
                            <div className="form-group">
                                <label htmlFor="careers">Careers</label>
                                <select multiple={true} name="careers" onChange={handleMSelectOnChange} value={bootcampBean.careers} className="form-control" id="careers">
                                    <option value="">Select all that apply</option>
                                    <option value="Web Development">Web Development</option>
                                    <option value="Mobile Development">Mobile Development</option>
                                    <option value="UI/UX">UI/UX</option>
                                    <option value="Data Science">Data Science</option>
                                    <option value="Business">Business</option>
                                    <option value="Web Design">Web Design</option>
                                </select>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="housing" onChange={handleOnChange}  checked={bootcampBean.housing} id="housing" />
                                <label className="form-check-label" htmlFor="housing">
                                    Housing
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="jobAssistance" onChange={handleOnChange} checked={bootcampBean.jobAssistance} id="jobAssistance" />
                                <label className="form-check-label" htmlFor="jobAssistance">
                                    Job Assistant
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="jobGuarantee" onChange={handleOnChange} checked={bootcampBean.jobGuarantee} id="jobGuarantee" />
                                <label className="form-check-label" htmlFor="jobGuarantee">
                                    Job Guarantee
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" name="acceptGi" onChange={handleOnChange}  checked={bootcampBean.acceptGi} id="acceptGi" />
                                <label className="form-check-label" htmlFor="acceptGi">
                                    Accept GI Bill
                                </label>
                            </div>
                            <p>After you add the bootcamp,you can add the specific course Offer</p>
                            {/* <div className="form-group">
                                <label htmlFor="phone">Phone Number</label>
                                <input type="text" name="phone" className="form-control" id="phone" placeholder="Phone" />
                            </div> */}
                            
                        </div>
                    </div>
                    <div className="form-group mt-3">
                        <button className="btn btn-block bg-success text-white" type="submit">Submit Bootcamp</button>
                    </div>
                </form>
            </div>
        </div>
     );
}
 
export default AddBootCamp;