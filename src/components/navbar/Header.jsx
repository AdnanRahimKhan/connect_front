import React, { useContext } from 'react';
import {Navbar,Nav} from "react-bootstrap";
import {Search} from '@material-ui/icons';
import "./header.css";
import {Link} from "react-router-dom"
import {AuthContext} from "../../context/AuthContext"

export default function Header() {

  const {user} = useContext(AuthContext);
  const PF =  process.env.REACT_APP_PUBLIC_FOLDER;
  const logout=()=>{
      localStorage.clear();
      window.location.reload();
  }

  const Searchbar = (e)=>{
      e.preventDefault();
      const item = document.getElementById("item").value;
      if(item!==""){
      window.location.href = "http://localhost:3000/profile/"+item;
      }
      else{
        alert("Please Enter a name");
      }
  }

    return (
            
  <Navbar collapseOnSelect expand="lg"  variant="light" className="navb">
    <Link to="/">
      <Navbar.Brand className="title-name">Connect</Navbar.Brand>
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="content">
          <form className="searchbars" onSubmit={Searchbar} >
          <input type="text" placeholder="Search for friends and Posts..." className="search " id="item" autoComplete="off"/>
          

          <label htmlFor="myBtn" className="labelsearch">
          
          <Search/>
          <input style={{display:"none"}} type="submit" id="myBtn" className="myBtn"/>
          </label>
          </form>
          <div className="menu">
        <Link to="/" className="linkshead">
        <h4 className="links menu1 li ">Homepage</h4>
        </Link>
        <Link to="/login" className="linkshead">
        <h4 className="links menu2 li"  onClick={logout}>Logout</h4>
        </Link>
        </div>
        <Link to={`/profile/${user.username}`} className="linkshead">
        <div className="name">
          <h4 className="names">Welcome {user.username}</h4>
        </div>
        <img src={user.profilePicture ? PF+user.profilePicture : PF+"pictures/noAvatar.png"} alt="logo" className="image"></img>
        </Link>
        </Nav>
      </Navbar.Collapse>
  </Navbar>
    )
}
