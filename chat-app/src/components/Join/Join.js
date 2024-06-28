import "./join.css"
import logo from "../../images/logo.jpg"
import {Link} from "react-router-dom";
import { useState } from "react";


let user;
const sendUser=()=>{
  user=document.getElementById('joinInput').value;
  document.getElementById('joinInput').value="";
  }
const Join = () => {

const [name, setname] = useState("");

 

  return ( 
<div className="JoinPage">
<div className="JoinContainer">
  <img src={logo} alt="logo/" />
  <h1>
    CHAT ALL YOU WANT  </h1>
    <input onChange={(e)=> setname(e.target.value)} placeholder="Enter your name :)" type="text" id="joinInput"></input>
    <Link onClick={(e)=>!name?e.preventDefault():null } to="/chat" >
    <button onClick={sendUser} className="joinBtn">Login</button></Link>

</div>

</div>

   )
}
 
export default Join
export {user}


