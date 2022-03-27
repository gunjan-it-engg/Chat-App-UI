const inititalState = {
  isRegister: localStorage.getItem("token") ? true : false,
  isloggedin: localStorage.getItem("token") ? true : false,
  isNewjoined: false,
  profileData: "",
  groupdata: null,
};

export default function authentication(state = inititalState, action) {
  switch (action.type) {
    case "REGISTER_USER": {
      return {
        isRegister: true,
        isloggedin: false,
        profileData: action.payload,
      };
    }
    case "LOGGEDIN_USER": {
      return {
        isRegister: true,
        // isVerifytoken: true,
        isloggedin: true,
        profileData: action.payload,
      };
    }
    case "LOGOUT_USER": {
      return {
        isloggedin: false,
        isRegister: false,
        profileData: action.payload,
      };
    }
    case "NEW_JOINED": {
      return {
        isloggedin: true,
        isRegister: true,
        isNewjoined: true,
      };
    }
    case "GROPS_LIST": {
      return {
        ...state,
        groupdata: action.payload,
      };
    }
    default:
      return state;
  }
}
