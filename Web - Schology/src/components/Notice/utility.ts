export enum AlertType {
   Alert_Primary = 'primary',
   Alert_Secondary = 'secondary',
   Alert_Success = 'success',
   Alert_Danger = 'danger',
   Alert_Warning = 'warning',
   Alert_Info = 'info',
   Alert_Light = 'light',
   Alert_Dark = 'dark',
}
export enum AlertNotices {
  SET_USER_TYPE = "Are you a Student or a Teacher ?",
  NON_REVERSAL_PROCESS = "This is a non-reversal process, please select carefully.",
  JOIN_CLASS = "Trying to find your class ? ",
  ENTER_CODE_TO_JOIN = "Enter the code in the below field.",
  WANT_TO_CREATE_A_CLASS = "Want to create a new class ?",
  ENTER_DETAILS = "Please enter all details",
  Make_A_CLASS = "Your dashboard looks empty, create a class now !",
  JOIN_A_CLASS = "Your dashboard looks empty, join a class now !",
  OFFLINE = "You are not connected to the network. Please try to connect with stable connection",
  NOT_FOUND = "Page not Found. Go to Home Page."
}
export enum UserRoles {
  ROLE_STUDENT = "Student",
  ROLE_TEACHER = "Teacher",
}
export enum DataBaseTables {
  Users = "Users",
  ClassRooms = "ClassRooms",
}
export const ClassHex = [
  "#8CD1F6",
  "#36BCD0", // blue
  "#FDDF9E", // yellow
  "#FF89A1", // red
  "#60D4A3", // green
  "#9B6DCB", // purple
]