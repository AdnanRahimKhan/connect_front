import "./login.css"
import { useContext, useRef } from "react";
import { loginCall } from "../../apiCalls";
import {AuthContext} from "../../context/AuthContext"
import {CircularProgress} from "@material-ui/core"
import {Link} from "react-router-dom"

export default function Login() {
    const email = useRef();
    const password = useRef();
    const {user,isFetching,error,dispatch} = useContext(AuthContext);
    console.log(error);
    const HandleClick = (e)=>{
        e.preventDefault();
        loginCall({email:email.current.value,password:password.current.value},dispatch)
        if(error){
            alert("User does not exist! Register first!!")

        }
    };
    console.log(user);
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginleft">
                    <h3 className="loginLogo">Connect</h3>
                    <span className="logindesc">
                        Connect with friends and family around the globe.
                    </span>
                </div>
                <div className="loginright" >
                    <form className="loginBox" onSubmit={HandleClick}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                        <input placeholder="Password" type="password"  required className="loginInput" minLength="6" ref={password}/>
                        <button className="loginbutton" type="submit" disabled={isFetching}>{isFetching?<CircularProgress color="white" size="20px "/>:"Log In"}</button>
                        <span className="loginForgot">Forgot the password?</span>
                        <Link to="/register">
                        <button className="loginRegisterButton" style={{marginLeft:"18%"}}>{isFetching?<CircularProgress color="white" size="20px "/>:"Create a New Account"}</button>
                        </Link>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
