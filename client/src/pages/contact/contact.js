import "./contact.css";
import Header from '../../Components/Header/header';
import { ReactComponent as LoadingIcon } from "../groups/Infinity-0.8s-176px.svg"
import { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie'
import useClickOutsideToHideElement from '../../helpers/clickOutsideToHide';
import { useRef } from 'react';

const Contact = () => {

  
  const element1 = useRef(null);
  const element2 = useRef(null);
  const element3 = useRef(null);
  useClickOutsideToHideElement(element1, ()=>{
    setisSent('')
})
useClickOutsideToHideElement(element2, ()=>{
  setisSent('')
})
useClickOutsideToHideElement(element3, ()=>{
  setisSent('')
})
  



  const [message, setMessage] = useState('');
  const user = JSON.parse(Cookies.get('user')); 
  const [isSent, setisSent]=  useState("");

  const handleSubmit = (ev)=>{
      ev.preventDefault();
      const asyncF = async()=>{
        try{
          
          const resp = await axios.post(`http://localhost:3001/user/contagtMe`, message, {
            headers : {
              Authorization : `Bearer ${user.token}`
            }
          })
          if(resp){ 
            setisSent("Thank you ! Your message has been sent successfully.")
          }
          else{
            setisSent("An error occuried. Please try again.")
          }
        }
        catch(e){
          setisSent("An error occuried. Please try again.")
          console.log(e.message)
        }
      }
      asyncF();
  }

  const handleChange = (e)=>{
    setMessage(e.target.value);
    setisSent('')
  }



  return ( 
    <div>
      
      <Header />
      
      <div className="bodyCONTACT">
        
        
        {
          isSent==="Thank you ! Your message has been sent successfully."? 
          <div ref={element1} className="senterrh zidyqs">
          <span>{isSent}</span>
          </div> 
        :
        isSent==="An error occuried. Please try again."?
        <div ref={element2}   className="senterrh ydziqsk">
          <span>{isSent}</span>
          </div> 
        :
        <div ref={element3}  className="senterrh yutjby">
          <span></span>
        </div> 
        }

        
        <h2>Contact Me</h2>
        <form onSubmit={handleSubmit} > 
          <textarea name="message" id="" cols="30" rows="10" placeholder="Write your message here .."  onChange={handleChange}  ></textarea>
          <button type='submit'>Submit</button>
        </form>
       
      </div>


   
    </div>
  )
}

export default Contact