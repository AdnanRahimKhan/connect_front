import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions,Cancel} from "@material-ui/icons"
import { useContext, useState,useRef } from "react"
import { AuthContext } from "../../context/AuthContext"
import axios from "axios"

export default function Share(){

    const {user} = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc =  useRef();
    const [file,setFile] = useState(null);
    const submitHandler = async (e)=>{
        e.preventDefault();
        const newPost = {
            userId:user._id,
            desc:desc.current.value
        }
        if(file){
            const data = new FormData();
            const fileName = Date.now()+file.name;
            data.append("name",fileName);
            data.append("file",file);
            newPost.img = fileName;
            console.log("new post")
            try{
                await axios.post("http://localhost:8800/api/upload",data);
            }catch(err){
                console.log(err)
            }
        }
        try{
          await axios.post("http://localhost:8800/api/posts/",newPost)
          window.location.reload();
        }catch(err){
            console.log(err);
        }
    }

    return(
        <div className="share">
            <div className="sharewrapper">
            <div className="ShareTop">
                <img src={user.profilePicture ?PF+user.profilePicture: PF+"pictures/noAvatar.png"} alt="profilepic" className="profileimg"/>
                <input type="text" placeholder={"What's in your mind " +user.username +" ?"} className="shareInput" ref={desc} required></input>
            </div>
            <hr className=" shareHr"/>
            {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
            <form className="ShareBottom" onSubmit={submitHandler}>
                <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia className="shareIcon" htmlColor="tomato"/>
                        <span className="shareoptiontext">Photo or Video</span>
                        <input style={{display:"none"}} type="file" name="" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
                    <div className="shareOption">
                        <Label className="shareIcon" htmlColor="blue"/>
                        <span className="shareoptiontext">Tag</span>
                    </div>
                    <div className="shareOption">
                        <Room className="shareIcon" htmlColor="green"/>
                        <span className="shareoptiontext">Location</span>
                    </div>
                    <div className="shareOption">
                        <EmojiEmotions className="shareIcon" htmlColor="goldenrod"/>
                        <span className="shareoptiontext">Feelings</span>
                    </div>
                </div>
                <button className="shareButton" type="submit">Share</button>
            </form>
            </div>
        </div>
    )
}