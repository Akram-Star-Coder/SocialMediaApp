import "./Profile.css";
import Header from '../../Components/Header/header';
import LeftSideBar from '../../Components/leftSideBar/leftbar';
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { ReactComponent as LoadingIcon } from './Dual Ring-0.8s-389px.svg';
import Post from './Post';

const Profile = () => {

  const [userProfile, setUser]  =useState();
  const [userPosts, setUserPosts] = useState([]);
  const [current, setCurrent] = useState(false);

  const currentUser = JSON.parse(Cookies.get('user'));
  const idCookie = currentUser._id;

  const { id } = useParams();
  const idUrl = id;


  useEffect(()=>{

    const getPostByUserIdUrl = async()=>{
      try{
        const resp = await axios.get(`http://localhost:3001/post/getAllPostByIdUser/${idUrl}`, {
          headers : {
            Authorization : `Bearer ${currentUser.token}`
          }
        });
        if(resp){
          setUserPosts(resp.data);
        }
      }
      catch(e){
        console.log(e.message);
      }
    }
    getPostByUserIdUrl();

  }, [idUrl, currentUser.token])
  

  
  useEffect(()=>{
    const getUser = async()=>{
      try{
        const resp = await axios.get(`http://localhost:3001/user/getU/${idUrl}`, {
          headers : {
            Authorization : `Bearer ${currentUser.token}`
          }
        });
        if(resp){
          setUser(resp.data)
          
        }
      }
      catch(e){
        console.log(e.message);
      }
    }
    getUser();
    
 
  }, [currentUser.token, idUrl]);
  



  const fctCheck = ()=>{
    if(idCookie === idUrl){ 
      setCurrent(true)
    }
    else{
      setCurrent(false)
    }
  }
  
  
  useEffect(() => {
    fctCheck();
  }, [idCookie, idUrl])
  

  function getTimeDifference(isoDateString) {
    const date = new Date(isoDateString);
    const currentDate = new Date();
    const diffTime = Math.abs(currentDate - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffYears = Math.ceil(diffDays / 365);
    const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  
    if (diffDays > 365) {
      return `${diffYears} years ago`;
    } else if (diffDays > 0) {
      return `${diffDays} days ago`;
    } else {
      return `${diffMinutes} minutes ago`;
    }
  } 
  

  
  return (
    <>
    
    <div className="bodyprincipleProfile">
      <Header /> 
      
      <div className="profile">
        <> 
        
        <LeftSideBar/>
        {userProfile &&
        <div className="profileInfos">
            <div className="coverP">
              <img className="imageCOCO" src={userProfile.cover? userProfile.cover  :  "https://rare.us/wp-content/uploads/2023/01/RARE-25-2.jpg"} alt="" />
              <div className="pictureUser">
                <img src={userProfile.picture ? userProfile.picture : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
              </div>
            </div>
            <div className="fullnamePROFILE">
                <span className="fullnamePSpan">{ userProfile.firstName+" "+ userProfile.lastName}</span>
                <hr className="hrProfile" />

                <span className="descriptioNprofile">
                  <em>{userProfile.description}</em> 
                </span>
                {
                  current && (
                    <> 
                    <div className="editProfile">
                      <button>Edit Account</button>
                    </div>
                    <div className="deleteProfile">
                    <button>Delete Account</button>
                  </div>
                  </>
                  )
                }
            </div>
            <div className="userInfos">
                


                
                <div className="ui1">
                {
                  (userPosts.length === 0)? <em className="ememe"><i className="fa-solid fa-ghost"></i> {  (currentUser._id===userProfile._id ) ? "You haven't created any posts yet" : userProfile.firstName  +"     haven't created any post yet"}</em> : 
                  
                  userPosts.map((post, index)=>{
                    return (
                      <Post post={post} key={index} />
                    )
                  })
                  
                }
                </div>




                <div className="ui2">
                    <div className="containerui2">
                      
                      <h2>User Informations</h2>

                      <div className="emailp">
                        <div className="optionp">Email</div>
                        <div className="optionpvalue">{userProfile.email}</div>
                      </div>

                      <div className="emailp">
                        <div className="optionp following">Gender</div>
                        <div className="optionpvalue">{(userProfile.gender === 'Female')? <i className="fa-solid fa-venus"></i>:<i className="fa-solid fa-mars"></i>}</div>
                      </div>

                      <div className="emailp">
                        <div className="optionp  following2">Birthday</div>
                        <div className="optionpvalue ">{userProfile.birthdayDay+'/'+userProfile.birthdayMonth+'/'+userProfile.birthdayYear}</div>
                      </div>

                      <noscript>
                      <div className="emailp">
                        <div className="optionp following">Followers</div>
                        <div className="optionpvalue">{userProfile.followers.length}</div>
                      </div>

                      <div className="emailp">
                        <div className="optionp following">Following</div>
                        <div className="optionpvalue">{userProfile.following.length}</div>
                      </div>
                      </noscript>
                      <div className="emailp">
                        <div className="optionp following">Friends</div>
                        <div className="optionpvalue">{userProfile.friends.length}</div>
                      </div>

                      <div className="emailp">
                        <div className="optionp following2">Created</div>
                        <div className="optionpvalue">{userPosts.length >1 && userPosts.length} { (userPosts.length > 1 )? "posts" : (userPosts.length === 0)? "No post" : " 1 post"  }</div>
                      </div>

                      <div className="emailp">
                        <div className="optionp following2">Joined</div>
                        <div className="optionpvalue">{getTimeDifference(userProfile.createdAt)}</div>
                      </div>

                    </div>
                </div>
            </div>
              

        </div>
        }
      </>
      
      </div>
    
    </div>
    
    
   </>
  )
  
}

export default Profile
