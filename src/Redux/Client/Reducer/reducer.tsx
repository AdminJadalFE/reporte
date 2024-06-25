import { AnyAction } from 'redux';

export interface ClientState {
  isAuthenticated: boolean;
  message: string;
  id_client_v: number;
  fist_name_v: string;
  clients: Array<{ id_client_v: number, fist_name_v: string }>;
}

const initialState: ClientState = {
  isAuthenticated: false,
  message: "",
  id_client_v: 0,
  fist_name_v: "",
  clients: []
};

const reducer = (state: ClientState = initialState, action: AnyAction) => {
  switch (action.type) {
    case "FETCH_CLIENTS_SUCCESS":
      return {
        ...state,
        clients: action.payload,
        message: "Clients fetched successfully",
      };
    default:
      return state;
  }
};

export default reducer;
