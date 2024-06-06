import { FaHome, FaUsers } from "react-icons/fa";
import { MdOutlinePayment, MdWorkHistory } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../Hooks/useAdmin";
import { FaMessage } from "react-icons/fa6";
import useHR from "../Hooks/useHR";
import { IoLogOut } from "react-icons/io5";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const Dashboard = () => {

    const axiosSecure = useAxiosSecure();

    const { data: messages = [] } = useQuery({
        queryKey: ['messages'],
        queryFn: async () => {
            const res = await axiosSecure.get('/messages')
            return res.data
        }
    });


    const { logOut } = useContext(AuthContext);
    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => { console.log(error) })
    }

    const [isAdmin] = useAdmin();
    const [isHR] = useHR()
    return (
        <div className="flex">
            {/* dashboard content */}
            <div className="w-64 bg-[#00a1ea] min-h-screen mr-5">
                <ul className="menu p-4">
                    {
                        isAdmin ?
                            (<>
                                <li className="mb-2">
                                    <NavLink to='/dashboard/messages'>
                                        <FaMessage className="text-lg" />
                                        Messages
                                        <span className="indicator-item badge badge-secondary text-[12px]">{messages.length}</span>
                                        </NavLink>
                                </li>
                                <li>
                                    <NavLink to='/dashboard/all-employee-list'>
                                        <FaUsers className="text-lg" />
                                        Employees</NavLink>
                                </li>
                            </>) :
                            isHR ?
                                (<>
                                    <li className="mb-2">
                                        <NavLink to='/dashboard/employee-list'>
                                            <FaHome className="text-lg" />
                                            Employee List</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/progress'>
                                            <MdOutlinePayment className="text-lg" />
                                            Progress</NavLink>
                                    </li>
                                </>) :
                                (<>
                                    <li className="mb-2">
                                        <NavLink to='/dashboard/work-sheet'>
                                            <MdWorkHistory className="text-lg" />
                                            Work Sheet</NavLink>
                                    </li>
                                    <li>
                                        <NavLink to='/dashboard/paymentHistory'>
                                            <MdOutlinePayment className="text-lg" />
                                            Payment History</NavLink>
                                    </li>
                                </>)
                    }

                    <div className="divider"></div>
                    {/* shared components */}
                    <li className="">
                        <NavLink to='/'>
                            <FaHome className="text-lg" />
                            Home</NavLink>
                    </li>
                    <li className="mb-2">
                        <button onClick={handleLogOut}>
                            <IoLogOut className="text-[20px]" />
                            LogOut</button>
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