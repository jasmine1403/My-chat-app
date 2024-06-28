import {user} from "../Join/Join";
import {useEffect,useState} from 'react'
import socketIo from "socket.io-client";
import "./chat.css";
import sendLogo from "../../images/send.png";
import ReactScrollToBottom from "react-scroll-to-bottom";
import Message from "../message/message";
import closeIcon from "../../images/closeIcon.png";
let socket;

const ENDPOINT="http://localhost:4500/"


const Chat = () => {

socket= socketIo(ENDPOINT,{transports : ['websocket']});
const [id, setid] = useState("");
const [messages, setMessages] = useState([])
const send = () => {
  const message = document.getElementById('chatInput').value;
  socket.emit('message', { message, id });
  document.getElementById('chatInput').value = "";
}


useEffect(() => {
  socket = socketIo(ENDPOINT, { transports: ['websocket'] });

  socket.on('connect', () => {
   
      alert('Connected');
      setid(socket.id);

  })
  console.log(socket);
  socket.emit('joined', { user })

  socket.on('welcome', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
  })

  socket.on('userJoined', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message);
  })

  socket.on('leave', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message)
  })

  return () => {
      socket.emit('disconnected');
      socket.off();
  }
}, [])

useEffect(() => {
  socket.on('sendMessage', (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
  })
  return () => {
      socket.off();
  }
}, [messages])

return (
  <div className="chatPage">
      <div className="chatContainer">
          <div className="header">
              <h2>Connect with your loved ones!</h2>
              <a href="/"> <img src={closeIcon} alt="Close" /></a>
          </div>
          <ReactScrollToBottom className="chatBox">
              {messages.map((item, i) => <Message user={item.id === id ? '' : item.user} message={item.message} classs={item.id === id ? 'right' : 'left'} />)}
          </ReactScrollToBottom>
          <div className="inputBox">
              <input onKeyPress={(event) => event.key === 'Enter' ? send() : null} type="text" id="chatInput" />
              <button onClick={send} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
          </div>
      </div>

  </div>
)
}
 
export default Chat;