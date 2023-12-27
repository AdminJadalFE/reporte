import axios from 'axios';
import { Dispatch } from 'redux';

export const fetchCompaniesByUser = () => async (dispatch: Dispatch) => {
    try {
        // Obtener el token del localStorage
        const token = localStorage.getItem('token');
        console.log('token',token);
        // Verificar si hay un token antes de hacer la solicitud
        if (!token) {
            console.error('Token no encontrado en el localStorage');
            return;
        }

        // Configurar el encabezado con el token
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        // Hacer la solicitud con el encabezado configurado
        const response = await axios.get('http://127.0.0.1:8000/api/companies_users/', config);
        const companiesData = response.data.message;
        console.log('companiesData',companiesData)
        dispatch({
            type: 'FETCH_COMPANIES_BY_USER_SUCCESS',
            payload: companiesData,
        });
    } catch (error) {
        console.error('Error al obtener la lista de empresas:', error);
    }
};

export const fetchCompanies = () => async (dispatch: Dispatch) => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/companies/');
      const companiesData = response.data.message;
      console.log('companies',companiesData)  
      dispatch({
        type: 'FETCH_COMPANIES_SUCCESS',
        payload: companiesData,
      });
    } catch (error) {
      console.error('Error al obtener la lista de empresas:', error);
    }
  };
