import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { alpha, makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: "40px",
  },
  main: {
    marginTop: "100px",
  },
}));

function Notfoundd() {
  const classes = useStyles();
  console.log("nav bar");
  return (
    <div>
      <h2>Page Not Found</h2>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authstate: state.auth.isRegister,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Notfoundd);
