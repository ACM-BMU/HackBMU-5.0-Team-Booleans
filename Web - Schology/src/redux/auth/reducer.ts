import { Action, ActionType, User } from './actionTypes';

const initialState = {
  id: "",
  name: "",
  email: "",
  regno: "",
  dob: "",
  type: "",
  islogged: false,
  darkMode: false,
  classRooms: []
}

const Reducer = (state: User = initialState, action: Action):User => {
    switch(action.type) {
        case ActionType.SET_USER:
            return Object.assign({}, state, { 
              ...state,
              ...action.payload
        });
        case ActionType.SET_DARK_MODE:
            return Object.assign({}, state, { 
              ...state,
              darkMode : action.payload
        });
        case ActionType.LOG_OUT_USER:
          return Object.assign({}, state, initialState);
        default: 
            return state;
    }
}

export default Reducer;