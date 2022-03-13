import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import { TextField, Button } from "@material-ui/core";
import { Loginuser, closeauthdialog } from "../action/user";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { useHistory } from "react-router";
import { withRouter } from "react-router-dom";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    padding: 13,
    height: "auto",
    width: 280,
    margin: "4px auto",
    height: "300px",
  },
}));

const MyForm = (props) => {
  const [btn, setbtn] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  function handelClick() {
    setbtn((current) => !current);
  }

  const handleClose = () => {
    props.closeauthdialog();
  };

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ paddingRight: "10px", paddingLeft: "30px" }}>
          <div style={{ display: "contents" }}>
            <TextField
              style={{ width: "90%" }}
              label="Name"
              type="text"
              variant="standard"
              placeholder="enter name"
              required
              error={touched.name && !!errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                ),
              }}
              name="name"
            />
            {errors.name && touched.name && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.name}
              </div>
            )}
          </div>
          <div>
            <TextField
              style={{ width: "90%" }}
              label="Email"
              type="email"
              variant="standard"
              placeholder="enter Email"
              required
              error={touched.email && !!errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              name="email"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.email && touched.email && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.email}
              </div>
            )}
          </div>
          <div>
            <TextField
              style={{ width: "90%" }}
              label="Password"
              type={btn === false ? "password" : "text"}
              variant="standard"
              placeholder="enter password"
              required
              error={touched.password && !!errors.password}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              name="password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => handelClick()}>
                      {btn === true ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {errors.password && touched.password && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.password}
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            justifyContent: "center",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            color="primary"
            type="submit"
          >
            Login
          </Button>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </div>
        <div className={classes.root}>
          <Snackbar
            open={values.setOpen}
            autoHideDuration={5000}
            onClose={() => props.setFieldValue("setOpen", false)}
          >
            <Alert
              onClose={() => props.setFieldValue("setOpen", false)}
              severity="success"
            >
              User has been added in list, please scroll down!
            </Alert>
          </Snackbar>
        </div>
      </form>
    </>
  );
};

const MyLoginForm = withRouter(
  withFormik({
    mapPropsToValues: () => ({
      name: "",
      email: "",
      password: "",
      setOpen: false,
    }),

    // Custom sync validation
    validate: (values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Required";
      }

      if (!values.email) {
        errors.email = "Email is required";
      }

      if (!values.password) {
        errors.password = "password is required";
      }
      return errors;
    },

    handleSubmit: async (values, { props, setFieldValue }) => {
      try {
        console.log("props: ", props);
        
        const res = await props.Loginuser(values);
  
        if (res.status == 201) {
          props.history.push("/chat");
        } 
        //   props.CloseDialog();
      } catch (error) {
        console.log(error.message);
      }
    },

    displayName: "BasicForm",
  })(MyForm)
);

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ Loginuser, closeauthdialog }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(MyLoginForm);
