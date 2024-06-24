import axios from 'axios';
import { Dispatch } from 'redux';
import { auth } from "../../../Util/axios";
import { RolState } from '../Reducer/reducer';

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
      const newRol = response.data;
  
      dispatch({
        type: 'CREATE_ROL_SUCCESS',
        payload: newRol,
      });

      await fetchRoles()(dispatch);
    } catch (error) {
      console.error('Error al crear un nuevo usuario:', error);
    }
  };  
  export const deleteRol = (rolId) => async (dispatch) => {
    try {
      await auth.delete(`api/roles/${rolId}`);
      dispatch({
        type: 'DELETE_ROL_SUCCESS',
        payload: rolId,
      });
    } catch (error) {
      console.error('Error al eliminar el rol:', error);
    }
  };
  
  interface ShowRolByIdAction {
    type: string;
    payload: RolState;
  }
  
  // Definir el tipo de la acción de showRolById
  export const showRolById = (userId: number) => async (dispatch: Dispatch<ShowRolByIdAction>) => {
    try {
      const response = await auth.get(`api/roles/${userId}`);
      const rolDetails = response.data.message;      
      dispatch({
        type: "SHOW_ROL_BY_ID_SUCCESS",
        payload: rolDetails,
      });
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

export const updateRol = (userId, updatedRolData) => async (dispatch) => {
  try {
    const response = await auth.put(`api/roles/${userId}`, updatedRolData);
    const updatedRol = response.data; 
  
    dispatch({
      type: "UPDATE_ROL_SUCCESS",
      payload: updatedRol,
    });
    dispatch(fetchRoles());
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};  