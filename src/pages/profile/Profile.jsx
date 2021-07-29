import "./profile.css"
import Header from "../../components/navbar/Header"
import Sidebar from "../../components/sidebar/Sidebar"
import Feed from "../../components/feed/Feed"
import Rightbar from "../../components/rightbar/Rightbar"
import { useState,useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router";
// import {Row,Col,Toast,Button} from "react-bootstrap"
import { SentimentDissatisfied } from "@material-ui/icons"

export default function Profile() {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user,setUser]=useState({});
  const username = useParams().username
  

  useEffect(()=>{
    const fetchUser = async ()=>{
        const res = await axios.get(`http://localhost:8800/api/user?username=${username}`);
        setUser(res.data);
    };

   fetchUser();

},[username])


    return (

      
        <>
        <Header />

        <div className="profile">
          <Sidebar />
          {!user.username? <>
            <div className="nouser">
              <h1 className="mess">User does not exist!!</h1>
              <SentimentDissatisfied className="emoji" style={{fontSize:"70px"}}/>
              <h1 className="name2">Please Enter the Correct Username</h1>
            </div>

          </> 
            
            
            
          : <>
          <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                <img src={user.coverPicture ?PF+user.coverPicture: PF+"pictures/noCover.jpeg"} alt="" className="profileCoverImg"/>
                
                <label htmlFor="coverpic">
                <img src={user.profilePicture?PF+user.profilePicture : PF+"pictures/noAvatar.png"} style={{cursor:"pointer"}} alt="" className="profileUserImg"/>
                <input style={{display:"none"}} type="file" name="" id="coverpic" allowed=".jpg,.jpeg,.png" />
                </label>

                </div>
                <div className="profileInfo">
                    <h4 className="profileInfoName">{user.username}</h4>
                    <span className="profileInfoDesc">{user.desc}</span>
                </div>
            </div>
            <div className="upphoto">
              {/* <Coverphoto />
              <Profilephoto /> */}
            </div>
            <div className="profileRightBottom">
            <Feed username={username}/>
            <Rightbar user={user}/>
            </div>
          </div>
          </>}
        </div>
      </>
    )
}
