import "./contact.css";
import Header from '../../Components/Header/header';
import { ReactComponent as LoadingIcon } from "../groups/Infinity-0.8s-176px.svg"
import { useState } from "react";
import axios from 'axios';
import Cookies from 'js-cookie'

const Contact = () => {


  const [message, setMessage] = useState();
  const user = JSON.parse(Cookies.get('user')); 


  const handleSubmit = (e)=>{
      e.preventdefault();
      const asyncF = async()=>{
        try{
          const data = {
            message : message, 
            idUser  : user._id 
          }
          const resp = await axios.post(`http://localhost/user/contactMe`, data, {
            headers : {
              Authorization : `Bearer ${user.token}`
            }
          })
          if(resp){
            console.log('Message Sent Succesfully')
          }
        }
        catch(e){
          console.log(e.message)
        }
      }
      asyncF();
  }

  const handleChange = (e)=>{
    setMessage(e.target.value);
    console.log(message);
  }



  return ( 
    <div>
      
      <Header />
      
      <div className="bodyCONTACT">
      
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