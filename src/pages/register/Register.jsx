import "./register.css"
import { useRef } from "react"
import axios from "axios";
import {useHistory} from "react-router"
import { Link } from "react-router-dom";

export default function Register() {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();

    const HandleClick = async (e)=>{
      
        e.preventDefault();
        if(passwordAgain.current.value !== password.current.value){
            passwordAgain.current.setCustomValidity("Passwords don't match!");
        }else{
            const user = {
                username :username.current.value,
                email :email.current.value,
                password :password.current.value,
            }
            try{
                await axios.post("http://localhost:8800/api/auth/register",user);
                history.push("/login");

            }catch(err){
                console.log(err);
            }
        }
    };
    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginleft">
                    <h3 className="loginLogo">Connect</h3>
                    <span className="logindesc">
                        Connect with friends and family around the globe.
                    </span>
                </div>
                <div className="loginright">
                    <form className="loginBox" onSubmit={HandleClick}>

                        <input placeholder="Username" type="text" required className="loginInput" ref={username}/>
                        <input placeholder="Email" required type="email" className="loginInput" ref={email}/>
                        <input placeholder="Password" required minLength="6" type="password" className="loginInput" ref={password}/>
                        <input placeholder="Confirm Password" required type="password" className="loginInput" ref={passwordAgain}/>
                        <button className="loginbutton" type="submit">Sign Up</button>
                        {/* <span className="loginForgot">Forgot the password?</span> */}
                        <Link to="/login">
                        <button className="loginRegisterButton" style={{marginLeft:"18%"}}>Log into Account</button>
                        </Link>
                    </form>
                </div>
            </div>
            
        </div>
    )
}
