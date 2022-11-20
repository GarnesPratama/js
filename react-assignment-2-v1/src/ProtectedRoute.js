import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  //Check URL params for password
  const [searchParams] = useSearchParams();
    if(!searchParams.get("password") || searchParams.get("password") !== "secret"){
      return <Navigate to="/unauthorized" replace />;
    }
  else{
    return children
  }

};

export default ProtectedRoute;
