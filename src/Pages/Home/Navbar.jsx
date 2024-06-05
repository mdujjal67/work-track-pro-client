import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../Provider/AuthProvider";
import logo from "../../assets/favicon.png"

const Navbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {

            })
            .catch(error => { console.log(error) })
    }

    const navOptions = <>
        <li>
            <NavLink className={({ isActive }) => isActive ? 'isActive hover:text-[#00a1ea] hover:bg-white bg-white border-b-2 border-[#00a1ea] rounded-[3px] text-[#00a1ea]' : 'hover:text-[#00a1ea] hover:bg-white'} to='/'>Home</NavLink>
        </li>

        <li>
            <NavLink className={({ isActive }) => isActive ? 'isActive hover:text-[#00a1ea] hover:bg-white mt-1 lg:mt-0 lg:ml-2 border-b-2 border-[#00a1ea] rounded-[3px] text-[#00a1ea] ' : 'hover:text-[#00a1ea] hover:bg-white mt-1 lg:mt-0 lg:ml-2'} to='/dashboard'>Dashboard</NavLink>
        </li>

        <li>
            <NavLink className={({ isActive }) => isActive ? 'isActive hover:text-[#00a1ea] hover:bg-white my-1 lg:my-0 lg:mx-2 border-b-2 border-[#00a1ea] rounded-[3px] text-[#00a1ea] ' : 'hover:text-[#00a1ea] hover:bg-white my-1 lg:my-0 lg:mx-2'} to='/contact-us'>Contact Us</NavLink>
        </li>
        <li>
            {/* <Link to='/dashboard/cart'>
                <button className="btn btn-sm mr-3">
                    <FaShoppingCart  className="text-xl"/>
                    {
                        user ?
                        <div className="badge badge-secondary">+{cart.length}</div> : <div className="badge badge-secondary">+0</div>
                    }
                </button>
            </Link> */}
        </li>


      

    </>

    return (
        <div className="container mx-auto">
            <div className="navbar bg-base-400 pb-12 flex justify-between ">
                <div className="navbar-start">
                    <div className="dropdown block lg:hidden z-50">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            {navOptions}
                        </ul>
                    </div>
                    <Link to="/">
                        <span className="flex gap-1 items-center">
                            <img src={logo} alt="" />
                            <h2 className="lg:text-2xl font-semibold">WorkTrackPro</h2>
                        </span>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:block">
                    <ul className="menu menu-horizontal px-1">
                        {navOptions}
                    </ul>
                </div>

                <div className="navbar-end">
                {user? 
                    <div className=" dropdown dropdown-end z-10">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img referrerPolicy="no-referrer" src={user?.photoURL} alt="user" />
                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <Link to="/user-profile">
                                <li className="">
                                    <button className="justify-between py-1 hover:bg-[#00396a] rounded-lg text-gray-700 gray-on-dark-mode hover:text-gray-300">
                                        Profile
                                        <span className=" text-[10px]">{user.email}</span>
                                    </button>
                                </li>
                            </Link>
                            <li>
                                <button className="menu md:block py-1 hover:bg-[#00396a] rounded-lg text-gray-700 gray-on-dark-mode hover:text-gray-300" onClick={handleLogOut}>Log Out</button>
                            </li>
                        </ul>
                    </div>
                    :
                    <div className="">
                    {
                        user?.email ? '' :
                            <div className="flex gap-2">
                                <button className="menu text-[14px] lg:text-[16px] px-1 lg:mr-2 bg-[#00a1ea] hover:bg-gray-200 hover:text-gray-700 rounded-lg text-white "><Link to="/login">Login</Link></button>

                                <button className="menu px-1 text-[14px] lg:text-[16px] bg-[#00a1ea] rounded-lg text-white hover:bg-gray-200 hover:text-gray-700"><Link to="/sign-up">Sign Up</Link></button>
                            </div>
                    }
                </div>

                }
                </div>
                
            </div>
        </div>
    );
};

export default Navbar;