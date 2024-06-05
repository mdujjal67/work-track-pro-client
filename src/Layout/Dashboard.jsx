import { FaHome, FaUsers } from "react-icons/fa";
import { MdOutlinePayment } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { FaMessage } from "react-icons/fa6";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className="flex">
            {/* dashboard content */}
            <div className="w-64 bg-orange-400 min-h-screen mr-5">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            <>
                                <li className="mb-2">
                                    <NavLink to='/dashboard/messages'>
                                        <FaMessage className="text-lg" />
                                        Messages</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/all-employee-list'>
                                        <FaUsers className="text-lg" />
                                        All Users</NavLink>
                                </li>
                            </> :
                            <>
                                <li className="">
                                    <NavLink to='/dashboard/userHome'>
                                        <FaHome className="text-lg" />
                                        User Home</NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/paymentHistory'>
                                        <MdOutlinePayment className="text-lg" />
                                        Payment History</NavLink>
                                </li>
                            </>
                    }


                    <div className="divider"></div>
                    {/* shared components */}
                    <li className="">
                        <NavLink to='/'>
                            <FaHome className="text-lg" />
                            Home</NavLink>
                    </li>
                </ul>
            </div>
            {/* sidebar content */}
            <div className="flex-1">
                {/* <h1 className="text-3xl font-semibold text-center pt-8">Welcome back to your dashboard</h1> */}
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;