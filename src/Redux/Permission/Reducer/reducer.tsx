const initialState = {
    isAuthenticated: false,
    message: "",
    permissions: [],
  };

interface Action {
    type: string;
    payload?: any;
}

export default function permissionReducer(state = initialState, action: Action) {
    switch (action.type) {
        case "FETCH_PERMISSIONS_SUCCESS":
            return {
              ...state,
              permissions: action.payload,
              message: "Permissions fetched successfully",
            };

        default:
            return state;
        }
  }
  

