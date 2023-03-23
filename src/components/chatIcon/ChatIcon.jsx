import React, { useState } from "react";
import "./chatIcon.css";
import { IconButton } from '@material-ui/core';
import MessageIcon from '@mui/icons-material/Message';
import ChatBubble from "./ChatBubble";
import { useSelector } from "react-redux";
import Authenticate from "./Authenticate";


function ChatIcon() {
    const [visible, setVisible] = useState(false);
    const user = useSelector(state=>state.user.currentUser);

    function toggleVisible() {
      setVisible(!visible);
    }

  
    return (
      <div
        className={`chat-icon ${visible ? "visible" : ""}`}
        onClick={toggleVisible}
      >
           {user ? (
        <React.Fragment>
          <MessageIcon style={{ fontSize: '33px', zIndex: 1000 }} />
          {visible && <ChatBubble toggleVisible={toggleVisible} />}
        </React.Fragment>
      ) : (
        <React.Fragment>
           <MessageIcon style={{ fontSize: '33px', zIndex: 1000 }} />
          {visible &&  <Authenticate toggleVisible={toggleVisible} />}
        </React.Fragment>
      )}
      </div>
    );
  }
  
  export default ChatIcon;
  