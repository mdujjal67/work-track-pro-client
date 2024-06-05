import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { useContext } from "react";
import useHR from "../Hooks/useHR";
import PropType from "prop-types"

const HRRoutes = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isHR, isHRLoading] = useHR()
    const location = useLocation();

    if (loading || isHRLoading) {
        return <span className="loading loading-ring loading-lg mt-[300px] ml-[600px] pb-10"></span>
    }

    if (user && isHR) {
        return children;
    }

    return <Navigate to="/login" state={{ from: location }} replace></Navigate>
};

HRRoutes.propTypes = {
    children: PropType.object
}
export default HRRoutes