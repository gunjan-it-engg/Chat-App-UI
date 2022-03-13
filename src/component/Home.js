// import DemoCarousel from "./componentuser/causaral";

import { makeStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "@material-ui/core";
import Authdialog from "./authdialog";
import NavBar from "./navbar"
import DemoCarousel from "./caursal";
import {
    toggleauthdialog,
  } from "../action/user";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function Home(props) {
  const classes = useStyles();
  return (
    <div>
      <NavBar></NavBar>
      <DemoCarousel/>
      <Authdialog/>
      {props.login == false ? <Button variant="outlined" onClick={()=>props.toggleauthdialog()}>SigIN</Button> :""}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    login: state.auth.isloggedin,
    authstate: state.auth.isRegister,
    profileData: state.auth?.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ toggleauthdialog}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
