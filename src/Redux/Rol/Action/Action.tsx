import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchRoles = () => async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/roles/');
      const rolesData = response.data.message;

      dispatch({
        type: 'FETCH_ROLES_SUCCESS',
        payload: rolesData,
      });
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };
