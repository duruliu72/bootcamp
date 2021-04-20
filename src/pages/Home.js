import React, { useState,useEffect } from 'react';
import { Route, Redirect,useHistory } from 'react-router-dom';
import BootCamps from './BootCamps';
import auth from "../services/authService"
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/bootcamps";
function Home(props) {
    const [bootcamps,setBootcamps]=useState([]);
    const [searchObj,setSearchObj]=useState({
        milefrom:"",
        zipcode:""
    });
    let handleOnChange=(e)=>{
        let searchObjCopy = { ...searchObj }
        searchObjCopy[e.currentTarget.name] = e.currentTarget.value;
        setSearchObj(searchObjCopy);
    }
    let handleSubmit=(e)=>{
        e.preventDefault();
        let {milefrom,zipcode}=searchObj;
        props.bootCampSearchByLocation({milefrom,zipcode});
    }
    if(props.isSearch){
        // ?return <BootCamps bootcamps={props.bootcamps} bootCampSearchByLocation={props.bootCampSearchByLocation} />
        return <BootCamps {...props} />
    }
    return (
    <div className="home-section">
        <div className="overlay">
             <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="home__content">
                            <h2>Find a Code Bootcamp</h2>
                            <p>Find , rate and reviews on coding bootcamp.</p>
                            <form onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="col">
                                        <input type="text"  name="milefrom" onChange={handleOnChange} value={searchObj.milefrom} className="form-control" placeholder="Miles From" />
                                    </div>
                                    <div className="col">
                                        <input type="text" name="zipcode" onChange={handleOnChange} value={searchObj.zipcode} className="form-control" placeholder="Enter Zipcode" />
                                    </div>
                                </div>
                                <div className="form-group mt-3">
                                    <button className="btn btn-block bg-danger text-white" type="submit">Find Bootcamps</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
       
    </div>
    )
}
export default Home;