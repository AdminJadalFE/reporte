import axios from "axios";
import { Dispatch } from "redux";
import { auth } from "../../../Util/axios";

export const fetchPermissions = () => async (dispatch: Dispatch) => {
  try {
    const response = await auth.get("api/permissions/");
    const permissionsData = response.data.message;

    dispatch({
      type: "FETCH_PERMISSIONS_SUCCESS",
      payload: permissionsData,
    });
  } catch (error) {
    console.error("Error al obtener la lista de usuarios:", error);
  }
};
