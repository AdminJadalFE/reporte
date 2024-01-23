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
  
    await fetchUsers()(dispatch);
    } catch (error) {
      console.error('Error al crear un nuevo usuario:', error);
    }
  };
  
  export const deleteUser = (userId) => async (dispatch) => {
    try {
      const confirmDelete = window.confirm("¿Estás seguro de que quieres eliminar este usuario?");
      if (confirmDelete) {
        await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`);
        dispatch({
          type: 'DELETE_USER_SUCCESS',
          payload: userId,
        });
      }
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

export const showUserById = (userId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/users/${userId.userId}`);
    const userDetails = response.data.message;
    console.log('userDetails',userDetails);
    dispatch({
      type: "SHOW_USER_BY_ID_SUCCESS",
      payload: userDetails,
    });
  } catch (error) {
    console.error('Error al obtener detalles del usuario:', error);
  }
};

export const updateUser = (userId, updatedUserData) => async (dispatch) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/users/${userId}`, updatedUserData);
    const updatedUser = response.data; 
  
    dispatch({
      type: "UPDATE_USER_SUCCESS",
      payload: updatedUser,
    });
    dispatch(fetchUsers());
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
  }
};