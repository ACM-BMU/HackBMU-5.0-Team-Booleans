export enum ActionType {
  SET_USER = "SET_USER",
  SET_DARK_MODE = "SET_DARK_MODE",
  LOG_OUT_USER = "LOG_OUT_USER",
}
export interface User {
  id: string | null,
  name: string | null,
  email: string | null,
  regno: string | null,
  dob: string | null,
  type: string | null,
  islogged: boolean,
  darkMode: boolean,
  classRooms: Array<Object>
}

interface actionsetUser{
  type: string;
  payload: User
}

export type Action = actionsetUser;