import { useState } from "react";
import Notification from "./Notification"

const Login = ({doLogin, message})=>{
const [username, setusername]=useState(null);
const [password, setPassword]=useState(null)
    return (
        <>
        <Notification message={message.text} type={message.type} />
        userusername: <input onChange={(event)=>setusername(event.target.value)}/>
        <br/>
        password: <input type="password" onChange={(event)=>setPassword(event.target.value)}/>
        <br/>
        <button onClick={()=>doLogin({username, password})}>login</button>
        </>
    )

}


export default Login;