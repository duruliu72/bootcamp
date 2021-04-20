import React, { useState,useEffect } from 'react';
import { Link ,useLocation} from "react-router-dom";
import Pagination from "../components/Pagination"
import auth from "../services/authService"
import _ from 'lodash';
import { apiUrl } from "../config.json";
const apiEndPoint = apiUrl + "/bootcamps";
const BootCamps = (props) => {
    const [bootcamps,setBootcamps]=useState([]);
    const [pageSize,setPageSize]=useState(3);
    const [currentPage,setCurrentPage]=useState(1);
    const [searchObj,setSearchObj]=useState({
        milefrom:"",
        zipcode:"",
        rating: "",
        budget: "",
    });
    let paginate=(items,pageNumber,pageSize) => {
        const startIndex=(pageNumber-1)*pageSize;
        return _(items).slice(startIndex).take(pageSize).value();
    }
    useEffect(()=>{
        let xx=paginate(props.bootcamps,currentPage,pageSize);
        setBootcamps(xx);
    },[]);
    let handleOnChangeByLocation=(e)=>{
        let searchObjCopy ={...searchObj};
        const target = e.currentTarget;
        const name = target.name;
        searchObjCopy[name]=target.value;
        setSearchObj(searchObjCopy);
    }
    let handleSubmitByLocation=(e)=>{
        e.preventDefault();
        let {milefrom,zipcode}=searchObj;
        props.bootCampSearchByLocation({milefrom,zipcode});
    }
    let handlePageChange=(page) => {
        console.log(page);
        setCurrentPage(page);
        let xx=paginate(props.bootcamps,page,pageSize);
        setBootcamps(xx);
    }
   
    let count=props.bootcamps.length;
    if(count===0) return <p>There are no BootCamps</p>;
    return ( 
        <div className="bootcamps-section mt-5">
             <div className="container">
                <div className="row">
                <div className="col-md-4">
                    <div className="bootcamps-search-box">
                        <h2>By Location</h2>
                        <form onSubmit={handleSubmitByLocation}>
                            <div className="form-row">
                                <div className="col">
                                    <input type="text" className="form-control" name="milefrom" onChange={handleOnChangeByLocation} value={searchObj.milefrom}  placeholder="Miles From" />
                                </div>
                                <div className="col">
                                    <input type="text" className="form-control" name="zipcode" onChange={handleOnChangeByLocation} value={searchObj.zipcode} placeholder="Enter Zipcode" />
                                </div>
                            </div>
                            <div className="form-group mt-3">
                                <button className="btn btn-block bg-danger text-white" type="submit">Find Bootcamps</button>
                            </div>
                        </form>
                        <h2>Filter</h2>
                        <form>
                            <div className="form-group">
                                <label htmlFor="rating">Rating</label>
                                <input type="number" name="rating" className="form-control"  id="rating" placeholder="Any" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="budget">Budget</label>
                                <input type="number" name="budget" className="form-control" id="budget" placeholder="Any" />
                            </div>
                            <div className="form-group mt-3">
                                <button className="btn btn-block bg-danger text-white" type="submit">Find Bootcamps</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="bootcamp-list">
                        {
                            bootcamps.map((item)=>{
                                return (
                                    <div key={item.id} className="bootcamp-item mb-3">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <a href=""><img className="img-fluid" src="img/pc.jpg" /></a>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="bootcamp-heading">
                                                    <h2 className="bootcamp-headingtxt"><Link to={"/bootcampdetails/"+item.id}>{item.name}</Link> <span className="text-right">8.8</span></h2>
                                                </div>
                                                <p className="loc"><span>{item.location.city}, {item.location.country}</span></p>
                                                {/* <p>{item.courses.map((course)=>{
                                                    return course.title;
                                                }).join(',')}</p> */}
                                                 <p>{item.careers.map((course)=>{
                                                    return course;
                                                }).join(',')}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <Pagination itemCounts={props.bootcamps.length} pageSize={pageSize} currentPage={currentPage} onPageChange={handlePageChange} />
                </div>
                </div>
            </div>
        </div>
     );
}
 
export default BootCamps;