import axios from "axios";
import { Dispatch, AnyAction } from "redux";
import { auth } from "../../../Util/axios";

export const fetchClients = (company) => async (dispatch: Dispatch<AnyAction>) => {
    try {
      const response = await auth.post("api/clients/", { company });
      const clientsData = response.data.clients;
  
      dispatch({
        type: "FETCH_CLIENTS_SUCCESS",
        payload: clientsData,
      });
    } catch (error) {
      console.error("Error al obtener la lista de clientes:", error);
    }
  };