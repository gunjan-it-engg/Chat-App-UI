import axios from "axios";
export const REGISTER_USER = "REGISTER_USER";
export const OPEN_AUTH = "OPEN_AUTH";
export const CLOSE_AUTH = "CLOSE_AUTH";
export const LOGGEDIN_USER = "LOGGEDIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const CHAT = "CHAT";
export const NEW_JOINED = "NEW_JOINED";

export const registeruser = (data) => {
    return async (dispatch) => {
      try {
        // let resp = await axios.post("http://13.229.123.137:4000/users",{data});
        let resp = await axios.post("http://localhost:4000/users", { data });
        console.log(resp.status);
  
        if (resp.status == 201) {
          console.log("dispatching action", resp);
          dispatch({
            type: "REGISTER_USER",
            payload: resp.data.user,
          });
          dispatch({
            type: "CLOSE_AUTH",
          })
          console.log("dispatched action");
        } else {
          console.log("error");
        }
      } catch (error) {
        dispatch({
          type: "ERROR_REG",
          payload: error.message,
        });
        console.log(error.message);
      }
    };
  };


  export const toggleauthdialog = () => {
    return (dispatch) => {
      dispatch({
        type: OPEN_AUTH,
      });
    };
  };
  
  export const closeauthdialog = () => {
    return (dispatch) => {
      dispatch({
        type: CLOSE_AUTH,
      });
    };
  };


  export const Loginuser = (data) => {
    // const history = useHistory();
    return async (dispatch) => {
      try {
        console.log(data)
        // let resp = await axios.post("http://13.229.123.137:4000/users/login",{data});
        let resp = await axios.post("http://localhost:4000/users/login", {
          data,
        });
        console.log(resp.status);
  
        if (resp.status == 201) {
          const { token } = resp.data;
          console.log("dispatching action", resp);
          localStorage.setItem("token", token);
          dispatch({
            type: "LOGGEDIN_USER",
            payload: resp.data.user,
          });
          dispatch({
            type: CLOSE_AUTH,
          });
          return resp;
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  };


  export const logoutuser = () => {
    return async (dispatch) => {
      try {
        const token = "Bearer " + localStorage.getItem("token");
        // let resp = await axios.post("http://13.229.123.137:4000/users/logout",null,{headers:{Authorization:token},});
        let resp = await axios.post("http://localhost:4000/users/logout", null, {
          headers: { Authorization: token },
        });
        if (resp.status == 200) {
          localStorage.removeItem("token");
          localStorage.removeItem("User");
          console.log("you are logged out");
          dispatch({
            type: LOGOUT_USER,
          });
        } else {
          console.log("message");
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  };

// initilizing the socket route
export const justchat = () => {
  return async (dispatch) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
        // let resp = await axios.post("http://13.229.123.137:4000/user/chat",null,{headers:{Authorization:token},});
      let respa = await axios.post("http://localhost:4000/user/chat", null, {
          headers: { Authorization: token },
        });
      if (respa.status == 201) {
        console.log("connected");
        dispatch({
          type: NEW_JOINED,
        });
      } else {
        console.log("message");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};

// initilizing the socket router
export const connection = () => {
  return async (dispatch) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
        // let resp = await axios.post("http://13.229.123.137:4000/connection",null,{headers:{Authorization:token},});
      let respa = await axios.post("http://localhost:4000/connection", null, {
          headers: { Authorization: token },
        });
      if (respa.status == 201) {
        console.log("connected");
        dispatch({
          type: NEW_JOINED,
        });
      } else {
        console.log("message");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};


// chat initilization with user
export const chatstart = (data) => {
  // const history = useHistory();
  return async (dispatch) => {
    try {
      const token = "Bearer " + localStorage.getItem("token");
      // let resp = await axios.post("http://13.229.123.137:4000/users/login",{data});
      let resp = await axios.post("http://localhost:4000/user/chating", 
      { data },
      {
        headers: { Authorization: token },
      });
      console.log(resp.status);

      if (resp.status == 201) {
        console.log("start chat api sucess resp", resp);
        
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
};