interface User {
  id: number
  name: string,
  email: string,
  regno: string,
  dob: string,
  type: string,
  loggedIn: boolean,
}
interface ClassRoom {
 id: string,
 name: string,

}
interface Student {
  profile: User,
  classRooms: []
}
export type Action = User | Student ;