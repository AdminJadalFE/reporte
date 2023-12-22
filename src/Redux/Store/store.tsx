import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reducerExample from "../Example/Reducer/reducer";
import reducerAuth from "../Auth/Reducer/reducer";
import reducerUser from "../User/Reducer/reducer";
import reducerRol from "../Rol/Reducer/reducer";
import reducerPermission from "../Permission/Reducer/reducer";
import reducerProduct from "../Product/Reducer/reducer";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = [thunk];

const rootReducer = combineReducers({
  //example: reducerExample,
  product: reducerProduct,
  permission: reducerPermission,
  rol: reducerRol,  
  user: reducerUser,
  auth: reducerAuth,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
