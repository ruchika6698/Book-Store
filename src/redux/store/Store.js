import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { BookdataReducer } from "./../reducers/DashBoardReducers";
import { storeReducer } from "../reducers/StoreReducers";
import { wishlistReducer } from "../reducers/WishlistReducers";
import thunk from "redux-thunk";
// store file
const masterReducer = combineReducers({
  dashboard: BookdataReducer,
  store: storeReducer,
  wishlist: wishlistReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  masterReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;

// window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
