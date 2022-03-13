const inititalState = {
    authdialog: false,
  };
  
  export default function authdialog(state = inititalState, action) {
    switch (action.type) {
      case "OPEN_AUTH": {
        return {
          authdialog: true,
        };
      }
      case "CLOSE_AUTH": {
        return {
          authdialog: false,
        };
      }
      default:
        return state;
    }
  }
  