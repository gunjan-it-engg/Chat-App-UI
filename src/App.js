import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import socketIOClient, { Socket } from "socket.io-client";
import React, { useEffect, useRef, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
// import { io } from "socket.io-client";
import Home from "./component/Home";
import Chat from "./component/Chat";
import Chatcontent from "../src/component/ChatContent";
import PrivateRoute from "./component/authRoute";
import { alpha, makeStyles } from "@material-ui/core/styles";
import { justchat, connection } from "./action/user";
import Notfoundd from "./component/notFound";
import { PinDropSharp } from "@material-ui/icons";
// import UseChat from "./component/Socket"
const ENDPOINT = "http://localhost:4000";
// const ENDPOINT = "http://13.229.123.137:4000";

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 2,
    width: "100%",
    backgroundColor: "rgb(88 174 176 / 47%)",
  },
}));
// const NEW_CHAT_MESSAGE_EVENT = "NEW_CHAT_MESSAGE_EVENT"
// const SOCKET_SERVER_URL = 'http://localhost:4000';
let socket = socketIOClient(ENDPOINT, {
  auth: { token: localStorage.getItem("token") },
});
function App(props) {
  const [response, setResponse] = useState("");
  const [newone, setNewone] = useState("");
  const [chat, setChat] = useState("");

  useEffect(() => {
    // socket = socketIOClient(ENDPOINT, {
    //   auth: { token: localStorage.getItem("token") },
    // });
    console.log("Effect check", socket);

    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
    socket.on("connectedUsersCount", (datas) => {
      setNewone(datas);
    });
    socket.on("chating", (data) => {
      setChat(data);
    });
  }, []);
  useEffect(() => {
    props.justchat();
    // props.connection()
  }, []);
  // const [messages , setMessage] = useState([])
  // const socketRef = useRef()
  // // const socket = io()
  // useEffect(()=>{
  //   socketRef.current = io(SOCKET_SERVER_URL,{
  //     query:{roomId},
  //   });

  //   socketRef.current.on('current',()=>{
  //     console.log(socketRef.current.id)
  //   });

  //   socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message)=>{
  //     const incommingMessage = {
  //       ...message,
  //       ownedByCurrentUser: message.senderID === socketRef.current.id,
  //     };
  //     setMessage((message)=>[...messages , incommingMessage])
  //   });

  //   return ()=>{
  //     socketRef.current.disconnect()
  //   }
  // },[roomId])
  // const sendMessage = (messageBody) => {
  //   if (!socketRef.current) return;
  //   socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
  //     body: messageBody,
  //     senderId: socketRef.current.id,
  //   });
  // };

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          {/* <Route exact path="/chat" component={Chat}></Route> */}
          <PrivateRoute path="/chat">
            <Chat web={socket} />
          </PrivateRoute>
          <Route exact={true} path="*" component={Notfoundd}></Route>
        </Switch>
      </Router>
      <p>
        It's <time dateTime={response}>{response}</time>
      </p>
      <h4> total user available {newone}</h4>
      <h4> chat {chat}</h4>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authstate: state.auth?.isloggedin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ justchat, connection }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
