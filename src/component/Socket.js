import React, { useEffect, useRef, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { io } from "socket.io-client";


import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import PrivateRoute from "./component/authRoute";

import { alpha, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    width: "100%",
    backgroundColor: "rgb(88 174 176 / 47%)",
  },
}));
const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT"
const SOCKET_SERVER_URL = 'http://localhost:4000';


const useChat = (roomId) => {
  const [messages , setMessage] = useState([])
  const socketRef = useRef()
  // const socket = io()
  useEffect(()=>{
    socketRef.current = io(SOCKET_SERVER_URL,{
      query:{roomId},
    });

    socketRef.current.on('connect',()=>{
      console.log(socketRef.current.id)
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message)=>{
      const incommingMessage = {
        ...message,
        ownedByCurrentUser: message.senderID === socketRef.current.id,   
      };
      setMessage((messages)=>[...messages , incommingMessage])
    });

    return ()=>{
      socketRef.current.disconnect()
    }
  },[roomId])
  const sendMessage = (messageBody) => {
    if (!socketRef.current) return;
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };


 
  return {
    messages,
    sendMessage
  }

}

const mapStateToProps = (state) => {
  return {
    authstate: state.auth?.isRegister,

  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(useChat);