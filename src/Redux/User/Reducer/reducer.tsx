export interface User {
  id: number;
  name: string;
  email: string;
  roles: { name: string }[];
  photo: string;
  companies: [];
  // Add other properties as needed
}
export interface UserState {
  isAuthenticated: boolean;
  message: string;
  users: User[];
  userDetail?: User; // Change the type to User instead of string[]
  user: {
    users: User[];
    userDetail: User[]; // Change the type to User instead of string[]
    companies: any[];
  };
}


const initialState: UserState = {
  isAuthenticated: false,
  message: "",
  users: [],
  user: {
    users: [],
    userDetail: [],
    companies: [],
  },
};


const reducer = (state: UserState = initialState, action: any): UserState => {
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
        users: state.users.map((user: User) =>
          user.id === action.payload.id ? action.payload : user
        ),
        message: "User updated successfully",
      };

    case "DELETE_USER_SUCCESS":
      return {
        ...state,
        users: state.users.filter((user: User) => user.id !== action.payload),
        message: "User deleted successfully",
      };

    case "SHOW_USER_BY_ID_SUCCESS":
      console.log("Received user details:", action.payload);
      return {
        ...state,
        userDetail: action.payload,
        message: "User details fetched successfully",
      };

    default:
      return state;
  }
};

export default reducer;
