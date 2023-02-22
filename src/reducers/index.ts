// import { combineReducers, createStore } from "redux";
// import auth from "./modules/auth";

// const reducer = combineReducers({
//     auth: auth,
// });

// const store = createStore(reducer)
// export default store;

import { DispatchAction, InitialState, authReducer } from "./modules/user-reducer";
import { createStore } from "redux";

export const store = createStore<InitialState, DispatchAction, null, null>(authReducer);