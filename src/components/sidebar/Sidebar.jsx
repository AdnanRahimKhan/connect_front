import React from 'react'
import "./sidebar.css"
import {RssFeed,Notifications,Work,SportsEsports,PersonPinCircle} from "@material-ui/icons"
import {Link} from "react-router-dom"

export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarlistItem">
                        <RssFeed className="sidebarIcon " />
                        <Link to="/" className="sidelinks">
                        <span className="sidebarListitemText">Feed</span>
                        </Link>
                    </li>
                </ul>
                <ul className="sidebarList">
                    <li className="sidebarlistItem">
                        <Notifications className="sidebarIcon " />
                        <Link to={{ pathname: "https://www.ndtv.com/" }} target="_blank" className="sidelinks">
                        <span className="sidebarListitemText">News</span>
                        </Link>
                    </li>
                </ul>
                <ul className="sidebarList">
                    <li className="sidebarlistItem">
                        <Work className="sidebarIcon " />
                        <Link to={{ pathname: "https://www.naukri.com/" }} target="_blank" className="sidelinks">
                        <span className="sidebarListitemText">Jobs</span>
                        </Link>
                    </li>
                </ul>
                <ul className="sidebarList">
                    <li className="sidebarlistItem">
                        <SportsEsports className="sidebarIcon " />
                        <Link to={{ pathname: "https://www.microsoft.com/en-in/store/games/windows" }} target="_blank" className="sidelinks">
                        <span className="sidebarListitemText">Games</span>
                        </Link>
                    </li>
                </ul>
                <ul className="sidebarList">
                    <li className="sidebarlistItem">
                        <PersonPinCircle className="sidebarIcon " />
                        <Link to={{ pathname: "https://www.google.com/maps/" }} target="_blank" className="sidelinks">
                        <span className="sidebarListitemText">Nearby</span>
                        </Link>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr"/> 
                <ul className="sidebarFriendlist">
                    <li className="sidebarFriend">
                        <img src="/assets/pictures/srk.jpg " className=" sidebarfriendImg" alt="img"></img>
                        <span className="sidebarFriendName">ADNAN</span>
                    </li>
                    <li className="sidebarFriend">
                        <img src="/assets/pictures/srk.jpg " className=" sidebarfriendImg" alt="img"></img>
                        <span className="sidebarFriendName">aKHEEL</span>
                    </li>
                    
                    
                </ul>
            </div>
        </div>
    )
}
