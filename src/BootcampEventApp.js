import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import _ from 'lodash';
import Header from './components/common/Header';
import Home from './pages/Home';
import BootCamps from './pages/BootCamps';
import BootCampDetails from './pages/BootCampDetails';
import AddBootCamp from './pages/AddBootCamp';
import AddCourse from './pages/AddCourse';
import Register from './pages/Register';
import Login from './pages/Login';
import Logout from './pages/Logout';
import auth from "./services/authService";
import ProtectedRoute from "./ProtectedRoute";
import { apiUrl } from "./config.json";
const apiEndPoint = apiUrl + "/auth/me";
function BootcampEventApp() {
    const [pageSize,setPageSize]=useState(3);
    const [currentPage,setCurrentPage]=useState(1);
    const [authUser,setAuthUser]=useState(null);
    const [userinfo,setUserinfo]=useState(null);
    const [bootcamps,setBootcamps]=useState([]);
    const [paginatingBootcamps,setpaginatingBootcamps]=useState([]);
    const [itemCount,setItemCount]=useState(0);
    const [isSearch,setIsSearch]=useState(false);
    let paginate=(items,pageNumber,pageSize) => {
        const startIndex=(pageNumber-1)*pageSize;
        return _(items).slice(startIndex).take(pageSize).value();
    }
    useEffect(()=>{
        setAuthUser(auth.authUser);
        fetch(apiEndPoint, {
            headers: {
              'Content-type': 'application/json; charset=UTF-8',
              'Authorization': 'Bearer ' + auth.getJwt()
            },
          })
            .then((response) => response.json())
            .then((json) => {
                const {success,data} = json;
                if(success){
                    setUserinfo(data);
                }
               console.log(json);
            })
            .catch((ex)=>{
                console.log("Ex",ex);
            });
            fetch(apiUrl+"/bootcamps")
            .then((response) => response.json())
            .then((json) => {
                // console.log(json);
                let {success}=json;
                if(success){
                    let {data,count,pagination}=json;
                    setBootcamps(json.data);
                    setItemCount(count);
                    setCurrentPage(1);
                    let filterItems=paginate(json.data,currentPage,pageSize);
                    setpaginatingBootcamps(filterItems);
                }
            });
    },[]);
    let bootCampSearchByLocation=({zipcode,milefrom}) =>{
        fetch(apiUrl+"/bootcamps/radius/"+zipcode+"/"+milefrom)
        .then((response) => response.json())
        .then((json) => {
            let {success}=json;
            if(success){
                let {data,count,pagination}=json;
                setBootcamps(json.data);
                setItemCount(count);
                setCurrentPage(1);
                let filterItems=paginate(json.data,currentPage,pageSize);
                setpaginatingBootcamps(filterItems);
                setIsSearch(true);
            }
        }).catch((error) => {
            console.log("Error:",error);
        });
    }
   let resetHome=() => {
        setIsSearch(false);
    }
    let handlePageChange=(page) => {
        console.log(page);
        setCurrentPage(page);
        let filterItems=paginate(bootcamps,page,pageSize);
        setpaginatingBootcamps(filterItems);
    }
  return (
    <Router>
        <Header resetHome={resetHome} user={authUser} />
        <Switch>
            <ProtectedRoute exact path="/" >
                <Home  pageSize={pageSize} currentPage={currentPage} handlePageChange={handlePageChange} isSearch={isSearch} bootcamps={paginatingBootcamps} itemCount={itemCount} bootCampSearchByLocation={bootCampSearchByLocation} />
            </ProtectedRoute>
            <Route path="/bootcamps" >
                <BootCamps pageSize={pageSize} currentPage={currentPage} handlePageChange={handlePageChange} bootcamps={paginatingBootcamps} itemCount={itemCount} bootCampSearchByLocation={bootCampSearchByLocation} />
            </Route>
            <Route path="/bootcampdetails/:id" >
                <BootCampDetails />
            </Route>
            <Route path="/addbootcamp" >
                <AddBootCamp />
            </Route>
            <Route path="/addcourse" >
                <AddCourse />
            </Route>
            <Route path="/signup">
                <Register />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/logout">
                <Logout />
            </Route>
        </Switch>
    </Router>
  );
}

export default BootcampEventApp;