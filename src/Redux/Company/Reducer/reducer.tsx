import { AnyAction } from 'redux';

export interface CompanyState {
  isAuthenticated: boolean;
  message: string;
  companies: any[];
  company: {
    companies: any[]; // Adjust the type accordingly
    roles: {
      rol_id: number;
      company_id: number;
    }[];
  };
  roles: {
    id: number;
  };
}

const initialState: CompanyState = {
  isAuthenticated: false,
  message: "",
  companies: [],
  company: {
    companies: [], // Adjust the type accordingly
    roles: [],
  },
  roles: {
    id: 0, // Adjust with an appropriate initial value
  },
};

const reducer = (state: CompanyState = initialState, action: AnyAction) => {
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
        company: action.payload, // Assuming action.payload has the shape of { companies: [...] }
        message: "Company created successfully",
      };

    default:
      return state;
  }
};

export default reducer;
