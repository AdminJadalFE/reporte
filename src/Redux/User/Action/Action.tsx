import axios from 'axios';
import { Dispatch } from 'redux';

export const initializeState = () => async (dispatch: Dispatch) => {
  try {

    const response = await axios.get('http://127.0.0.1:8000/api/users/');
 
    const usersData = response.data;
    dispatch({
      type: 'INITIALIZE_STATE',
      payload: {
        message: '',
        users: usersData, 
      },
    });
  } catch (error) {
    console.error('Error al inicializar el estado:', error);
  }
};

export const fetchUsers = () => async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/users/');
      const usersData = response.data.message;

      dispatch({
        type: 'FETCH_USERS_SUCCESS',
        payload: usersData,
      });
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  export const registerUser = (userData) => async (dispatch: Dispatch) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register/', userData);
      const newUser = response.data; // Ajusta según la estructura de tus datos
  
      dispatch({
        type: 'REGISTER_USER_SUCCESS',
        payload: newUser,
      });

    dispatch(fetchUsers());
    } catch (error) {
      console.error('Error al crear un nuevo usuario:', error);
    }
  };
  