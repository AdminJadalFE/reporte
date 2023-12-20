import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import reducerExample from "../Example/Reducer/reducer";
import reducerAuth from "../Auth/Reducer/reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const middleware = [thunk];

const rootReducer = combineReducers({
  //example: reducerExample,
  auth: reducerAuth,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
