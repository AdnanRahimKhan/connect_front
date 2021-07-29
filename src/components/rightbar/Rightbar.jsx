import axios from 'axios';
import React, { useContext, useEffect,useState,useRef } from 'react'
import "./rightbar.css"
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {Add, Remove} from "@material-ui/icons"
import {Toast,Row,Col,Button} from "react-bootstrap"


export default function Rightbar({user}) {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [friends,setFriends] = useState([]) ;
    const {user:currentUser,dispatch} = useContext(AuthContext)
    const [followed,setFollowed] = useState(currentUser.followings.includes(user?.id));

    function UpdateUser() {
    const [show, setShow] = useState(false);
    const desc = useRef();
    const city= useRef();
    const from = useRef();
    const relationship = useRef();
     const updateDetails = async (e)=>{
        e.preventDefault();
        try{
            console.log(user._id);
            return await axios({
                method:'PUT',
                url:'http://localhost:8800/api/user/'+user._id,
                data:{
                    desc:desc.current.value,
                    city:city.current.value,
                    from:from.current.value,
                    relationship:relationship.current.value,
                    userId:currentUser._id
                },
                
            }
            )
        }catch(err){
            console.log(err);
        }
        window.location.reload();
     }
  
    return (
      <Row>
        <Col xs={6}>
          <Toast onClose={() => setShow(false)} show={show}   className="toastup">
            <Toast.Header>
              <img
                src="holder.js/20x20?text=%20"
                className="rounded me-2"
                alt=""
              />
              <strong className="me-auto">Update Your Details</strong>
            </Toast.Header>
            <Toast.Body>
                <form className="updateform">
                    <input className="inputform" type="text" placeholder="Enter Description" ref={desc} defaultValue={user.desc}/>
                    <input className="inputform" type="text" placeholder="Enter City" ref={city} defaultValue={user.city}/>
                    <input className="inputform" type="text" placeholder="Where are you From?" ref={from} defaultValue={user.from}/>
                    <input className="inputform" type="number" min="1" max="2" placeholder="Relationship" ref={relationship} defaultValue={user.relationship}/>
                    <button type="submit" className="inputbutton" onClick={updateDetails}>Update Details</button>
                </form>
            </Toast.Body>
          </Toast>
        </Col>
        <Col xs={6}>
          <Button onClick={()=>setShow(true)} className="upbutton">Update Details</Button>
        </Col>
      </Row>
    );
  }




    useEffect(()=>{
        const getFriends = async ()=>{
            try{
                const FriendList = await axios.get("http://localhost:8800/api/user/friends/"+user._id);
                setFriends(FriendList.data);
            }catch(err){
                console.log(err);
            }
        };
        getFriends();
    },[user]);

    const handleClick =async()=>{
        try{
            if(followed){
                await axios.put("http://localhost:8800/api/user/"+user._id+"/unfollow",{userId:currentUser._id});
                dispatch({type:"UNFOLLOW",payload:user._id});
            }else{
                await axios.put("http://localhost:8800/api/user/"+user._id+"/follow",{userId:currentUser._id})
                dispatch({type:"FOLLOW",payload:user._id});

            }   
        }catch(err){
            console.log(err);
        }
        setFollowed(!followed)
    }

    const HomeRightbar = ()=>{
        return(
            <>
                 <div className="birthdayContainer" >
                    <img src="assets/pictures/gift.png" alt="" className="birhdayImg"/>
                    <span className="birhtdaytext">
                        <b>Akheel </b> and <b>3 other friends</b> have their birthday today
                    </span>
                </div>
                <img src="assets/pictures/1.jpeg" className="rightbarAd" alt="" />
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarfriendlist">
                    <li className="rightbarfriend">
                        <div className="rightbarprofileimagecontainer">
                            <img src="assets/pictures/srk.jpg" className="rightbarprofileimg" alt="" />
                            <span className="rightbaronline"></span>
                        </div>
                        <span className="rightbarusername">Akheel</span>
                    </li>
                </ul>

            </>
        )
    }

    const ProfileRightbar = ()=>{
        return(
            <>
            {user.username!== currentUser.username &&(
                  <button className="rightbarFollowButton" onClick={handleClick}>
                    {!followed?"Follow":"unfollow"}
                    {!followed?<Add/>:<Remove/>}
                  </button>  
            )}

            <h4 className="rightbarTitle">User Information</h4>
            <div className="rightbarInfo">
                <div className="rightbarInfoitem">
                    <span className="rightbarInfoKey">City:</span>
                    <span className="rightbarInfoValue">{user.city}</span>
                </div>
                <div className="rightbarInfoitem">
                    <span className="rightbarInfoKey">From:</span>
                    <span className="rightbarInfoValue">{user.from}</span>
                </div>
                <div className="rightbarInfoitem">
                    <span className="rightbarInfoKey">Relationship:</span>
                    <span className="rightbarInfoValue">{user.relationship===1?"single":user.relationship===2?"Married" :"-"}</span>
                </div>
            </div>
            <div className="update">
            { user.username === currentUser.username&&( <UpdateUser className="updateuser"/>)  }
                
            
            </div>
            <h4 className="rightbarTitle">User Friends</h4>
            <div className="rightbarFollowings">
                {friends.map(friend=>(
                    <Link to={"/profile/"+friend.username} style={{textDecoration:"none"}}>
                <div className="righbarFollowing">

                    <img src={friend.profilePicture?PF+friend.profilePicture:PF+"pictures/noAvatar.png"} alt="" className="rightbarfollowingimage" />
                    <span className="rightbarFollowingname">{friend.username}</span>
                </div>
                    </Link>

                 ))}
            </div>
           
            </>
        )
    }

    return (
        <div className="rightbar">
            <div className="rightbarWrapper">
              {user? <ProfileRightbar/>:<HomeRightbar/> }

            </div>
        </div>
    )
}
