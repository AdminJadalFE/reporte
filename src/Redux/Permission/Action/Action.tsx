import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchPermissions = () => async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/permissions/');
      const permissionsData = response.data.message;

      dispatch({
        type: 'FETCH_PERMISSIONS_SUCCESS',
        payload: permissionsData,
      });
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };
