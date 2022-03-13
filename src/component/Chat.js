// import DemoCarousel from "./componentuser/causaral";

import { makeStyles } from "@material-ui/core/styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import NavBar from "./navbar";
// import chatConent from "./ChatContent"
import ChatContent from "./ChatContent";



const useStyles = makeStyles((theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

function Chat(props) {
  const classes = useStyles();
  return (
    <div>
        <NavBar/>
      <h2>this is the auth authenticated page routes</h2>
        <ChatContent></ChatContent>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    verify: state.auth.isVerifytoken,
    register: state.auth.isRegister,
    authstate: state.auth.isRegister,
    profileData: state.auth?.profileData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(Chat);
