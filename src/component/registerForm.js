import React, { useEffect, useState } from "react";
import { withFormik } from "formik";
import { TextField, Button } from "@material-ui/core";
import {
    registeruser,
    closeauthdialog,
} from "../action/user";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import MuiAlert from "@material-ui/lab/Alert";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import MailOutlineOutlinedIcon from "@material-ui/icons/MailOutlineOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import PhoneIcon from "@material-ui/icons/Phone";
import FlagIcon from '@mui/icons-material/Flag';
import CastleIcon from '@mui/icons-material/Castle';
import LocationCityIcon from '@mui/icons-material/LocationCity';
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
  },
}));

const MyForm = (props) => {
  const classes = useStyles();
  const [btn, setbtn] = useState(false);

  const handleClose = () => {
    props.closeauthdialog();
  };

  function handelClick() {
    setbtn((current) => !current);
  }

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  return (
    <>
      <div style={{}}>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              width: "45%",
              display: "inline-grid",
              margin: "0 10px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
              label="Name"
              type="text"
              variant="standard"
              placeholder="enter name"
              required
              error={touched.name && !!errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              name="name"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleOutlinedIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.name && touched.name && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.name}
              </div>
            )}
          </div>
          <div
            style={{
              width: "45%",
              display: "inline-grid",
              margin: "0 10px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
              label="Last Name"
              type="text"
              variant="standard"
              placeholder="enter last name"
              required
              error={touched.lname && !!errors.lname}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.lname}
              name="lname"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <InsertEmoticonIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.lname && touched.lname && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.lname}
              </div>
            )}
          </div>
          
          <div
            style={{
              width: "45%",
              display: "inline-grid",
              margin: "0 10px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
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
              onClick={() => props.errorremove()}
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
          <div
            style={{
              width: "45%",
              display: "inline-grid",
              margin: "0 10px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
              label="Password"
              variant="standard"
              placeholder="enter password"
              type={btn === false ? "password" : "text"}
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
          <div
            style={{
              width: "45%",
              display: "inline-grid",
              margin: "0 10px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
              label="Phone"
              type="number"
              variant="standard"
              placeholder="enter phone"
              required
              error={touched.phone && !!errors.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phone}
              name="phone"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.phone && touched.phone && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.phone}
              </div>
            )}
          </div>
          <div
            style={{
              width: "45%",
              display: "inline-grid",
              margin: "0 10px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
              label="Country"
              type="text"
              variant="standard"
              placeholder="enter country"
              required
              error={touched.country && !!errors.country}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.country}
              name="country"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <FlagIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.country && touched.country && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.country}
              </div>
            )}
          </div>
          <div
            style={{
              width: "45%",
              display: "inline-grid",
              margin: "0 10px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
              label="State"
              type="text"
              variant="standard"
              placeholder="enter state"
              required
              error={touched.state && !!errors.state}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.state}
              name="state"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <CastleIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.state && touched.state && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.state}
              </div>
            )}
          </div>
          <div
            style={{
              width: "45%",
              display: "inline-grid",
              margin: "0 10px",
            }}
          >
            <TextField
              style={{ width: "100%" }}
              label="City"
              type="text"
              variant="standard"
              placeholder="enter city"
              required
              error={touched.city && !!errors.city}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.city}
              name="city"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <LocationCityIcon />
                  </InputAdornment>
                ),
              }}
            />
            {errors.city && touched.city && (
              <div style={{ color: "red", textAlign: "left" }} id="feedback">
                {errors.city}
              </div>
            )}
          </div>
          {props.error == "Request failed with status code 400" ? (
            <div
              style={{
                color: "red",
                textAlign: "center",
                paddingTop: "10px",
                paddingBottom: "1px",
              }}
              id="feedback"
            >
              {"Email already in use"}
            </div>
          ) : (
            ""
          )}
          <div style={{ textAlign: "-webkit-center" }}>
            <Button
              style={{ marginTop: "20px" }}
              variant="contained"
              onClick={handleSubmit}
              color="primary"
              type="submit"
            >
              Register
            </Button>
            <Button
              onClick={handleClose}
              style={{ marginTop: "20px" }}
              variant="text"
              color="primary"
            >
              cancel
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

const MyRegisterForm = withFormik({
  mapPropsToValues: () => ({
    name: "",
    lname: "",
    phone: "",
    email: "",
    password: "",
    country: "",
    state:"",
    city:"",
  }),

  // Custom sync validation
  validate: (values, props) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Required";
    }

    if (!values.lname) {
      errors.lname = "lname Required";
    }

    if (!values.phone) {
      errors.phone = "phone is required";
    } else if (`${values.phone}`.length > 10) {
      errors.phone = "phone must be 10";
    }

    if (!values.email) {
      errors.email = "Email is required";
    }

    if (!values.country) {
      errors.country = "country is required";
    }
    if (!values.state) {
        errors.state = "state is required";
    }
    if (!values.city) {
        errors.city = "city is required";
    }
    if (!values.password) {
      errors.password = "password is required";
    } else if (`${values.password}`.length <= 7) {
      errors.password = "password at least minimum 7 diff char-set";
    }
    return errors;
  },

  handleSubmit: async (values, { props, setFieldValue }) => {
    try {
      await props.registeruser(values);
      //   console.log(props);
      // setFieldValue("setOpen", true);
      //   props.CloseDialog();
    } catch (error) {
      console.log(error.message);
    }
  },

  displayName: "BasicForm",
})(MyForm);

const mapStateToProps = (state) => {
  return {
    error: state?.error?.register,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { registeruser, closeauthdialog },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(MyRegisterForm);
