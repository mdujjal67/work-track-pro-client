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
        return <span className="loading loading-ring loading-lg mt-[300px] ml-[600px] pb-10"></span>
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