import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
function Header(props) {
    let [toggles,setToggles]=useState({
        "1":false,
        "2":false,
    });
    let openNav=(e)=>{
        document.getElementById("mySidenav").style.width = "250px";
    }
    let closeNav=(e)=>{
        document.getElementById("mySidenav").style.width = "0";
    }
    let menutToggle=(e,id)=>{
        let togglesCopy={...toggles};
        if(togglesCopy[id]){
            togglesCopy[id]=false;
        }else{
            togglesCopy[id]=true;
        }
        setToggles(togglesCopy);
        console.log("menutToggle",e,togglesCopy[id]);
    }
  return (
    <header className="header-section bg-danger text-white">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-4">
                    <Link onClick={props.resetHome} className="navbar-brand" to="/"><i className="fas fa-robot"></i> DevCamper</Link>
                    <span style={{fontSize:"30px",cursor:"pointer"}} onClick={openNav}>&#9776;</span>
                </div>
                <div className="col-md-8">
                    <ul className="top-menu">
                       {!props.user&& <li><i className="fas fa-sign-in-alt"></i><Link to="/login">Login</Link></li>}
                       {!props.user&& <li><i className="fas fa-user-plus"></i><Link to="/signup">Register</Link></li>}
                       {props.user&& <li><i className="fas fa-sign-out-alt"></i><Link to="/logout">Logout</Link></li>}
                        <li><a href="#">Browse Bootcamp</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="mySidenav" className="sidenav">
            <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>
            <ul>
                <li><a onClick={(e)=>{
                    menutToggle(e,1);
                }} href="javascript:void(0)">Bootcamp</a>
                    {toggles[1] && <ul>
                        <li><Link to="/bootcamps">show Bootcamps</Link></li>
                        <li><Link to="/addbootcamp">Add Bootcamp</Link></li>
                    </ul>}
                </li>
                <li><a onClick={(e)=>{
                    menutToggle(e,2);
                }} href="javascript:void(0)">Courses</a>
                    {toggles[2]&& <ul>
                        <li><a href="#">show Courses</a></li>
                        <li><Link to="/addcourse">Add Course</Link></li>
                    </ul>}
                </li>
            </ul>
        </div>
    </header>
  );
}
export default Header;