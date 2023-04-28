import './leftbar.css'
import friend from './friends.png'
import {Link} from 'react-router-dom'
import groups from './groups.png';
import saved from './saved.png'
import pages from './pages.png'
import event from './event.png'
import memory from './memory.png'
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import Friend from './friends';
import axios from 'axios';



const Leftbar = () => {

  const u = JSON.parse(Cookies.get('user'));
  const id = u._id;
  const token = u.token;

  //rechercher le user 
  const [user, setUser] = useState();

  //axios request 
  useEffect(()=>{
    const fecthUser = async()=>{
      try {
        const resp = await axios.get(`http://localhost:3001/user/getU/${id}`, {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        if(resp){
          setUser(resp.data);
        }
      }
      catch(e){
        console.log(e.message)
      }
    } 
    fecthUser();
  }, [token, id])

  

  return (
    <div className='Leftbar'>
        
         
      
      <div className="slice1"> 
      <div className="titleK">
          <span>Discover</span>
        </div>
        <Link  className="slice">
          <div className="im">
            <img src={friend} alt="" />
          </div>
          <div className="titleXs">
            <span>Find Friends</span>
          </div>
        </Link>

        <Link  className="slice">
          <div className="im">
            <img src={groups} alt="" />
          </div>
          <div className="titleXs">
            <span>Groups</span>
          </div>
        </Link>

        <Link  className="slice">
          <div className="im">
            <img src={pages} alt="" />
          </div>
          <div className="titleXs">
            <span>Pages</span>
          </div>
        </Link>

        <Link  className="slice">
          <div className="im">
            <img src={saved} alt="" />
          </div>
          <div className="titleXs">
            <span>Saved</span>
          </div>
        </Link>

        <Link  className="slice">
          <div className="im">
            <img src={event} alt="" />
          </div>
          <div className="titleXs">
            <span>Events</span>
          </div>
        </Link>

        <Link className="slice">
          <div className="im">
            <img src={memory} alt="" />
          </div>
          <div className="titleXs">
            <span>Memories</span>
          </div>
        </Link>

      </div>


      <hr className="hrhrhr" />



      <div className="slice2">
        <div className="titleK">
          <span>Friends List</span>
        </div>
        <div className="friendsContainer">

          {
            user && (
            user.friends ?
            user.friends.map((f,index)=>{
              return(
                <Friend friends={f} key={index}/>
              )
            })
            :
            <div>"No Friends"</div>
            )
          }
          

        </div>
      </div>
    </div>
  )
} 

export default Leftbar
