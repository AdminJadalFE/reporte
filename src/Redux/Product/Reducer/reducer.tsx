export interface ProductState {
  isAuthenticated: boolean;
  message: string;
  products: [],
  product:{
    products:[]
  }
}

const initialState = {
    isAuthenticated: false,
    message: "",
    products: [],
  };

interface Action {
    type: string;
    payload?: any;
}
  
  
export default function productReducer(state = initialState, action: Action) {
    switch (action.type) {
        case "CREATE_PRODUCT_SUCCESS":
            return {
              ...state,
              products: [...state.products, action.payload],
              message: "Product created successfully",
            };        
        case "FETCH_PRODUCTS_SUCCESS":
            return {
              ...state,
              products: action.payload,
              message: "Products fetched successfully",
            };        
        default:
            return state;
        }
  }
  