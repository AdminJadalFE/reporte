import axios from 'axios';
import { Dispatch } from 'redux';
import { auth } from "../../../Util/axios";

export const fetchRoles = () => async (dispatch: Dispatch) => {
    try {
      const response = await auth.get("api/roles/");
      const rolesData = response.data.message;

      dispatch({
        type: 'FETCH_ROLES_SUCCESS',
        payload: rolesData,
      });
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  export const createRol = (userData: any) => async (dispatch: Dispatch) => {
    try {
      const response = await auth.post("api/roles/", userData);
      const newUser = response.data;
  
      dispatch({
        type: 'CREATE_ROL_SUCCESS',
        payload: newUser,
      });

      await fetchRoles()(dispatch);
    } catch (error) {
      console.error('Error al crear un nuevo usuario:', error);
    }
  };  