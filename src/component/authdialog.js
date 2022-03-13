import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { bindActionCreators } from "redux";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import { connect } from "react-redux";
import {
  registeruser,
  toggleauthdialog,
  closeauthdialog,
} from "../action/user";
import MyRegisterForm from "./registerForm";
import MyLoginForm from "./loginForm";
import { ClassNames } from "@emotion/react";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  dialogWrapper: {
    "& .MuiDialog-paperScrollPaper": {
      minWidth: "600px !important",
    },
  },
}));

function AuthDialog(props) {
  const classes = useStyles();
  const [swip, setSwip] = useState(false);
  const SwaipForm = () => {};
  console.log("Dialog auth state", props.authd);
  const handleClose = () => {
    props.closeauthdialog();
  };

  return (
    <div>
      <Dialog
        open={props.authd}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.dialogWrapper}
      >
        <DialogTitle id="form-dialog-title">
          <div style={{ fontWeight: "bold" }}>
            {swip == false ? "Login" : "Register"}
          </div>
        </DialogTitle>
        <DialogContent>
          {swip == false ? <MyLoginForm /> : <MyRegisterForm />}
          <DialogContentText
            style={{
              marginTop: "20px",
              marginBottom: "5px",
              paddingLeft: "20px",
            }}
          >
            Do you have an account?{" "}
            <Link
              onClick={() => {
                swip == false ? setSwip(true) : setSwip(false);
              }}
            >
              {swip === false ? "SignUp" : "SignIn"}
            </Link>
          </DialogContentText>
          <DialogContentText>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Typography variant="subtitle" style={{ fontSize: "11px" }}>
                By Proceeding , you agree to our Term of Use and confirm You
                read our privacy and cokkies statement
              </Typography>
            </div>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authstate: state?.auth?.isRegister,
    authd: state?.authdialog?.authdialog,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { registeruser, toggleauthdialog, closeauthdialog },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthDialog);
