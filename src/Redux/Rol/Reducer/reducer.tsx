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
        default:
            return state;
        }
  }
  