const initialState = {
    isAuthenticated: false,
    auth: {
      id: "",
      name: "",
      token: "",
      rol:"",
      permissions: [],
    },
    message:"",
  };
  
  interface Action {
    type: string;
    payload?: any;
  }
  
  export default function authReducer(state = initialState, action: Action) {
    switch (action.type) {
      case "LOGIN_SUCCESS":
        return {
          ...state,
          isAuthenticated: true,
          auth: {
            id: action.payload?.id || "",
            name: action.payload?.name || "",
            token: action.payload?.token || "",
            rol: action.payload?.rol || "",
            permissions: action.payload?.permissions || [],
          },
          message: action.payload?.message || "",
        };
      case "LOGOUT":
        return {
          ...state,
          isAuthenticated: false,
          auth: {
            id: "",
            name: "",
            token: "",
            rol: "",
            permissions: [],
          },
          message:"",
        };
      default:
        return state;
    }
  }
  