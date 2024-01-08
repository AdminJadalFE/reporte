import { Dispatch } from "redux";

export const loginSuccess = (auth: any) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { auth },
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
      auth: {
        id: localStorage.getItem("authId") || "",
        name: localStorage.getItem("authName") || "",
        token: localStorage.getItem("authToken") || "",
        company: localStorage.getItem("authCompany") || "",
        rol: localStorage.getItem("authRol") || "",
        permissions: (localStorage.getItem("authPermissions") || "").split(","),
        companies: (localStorage.getItem("authCompanies") || "").split(","),
      },
      message: localStorage.getItem("authMessage") || "",
    };
  
    dispatch({
      type: "INITIALIZE_STATE",
      payload: storedData,
    });
  };