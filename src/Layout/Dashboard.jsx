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
    const [isHR] = useHR();

    const dashboardOptions = <>
        {
            isAdmin ?
                (<>
                    <li className="mb-2">
                        <NavLink to='/dashboard/messages'>
                            <FaMessage className="text-lg" />
                            Messages
                            <span className="indicator-item badge badge-secondary text-[10px]">{messages.length}</span>
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
                            <NavLink to='/dashboard/payment-history'>
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
    </>

    return (
        <div className="lg:flex">
            {/* dashboard content */}
            <div className="lg:w-64 w-40 bg-white lg:mr-5">
                <div>
                    <div className="dropdown block lg:hidden z-50 ]">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-[10px]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul tabIndex={0} className="lg:hidden block menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 bg-[#00a1eaCC">
                            {dashboardOptions}
                        </ul>
                    </div>
                </div>
                <div className=" hidden lg:block min-h-screen">
                    <ul className="menu p-4 bg-[#00a1ea] min-h-screen">
                        {dashboardOptions}
                    </ul>
                </div>
            </div>
            {/* sidebar content */}
            <div className="lg:flex-1">
                {/* <h1 className="text-3xl font-semibold text-center pt-8">Welcome back to your dashboard</h1> */}
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;