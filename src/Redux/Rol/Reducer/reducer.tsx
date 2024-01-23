import { AnyAction } from 'redux';
export interface RolState {
  isAuthenticated: boolean;
  message: string;
  roles: any[];
}

const initialState = {
    isAuthenticated: false,
    message: "",
    roles: [],
  };

interface Action {
    type: string;
    payload?: any;
}
  
export default function rolReducer(state = initialState, action: Action) {
    switch (action.type) {
        case "FETCH_ROLES_SUCCESS":
            return {
              ...state,
              roles: action.payload,
              message: "Roles fetched successfully",
            };

        case "CREATE_ROL_SUCCESS":
            return {
                ...state,
                roles: [...state.roles, action.payload],
                message: "Rol created successfully",
                };

        default:
            return state;
        }
  }
  