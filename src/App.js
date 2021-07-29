import React, { useContext } from 'react';
import './index.css';
import "./pages/home/Home"
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Login from "./pages/login/Login"
import Forgot from './pages/forgot/Forgot';

import Register from "./pages/register/Register"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { AuthContext } from './context/AuthContext';

export default function App(){

    const {user} = useContext(AuthContext)

    return(
        <Router>
            <Switch>
                <Route exact path="/">
                   {user? <Home/>:<Register/>}
                </Route>
                <Route path="/login" >
                    {user?<Redirect to="/"/>:<Login/>}
                </Route>
                <Route path="/register">
                {user?<Redirect to="/"/>:<Register/>}

                </Route>
                <Route path="/profile/:username">
                    <Profile/>
                </Route>
                <Route path="/forgot-password">
                    <Forgot/>
                </Route>
            </Switch>
        </Router>
    )
}
