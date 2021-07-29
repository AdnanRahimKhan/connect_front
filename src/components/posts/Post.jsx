import  "./post.css"
import { Delete } from "@material-ui/icons"
import { useContext, useState } from "react"
import axios from "axios"
import { useEffect } from "react"
import {format} from "timeago.js"
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Post({post}) {
    const [like,setlike] = useState(post.likes.length);
    const [isliked,setisliked] = useState(false); 
    const [user,setUser] = useState({}); 
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {user:currentUser} = useContext(AuthContext);

    useEffect(()=>{
        setisliked(post.likes.includes(currentUser._id))
    },[currentUser._id,post.likes])

    useEffect(()=>{
        const fetchUser = async ()=>{
            const res = await axios.get(`http://localhost:8800/api/user?userId=${post.userId}`);
            setUser(res.data);
        };

       fetchUser();

    },[post.userId])

    const likeHandler= ()=>{

        try{
            axios.put("http://localhost:8800/api/posts/"+post._id+"/like",{userId:currentUser._id})
         

        }catch(err){

        }
        setlike(isliked ? like-1:like+1)
        setisliked(!isliked)
    }
    const delePost = async (e)=>{
            e.preventDefault();
            try{
                return await axios({
                    method: 'DELETE',
                    url: 'http://localhost:8800/api/posts/'+post._id,
                    data: {
                    userId:currentUser._id
                }
            });
        }
        catch(err){
            
            console.log(err);
        }
        window.location.reload();
}

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopleft">
                        <Link to={`/profile/${user.username}`}>
                        <img src={user.profilePicture ?PF+user.profilePicture: PF+"pictures/noAvatar.png"} alt="profile" className="postProfileImg"/>
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopright">
                        <button onClick={delePost} style={{border:"none",background:"white"}}>
                        {user._id===currentUser._id&&(
                            <Delete htmlColor="red"/>
                        )}
                        
                        </button>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText ">{post?.desc}</span>
                    <img src={PF+post.img} alt="" className="postImg"/>
                </div>
                <div className="postBottom">
                    <div className="postBottomleft">
                        <img src={`${PF}pictures/like.png`} alt=""  className="likeIcon " onClick={likeHandler}/>
                        <img src={`${PF}pictures/heart.png`} alt="" className="likeIcon " onClick={likeHandler}/>
                        <span className="postLikeCounter">{like} likes</span>
                    </div>
                    <div className="postBottomright">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
