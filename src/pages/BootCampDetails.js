import React, { useState,useEffect } from 'react';
import { useParams } from "react-router-dom";
import { apiUrl,rootUrl } from "../config.json";
const apiEndPoint = apiUrl + "/bootcamps"
const  BootCampDetails= () => {
    const [isLoading,setIsLoading]=useState(false);
    const [bootcamp,setBootcamp]=useState(null);
    let { id } = useParams();
    localStorage.setItem("ownbootcampid",id);
    useEffect(()=>{
        setIsLoading(true);
        fetch(apiEndPoint+"/"+id)
        .then((response) => response.json())
        .then((json) => {
            if(json.success){
                const {data} = json;
                setBootcamp(data);
               console.log(data);
               setIsLoading(false);
            }
        }).catch(ex=>{
            console.log(ex);
            setIsLoading(false);
        });
    },[]);
    if(isLoading) return <h2>Loading...</h2>;
    return ( 
        <div className="bootcamps-section mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-md-8">
                        <div className="bootcamp-details-heading mb-4">
                            {bootcamp&&<h2 className="heading">{bootcamp.name}</h2>}
                            {bootcamp && <p>{bootcamp.description}</p>}
                            {bootcamp&&<h4>Avarage Course Cost:<span className="bootcamp-details__cost">{bootcamp.averageCost}</span></h4>}
                        </div>
                        <div className="bootcamp-course mb-3">
                            <h2>Front End Web Development</h2>
                            <h4>Duration:8 weeks</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <ul className="bootcamp-details-heading_ul">
                                <li>Cost:5800 USD</li>
                                <li>Skills Required: Beginers</li>
                                <li>Schollership Available</li>
                            </ul>
                        </div>
                        <div className="bootcamp-course">
                            <h2>Full Stack Web Development</h2>
                            <h4>Duration:8 weeks</h4>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <ul className="bootcamp-details-heading_ul">
                                <li>Cost:5800 USD</li>
                                <li>Skills Required: Beginers</li>
                                <li>Schollership Available</li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-4">
                       <div className="bootcamp-image mb-3">
                            {/* {!bootcamp&& <img className="img-fluid" src={rootUrl+"/uploads/images/"+bootcamp.photo} />} */}
                            <img className="img-fluid" src="/img/pc.jpg" />
                       </div>
                       <div className="bootcamp-ratting mb-3">
                            <h3><span>8.8</span> Rating</h3>
                       </div>
                       <div className="bootcamp-review mb-3 text-center">
                           <p><i className="fa fa-comments mr-2" aria-hidden="true"></i>Read Reviews</p>
                       </div>
                       <div className="bootcamp-w-review mb-3 text-center">
                           <p>Write a Reviews</p>
                       </div>
                       <div className="bootcamp-website text-center">
                           {bootcamp&&<p><i className="fa fa-globe" aria-hidden="true"></i><a href={bootcamp.website}>Website</a></p>}
                       </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default BootCampDetails;