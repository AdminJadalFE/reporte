const initialState = {
    isAuthenticated: false,
    user: {
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
          user: {
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
          user: {
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
  