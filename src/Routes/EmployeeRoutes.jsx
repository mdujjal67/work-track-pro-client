import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

import PropType from "prop-types"
import { AuthContext } from "../Provider/AuthProvider";
import useEmployee from "../Hooks/useEmployee";

const EmployeeRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isEmployee, isEmployeeLoading] = useEmployee()
    const location = useLocation();

    if (loading || isEmployeeLoading) {
        return <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      
    }

    if (user && isEmployee) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

EmployeeRoutes.propTypes = {
    children: PropType.object
}
export default EmployeeRoutes