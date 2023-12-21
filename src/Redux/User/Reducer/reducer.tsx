const initialState = {
    isAuthenticated: false,
    message: "",
    users: [],
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_USERS_SUCCESS":
        return {
          ...state,
          users: action.payload,
          message: "Users fetched successfully",
        };
  
      case "CREATE_USER_SUCCESS":
        return {
          ...state,
          users: [...state.users, action.payload],
          message: "User created successfully",
        };
  
      case "UPDATE_USER_SUCCESS":
        return {
          ...state,
          users: state.users.map((user) =>
            user.id === action.payload.id ? action.payload : user
          ),
          message: "User updated successfully",
        };
  
      case "DELETE_USER_SUCCESS":
        return {
          ...state,
          users: state.users.filter((user) => user.id !== action.payload),
          message: "User deleted successfully",
        };
  
      // Agregar otros casos de acción según sea necesario
  
      default:
        return state;
    }
  };
  
  export default reducer;
  