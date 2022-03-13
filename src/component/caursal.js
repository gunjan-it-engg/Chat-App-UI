import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "1500px",
    // height: "400px",
    // marginTop: "56px",
    // marginBottom: "56px",
  },
  carousel: {
    "& .thumbs": {
      display: "none",
    },
    "& .carousel-slider ": {
      height: "750px",
    },
  },
}));

function DemoCarousel() {
  const classes = useStyles();
  //   window.location = window.location.host + window.location.pathname;
  return (
    <div>
      <Carousel className={classes.carousel}>
        <div className={classes.root}>
          <img
            src={window.location + `/assests/chat-live.jpg`}
            style={{
              height: "750px",
            }}
          />
        </div>
        <div className={classes.root}>
          <img
            src={window.location + `/assests/socket.jpg`}
            style={{
              height: "850px",
            }}
          />
        </div>
        <div className={classes.root}>
          <img
            src={window.location + `/assests/chatroom.jpg`}
            style={{
              height: "850px",
            }}
          />
        </div>
        <div className={classes.root}>
          <img
            src={window.location + `/assests/mob chat.png`}
            style={{
              height: "800px",
            }}
          />
        </div>
      </Carousel>
    </div>
  );
}

export default DemoCarousel;