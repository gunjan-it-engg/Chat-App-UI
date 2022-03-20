import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import TextField from "@mui/material/TextField";
import { connect } from "react-redux";
import { chatstart } from "../action/user";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import socketIOClient, { io } from "socket.io-client";

// import Covidcases from "../animationComponent/covidcases";
// import AnimatedNumber from "animated-number-react";
import LocationOnIcon from "@material-ui/icons/LocationOn";
// import Livecovid from "../animationComponent/livecovid";
import UpdateIcon from "@material-ui/icons/Update";
import TrendingUpSharpIcon from "@material-ui/icons/TrendingUpSharp";
import ArrowUpwardSharpIcon from "@material-ui/icons/ArrowUpwardSharp";
import TrendingDownSharpIcon from "@material-ui/icons/TrendingDownSharp";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { height } from "@mui/system";
import Tooltip from "@material-ui/core/Tooltip";

const ENDPOINT = "http://localhost:4000";
// const ENDPOINT = "http://13.229.123.137:4000";

const useStyles = makeStyles((theme) => ({
  buttom: {
    marginTop: theme.spacing(62),
    // position:"fixed",
    // marginBottom:"1px",
    // marginTop:"20px"
  },
  root: {
    // minWidth: 275,
    width: "450px",
    height: "650px",
    marginLeft: "47px",
    marginBottom: "20px",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    "& .MuiSvgIcon-root": { fontSize: "0.9rem" },
  },
  update: {
    "& .MuiSvgIcon-root": { fontSize: "1.4rem" },
  },
  cases: {
    marginTop: "-55px",
  },
  loading: {
    color: "black",
    "& > * + *": {
      width: "20px",
      height: "20px",
    },
  },
}));

function SimpleCard(props) {
  let socket = props.chatting;
  // console.log("props check", props.name);
  const [response, setResponse] = useState([]);
  const [newone, setNewone] = useState("");
  const [chat, setChat] = useState("");
  useEffect(() => {
    // const socket = socketIOClient(ENDPOINT);
    // const socket = socketIOClient(ENDPOINT, {
    //   auth: { token: localStorage.getItem("token") },
    // });

    function Chatcall() {
      socket.emit();
    }
    socket.on("recive", (dataa) => {
      setResponse(dataa);
    });
    socket.on("connectedUsersCount", (datas) => {
      setNewone(datas);
    });
    socket.on("chating", (data) => {
      setChat(data);
    });
  }, []);
  const user = {
    items: [
      { id: 1, title: "Gunjan" },
      { id: 2, title: "Ram lal" },
      { id: 3, title: "Ranveer" },
      { id: 4, title: "Mobzway" },
      { id: 5, title: "nitin" },
      { id: 6, title: "nitesh" },
      { id: 7, title: "neha" },
    ],
  };
  const rooms = {
    room: [
      { id: 1, title: "teen patti" },
      { id: 2, title: "cassiono" },
    ],
  };
  const classes = useStyles();
  const { items } = user;
  const { room } = rooms;

  //   useEffect(() => {
  //     return props.getCoviddata();
  //   }, []);
  const formatValue = (value) => value.toFixed();

  const bull = <span className={classes.bullet}>•</span>;
  //   console.log(props?.coviddata.totalcases.Countries[76]);

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {console.log("data", response)}
      {/* {console.log("props drilling", props.name)} */}
      <Card
        className={classes.root}
        style={{ backgroundColor: "#bfe4f6ba" }}
        variant="outlined"
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Live Users
          </Typography>
          <div style={{ margin: "2px" }}>
            {response?.map((item) => (
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  margin: "5px",
                }}
              >
                <div>{item.id}</div>
                <div style={{ marginLeft: "5px" }}>
                  <Button
                    onClick={() => props.chatstart(item.id)}
                    variant="outlined"
                  >
                    <ChatIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      <Card
        className={classes.root}
        style={{ backgroundColor: "rgb(191 246 191 / 73%)" }}
        variant="outlined"
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Chat with user
          </Typography>
          <Typography>{chat}</Typography>
        </CardContent>
        <CardActions
          className={classes.buttom}
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <div style={{ position: "sticky" }}>
            <TextField
              style={{ width: "350px" }}
              id="outlined-basic"
              label="Chat"
              variant="outlined"
            />
            <Button
              style={{ width: "60px", height: "55px" }}
              variant="outlined"
            >
              <SendIcon />
            </Button>
          </div>
        </CardActions>
      </Card>
      <Card
        className={classes.root}
        style={{
          backgroundColor: "rgb(247 207 197 / 73%)",
        }}
        variant="outlined"
      >
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Rooms
          </Typography>
          <div style={{ margin: "2px" }}>
            {room.map((item) => (
              <div
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                  margin: "5px",
                }}
              >
                <div>{item.title}</div>
                <div style={{ marginLeft: "5px" }}>
                  <Button variant="outlined">
                    <ChatIcon />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      {/* <Covidcases /> */}
      <div className={classes.cases}></div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authstate: state.auth?.isloggedin,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      chatstart,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(SimpleCard);
