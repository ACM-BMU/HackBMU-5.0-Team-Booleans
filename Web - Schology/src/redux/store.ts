import { createStore, applyMiddleware, compose, Store } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./rootReducer";
const saveToLocalStorage = (state: any) => {
    try {
      const serialisedState = JSON.stringify(state);
      localStorage.setItem("User", serialisedState);
    } catch (e) {
      console.warn(e);
    }
  }
  
  const loadFromLocalStorage = () => {
    try {
      const serialisedState = localStorage.getItem("User");
      if (serialisedState === null) return undefined;
      return JSON.parse(serialisedState);
    } catch (e) {
      console.warn(e);
      return undefined;
    }
  }
const store = createStore(rootReducer, loadFromLocalStorage(), applyMiddleware(thunk));
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;