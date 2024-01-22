const initialState = {
  isAuthenticated: false,
  message: "",
  companies: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_COMPANIES_BY_USER_SUCCESS":
      return {
        ...state,
        companies: action.payload,
        message: "Companies by user fetched by user successfully",
      };

    case "FETCH_COMPANIES_SUCCESS":
      return {
        ...state,
        companies: action.payload,
        message: "Companies fetched by user successfully",
      };

      case "CREATE_COMPANY_SUCCESS":
        return {
          ...state,
          company: action.payload,
          message: "Company created successfully",
        };

    default:
      return state;
  }
};

export default reducer;
