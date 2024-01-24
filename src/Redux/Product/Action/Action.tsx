import axios from 'axios';
import { Dispatch } from 'redux';
import { inventory } from "../../../Util/axios";

export const fetchProducts = () => async (dispatch: Dispatch) => {
    try {
      const response = await inventory.get("api/products/");
      const productsData = response.data.message;

      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        payload: productsData,
      });
    } catch (error) {
      console.error('Error al obtener la lista de usuarios:', error);
    }
  };

  export const createProduct = (ProductsData) => async (dispatch: Dispatch) => {
    try {
      const response = await inventory.post("api/products/", ProductsData);
      const newProduct = response.data;
  
      dispatch({
        type: 'CREATE_PRODUCT_SUCCESS',
        payload: newProduct,
      });
  
      fetchProducts()(dispatch);
    } catch (error) {
      console.error('Error al crear un nuevo producto:', error);
      //throw error; //retornar error
    }
  };