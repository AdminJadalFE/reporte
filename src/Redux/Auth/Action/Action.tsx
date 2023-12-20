import { Dispatch } from "redux";

export const loginSuccess = (userData: any) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: userData,
  };
};

export const logout = () => async (dispatch: Dispatch) => {
  dispatch({
    type: "LOGOUT",
  });
};

export const initializeState = () => (dispatch: any) => {
    const storedData = {
      isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
      user: {
        id: localStorage.getItem("userId") || "",
        name: localStorage.getItem("userName") || "",
        token: localStorage.getItem("userToken") || "",
        permissions: (localStorage.getItem("userPermissions") || "").split(","),
      },
      message: localStorage.getItem("userMessage") || "",
    };
  
    dispatch({
      type: "INITIALIZE_STATE",
      payload: storedData,
    });
  };