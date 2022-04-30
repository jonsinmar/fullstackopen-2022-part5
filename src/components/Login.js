import { useState } from "react";

const Login = ({doLogin})=>{
const [username, setusername]=useState(null);
const [password, setPassword]=useState(null)
    return (
        <>
        userusername: <input onChange={(event)=>setusername(event.target.value)}/>
        <br/>
        password: <input type="password" onChange={(event)=>setPassword(event.target.value)}/>
        <br/>
        <button onClick={()=>doLogin({username, password})}>login</button>
        </>
    )

}


export default Login;