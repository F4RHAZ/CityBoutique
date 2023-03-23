import React, { useState, useEffect, useRef } from "react";
import "./chatbubble.css";
import { useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";

function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${formattedHours}:${minutes} ${amOrPm} - ${day}/${month}/${year}`;
  }


function ChatBubble(props) {
    const {toggleVisible} =props
    const [replyMessage, setReplyMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector((state) => state.user.currentUser);
    const chatContainerRef = useRef(null);
    //console.log(user._id)
    const adminId = process.env.REACT_APP_ADMIN_ID;
    //console.log(adminId)
 
    function handleClick(e) {
        e.stopPropagation();
    } 

    useEffect(()=>{
        const getMessages = async()=>{
          try{
            const res = await userRequest.get("message/"+user._id);
            setMessages(res.data)
          }catch(err){
            console.log(err);
          }
        }
        getMessages();
      },[])




      const handleReplySubmit = async () => {
        const newMessage = {
          senderId: user._id,
          recipientId: adminId,
          message: replyMessage
        };
        //console.log(newMessage)
        try {
          const res = await userRequest.post("/message", newMessage);
          //console.log(res.data);
          // do something with the response
         alert("message Sent");
         setReplyMessage(" ");
         toggleVisible(false);
            
        } catch (error) {
          console.error(error);
        }
      };


    function close(){
        toggleVisible(false)
    }

  return (
    <div className="chat-container" onClick={handleClick} ref={chatContainerRef}>
            <div className="closeBtn" onClick={close}>X</div>
          <div className="chat-messages">
            {messages.map((message) => (
               <div
               className={`chat-message ${message.senderId.isAdmin ? 'received' : 'sent'}`}
                key={message._id}
              >
                   <div className="chat-message-text">{message.message}</div>
            <div className="chat-message-timestamp">{formatTimestamp(message.createdAt)} by {message.senderId.username}</div>
              </div>
            ))}
          </div>
          <div className="chat-reply-container">
                <input className="chat-reply-input"
                type="text"
                placeholder="Type your message"
                value={replyMessage}
                onChange={(e) => setReplyMessage(e.target.value)}
                />
                <button className="chat-reply-button" 
                onClick={handleReplySubmit}>Send</button>
            </div>
        </div>
      );
    
}

export default ChatBubble;
