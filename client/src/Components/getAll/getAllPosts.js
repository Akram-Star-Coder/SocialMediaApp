import './getAllPosts.css';
import { useEffect, useState} from 'react'; 
import axios from 'axios';
import Cookies from 'js-cookie';
import Post from '../../pages/Profile/Post';
import { ReactComponent as LoadingIcon } from './Spinner-1s-143px.svg';



const GetAllPosts = () => {


  const [posts, setPosts] = useState([]);
  

  const user = JSON.parse(Cookies.get('user'));
  const token = user.token;

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await axios.get("http://localhost:3001/post/getAll", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setPosts(resp.data);
      } catch (e) {
        console.log(e.message);
      }
    }
    getData();
  }, [token]);

  



 

  return (
    <>
    {
    (!posts)? 
    <div className='containerofLoading'> 
      <LoadingIcon className="cqsjnx"/>
    </div>
    :
    <div className='posts'>
      
      
      {
      posts.map((post, index) => {

        return( <Post post={post} key={index} />)
      
      }
      )
      }


    </div>
    }
    </>

  )
}

export default GetAllPosts;
