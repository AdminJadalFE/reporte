import { AnyAction } from "redux";
export interface Rol {
  id: number;
  name: string;
  guard_name: string;
  roles: { name: string }[];
}
export interface RolState {
  isAuthenticated: boolean;
  message: string;
  roles: any[];
  rol: {
    roles: any[];
  };
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
    case "SHOW_ROL_BY_ID_SUCCESS":
      return {
        ...state,
        rol: action.payload,
        message: "Rol fetch by id successfully",
      };
    case "CREATE_ROL_SUCCESS":
      return {
        ...state,
        roles: [...state.roles, action.payload],
        message: "Rol created successfully",
      };
    case "UPDATE_ROL_SUCCESS":
      return {
        ...state,
        roles: state.roles.map((rol) =>
          rol.id === action.payload.id ? action.payload : rol
        ),
        message: "Rol updated successfully",
      };
      case "DELETE_ROL_SUCCESS":
        return {
          ...state,
          roles: state.roles.filter((rol) => rol.id !== action.payload),
          message: "Rol deleted successfully",
        };     
    default:
      return state;
  }
}
