const initialState = {
  isAuthenticated: false,
  auth: {
    id: "",
    name: localStorage.getItem("username") || "",
    token: localStorage.getItem("token") || "",
    company: localStorage.getItem("company") || "",
    rol: localStorage.getItem("rol") || "",
    permissions: localStorage.getItem("permissions") || [],
    companies: [],
  },
  message: "",
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
          id: action.payload?.auth?.id || "",
          name: action.payload?.auth?.name || "",
          token: action.payload?.auth?.token || "",
          company: action.payload?.auth?.company || "",
          rol: action.payload?.auth?.rol || "",
          permissions: action.payload?.auth?.permissions || [],
          companies: action.payload?.auth?.companies || [],
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
          company: "",
          rol: "",
          permissions: [],
          companies: [],
        },
        message: "",
      };
    case "SELECT_COMPANY":
      return {
        ...state,
        auth: {
          ...state.auth,
          company: action.payload?.companyName || "",
        },
      };
    case "LOGIN_WITH_ROLE_PERMISSIONS":
      return {
        ...state,
        auth: {
          ...state.auth,
          rol: action.payload?.role || "",
          permissions: action.payload?.permissions || [],
        },
      };
    default:
      return state;
  }
}
