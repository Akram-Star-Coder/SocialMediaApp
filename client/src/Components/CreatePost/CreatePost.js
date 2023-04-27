import "./CreatePost.css";
import live from './live.png'
import photo from './photo.png';
import happy  from './happy.png'
import akram from './akram.jfif';
import {useRef, useState} from "react";
import Cookies from 'js-cookie';
import axios from 'axios';
import useClickOutsideToHideElement from '../../helpers/clickOutsideToHide';
import { Navigate, useNavigate } from "react-router-dom";

const CreatePost = () => {
 

    //states
    const [isLoading, setisLoading] = useState(false);
    const [data, setData] = useState({
        text : "", 
        image : ""
    });

    const [popUp, setPopUp] = useState();
    //referencing the element so that we hide it when we click outside it 
    const element = useRef(null);
    useClickOutsideToHideElement(element,()=>{
    if(popUp){
        setPopUp(false)
    }
    else{
        setPopUp(true)
    }
    })

    const handleClickInputToShowPopupWindow = ()=>{
        if(popUp){
            setPopUp(false)
        }
        else{
            setPopUp(true)
        }
    }
    const handleclick = ()=>{
        if(popUp){
            setPopUp(false)
        }
        else{
            setPopUp(true)
        }
    }
 

    const [photoClick, setClickP] = useState()
    const handelPhotoClick = ()=>{
        if(photoClick){
            setClickP(false);
        }
        else{
            setClickP(true);
        }
    }

    //fucntion handle change of inputs 
    const handleChange = (e)=>{
        setData({
            ...data, 
            [e.target.name] : e.target.value
        })
    }
 
    //get user
    const user = JSON.parse(Cookies.get('user'));
    //console.log(user);

    const navigate = useNavigate();
    //function handleCreateSbmit
    const handleCreateSbmit =async (e)=>{
        e.preventDefault();
        try{
            //setIsLoading(true)
            setisLoading(true) 

            const token = user.token;

            const dataModified = {
                user : user._id, 
                text : data.text, 
                image : data.image
            }

            const resp = await axios.post('http://localhost:3001/post/create', dataModified, {headers :{
                Authorization : `Bearer ${token}`
            } }); 
            if(resp){
                setisLoading(false);
                setPopUp(false);
                navigate(0);
            }
        }
        catch(e){
            setisLoading(false);
            console.log(e.message);
        }
    }


    

 
    return (
    <div className='createContainer'>
        {
            popUp && (
            <div className="popupC">
                <div className="createInp" ref={element}>
                    <div className="headerSlice">
                        <h2>Create post</h2>
                        <button onClick={handleclick}><i className="fa-solid fa-xmark"></i></button>
                    </div>
                    <div className="bodySlice">
                        
                        <div className="bodySlice2">
                            <div className="imggg">
                                <img src={user.picture ? user.picture : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                            </div>
                            <span>{user.firstName+' '+user.lastName}</span>
                        </div>
                        <form onSubmit={handleCreateSbmit} >
                        <div className="bodySlice3">
                            <textarea name='text' placeholder={`What's on your mind, ${user.firstName}`}  cols="30" rows="10" onChange={handleChange}  />
                         </div>
                         {
                            photoClick && (<div>
                                <div className="DIVDIV">
                                <input  onChange={handleChange} className="inputURL" type="text" name="image" placeholder="Please enter URL of your image/video" />
                                </div>
                            </div> )
                         }
                         <div className={photoClick? "opop popop" : "opop"}>
                        <div className="options gh1"  onClick={handelPhotoClick}>
                            <img src={live} alt="" />
                            <div className="spansis">
                            <span>Live Video</span>
                             </div>
                        </div>
                        <div className="options gh1" onClick={handelPhotoClick}>
                            <img src={photo} alt="" />
                            <div className="spansis">
                            <span>Photo/video</span>
                            </div>
                        </div>
                        <div className="options gh1">
                            <img src={happy} alt="" />
                            <div className="spansis">
                                <span>Feeling/activity</span>
                            </div>
                        </div>
                        </div>
                        <div className="butt">
                        <button type="submit">Create</button>
                        </div>
                        </form>
                    </div>
                    
                </div>
            </div>
            )
        }
        <div className="createc2">
            <div className="slice1Create" onClick={handleClickInputToShowPopupWindow} >
                <img  src={user.picture ? user.picture : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="" />
                <input disabled  type="text" placeholder={`What's on your mind, ${user.firstName}`} />
            </div>
            <hr />
            <div className="slice2create">
                
                <div className="gh1" onClick={handleClickInputToShowPopupWindow}>
                    <img src={live} alt="" />
                    <div className="spansis">
                    <span>Live Video</span>
                    </div>
                </div>
                <div className="gh1" onClick={handleClickInputToShowPopupWindow}>
                    <img src={photo} alt="" />
                    <div className="spansis">
                    <span>Photo/video</span>
                    </div>
                </div>
                <div className="gh1" onClick={handleClickInputToShowPopupWindow}>
                    <img src={happy} alt="" />
                    <div className="spansis">
                    <span>Feeling/activity</span>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default CreatePost





