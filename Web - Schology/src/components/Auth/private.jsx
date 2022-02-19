import { Navigate, Route } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => 
(  
  <Route {...rest} element={<Navigate to={{pathname: '/auth'}}/>}/>
);
export default PrivateRoute;