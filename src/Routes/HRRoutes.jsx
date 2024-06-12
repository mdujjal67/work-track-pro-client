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
        return <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col gap-4 w-52">
          <div className="skeleton h-32 w-full"></div>
          <div className="skeleton h-4 w-28"></div>
          <div className="skeleton h-4 w-full"></div>
          <div className="skeleton h-4 w-full"></div>
        </div>
      </div>
      
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