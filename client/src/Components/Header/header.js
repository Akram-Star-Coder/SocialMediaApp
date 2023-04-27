import React from 'react'
import {Link, Navigate, useNavigate} from 'react-router-dom';
import './header.css';
import vercel from "./vercel.png"
import { useState } from 'react';
import { useLocation } from "react-router-dom";
import UserMenu from '../UserMenu/userMenu';
import men from './profile.png';
import women from './profileFemale.png';
import Cookies from 'js-cookie';
const Header = () => {


    /** 
     * 
     *  
     *      When you finish the backend then return to the front end 
     *      to make responsiveness because now we just doing general 
     *      stylings ... Go to Part 51 headers of the course or start
     *      from zero to hero 
     * 
     * 
     * **/

    const user = JSON.parse(Cookies.get('user'));


    const location = useLocation();
    
    
    //fct handle caret menu user 
    const [caret, setCret] = useState(false);
    const handleCre = ()=>{
        if(caret){
            setCret(false);
        }
        else{
            setCret(true)
        }
    }

    
    

    //redux store selecting (But since i am just a beginner i will use cookie and when i study redux toolkit i will use it ^^)
      

    //states
    const [search, setSearch] = useState("");

    
    //functions
    const handleChange=(e)=>{
        setSearch(e.target.value)
    }

    const handleCancelClick=()=>{
        const search = document.getElementById("searchBar");
        search.value="";
        setSearch("");
    }
    
    const path = location.pathname;
        
    return (
        <header>
            <div className="headerleft">
                <Link to="/" className='headerlogo'>
                    <div className="circle">
                        <img src={vercel} alt="headerlogo" />
                    </div>
                </Link>
                <div className="headersearch">
                    
                    <input type="search" id='searchBar' name="search" placeholder='Search for a person, post or video..' onChange={handleChange}  />
                    {search && (<i onClick={handleCancelClick} className="fa-solid fa-xmark"></i>) }
                </div>
            </div>
            <div className="headermiddle">
                <Link to='/'  className='linkHeader'  >
                    <button className="linkBtn">
                    
                    {
                        (path !== "/")? (<div className="linkBtn"><i className="black fa-solid fa-house"></i></div>) : (<div className="green linkBtn"><i className="white black jojo fa-solid fa-house"></i></div>)
                        }
                    </button>
                </Link>
                <Link to="/groups"  className='linkHeader' >
                    
                        {
                        (path !== "/groups")? (<div className="linkBtn"><i className="black fa-solid fa-user-group"></i></div>) : (<div className="green linkBtn"><i className="white jojo black fa-solid fa-user-group"></i></div>)
                        }
                    
                </Link>
                <Link to='/contact' className='linkHeader' >
                    {
                    (path !== "/contact")? (<div className="linkBtn"><i className="black fa-solid fa-pen-to-square"></i></div>) : (<div className="green linkBtn"><i className="white jojo black fa-solid fa-pen-to-square"></i></div>)
                    }
                </Link>
                <Link to='/about'  className='linkHeader' >
                    
                    {
                        
                        (path !== "/about")? (<div className="linkBtn"><i className=" black fa-solid fa-circle-question"></i></div>) : (<div className="green linkBtn"><i className="white jojo black fa-solid fa-circle-question"></i></div>)
                        
                    }
                    
                </Link>
            </div>
            <div className="headerright">
                
                <div  className= "imagePlusName">
                    <div className="concon">
                        <Link   to={`/profile/${user._id}`} className="image">
                        
                        {
                            user.picture ? (<img src={user.picture} alt="" />                    
                            ) :<img src={
                               men 
                            } alt="" />                    

                        }
                       
                            
                        </Link>
                    </div>
                    <Link to={`/profile/${user._id}`} className={path === 'profile'? "firstNameModified" : "firstName" }>
                        <span>{user.firstName}</span>
                    </Link>
                </div>
                <div className="buttonContainer">
                    <div className="buttonOp">
                
                            <button>
                                <i className="fa-solid fa-envelope"></i>
                            </button>
                            <div className="circleRedNotif">
                                <span>4</span>
                            </div>
                      
                    </div>
                    <div className="buttonOp">
                    
                            <button>
                                <i className="fa-solid fa-bell"></i>
                            </button>
                            <div className="circleRedNotif">
                                <span>9</span>
                            </div>
                    
                    </div>
                    <div className="buttonOp">
                    
                            <button onClick={handleCre}>
                                <i className="fa-solid fa-bars"></i>
                            </button>
                    </div>
                    {
                        caret && (<UserMenu  user={user}  />)
                    }
                </div>
            </div>
           
        </header>    
    )

}

export default Header

