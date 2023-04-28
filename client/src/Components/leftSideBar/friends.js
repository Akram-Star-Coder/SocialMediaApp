import Cookies from 'js-cookie'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Friend = (friendId) => {

    //fetchng token de cookie
    const u = JSON.parse(Cookies.get('user'))
    const token = u.token;

    const [friend, setFriend] = useState();


    //chercher le user avec ce friendId
    useEffect(()=>{

        const fetching = async()=>{
            try{
                const resp = await axios.get(`http://localhost:3001/user/getU/${friendId.friends}`, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                } )
                if(resp){
                    setFriend(resp.data);
                }
            }
            catch(e){
                console.log(e.message)
            }
        }
        fetching();


    }, [friendId, token, friend]);
    


return (
    <div>
        { friend ? 
        <Link to={`/profile/${friendId.friends}`} className='friend'>
            <div className='imgaeFriends'>
              <img src={friend.picture? friend.picture : "https://cdn-icons-png.flaticon.com/512/149/149071.png" } alt="" />
            </div>
            <div className="FULLNAME">
              {friend.firstName +" "+ friend.lastName}
            </div>
        </Link>
        :
        ""
        }
    </div>
  )
}

export default Friend
