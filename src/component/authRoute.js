import { Redirect, Route } from "react-router";
import React, { useState } from "react";
import Backdrop from "@material-ui/core/Backdrop";
// import {  makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";
import { bindActionCreators } from "redux";
import { toggleauthdialog } from "../action/user";
import { connect } from "react-redux";


// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 2,
//     width: "100%",
//     backgroundColor: "rgb(88 174 176 / 47%)",
//   },
// }));

const PrivateRoute = ({ component: Component, ...rest }) => {
//   const classes = useStyles();
  
  const token = localStorage.getItem("token");
  return (
    <Route
      {...rest}
      render={({ location, ...props }) =>
        props?.authstate || token  ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    register: state.auth.isloggedin,
    authstate: state.auth.isloggedin,
    profileData: state.auth?.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleauthdialog }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);
