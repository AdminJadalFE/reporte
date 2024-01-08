import { Dispatch } from "redux";

export const loginSuccess = (auth: any) => {
  return {
    type: "LOGIN_SUCCESS",
    payload: { auth },
  };
};

export const selectCompany = (companyName: string) => {
  return {
    type: "SELECT_COMPANY",
    payload: { companyName },
  };
};

export const loginWithRoleAndPermissions = (role: string, permissions: string[]) => {
  return {
    type: "LOGIN_WITH_ROLE_PERMISSIONS",
    payload: { role, permissions },
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
        name: localStorage.getItem("username") || "",
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