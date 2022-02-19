import { combineReducers } from "redux"
import auth from './auth/reducer'
const rootReducers = combineReducers({
  auth: auth
});
export type RootState = ReturnType<typeof rootReducers>;
export default rootReducers;
