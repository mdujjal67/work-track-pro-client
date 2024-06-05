import Swal from "sweetalert2";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { FcGoogle } from "react-icons/fc";



const GoogleLogin = () => {

    const { googleLogin } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    // const from = location?.state?.from?.pathname || "/";

    const handleSocialLogin = (socialProvider) => {
        socialProvider()
            .then(result => {
                if (result.user) {
                    navigate(location?.state ? location?.state : '/')
                }
            })
    };

    //   for google login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                console.log(result.user);

                const userInfo = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL,
                    role: 'Employee',
                    bank_account_no: '',
                    salary: '',
                    designation: 'Executive',
                    isVerified : 'Pending'
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                    })
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate(location?.state ? location?.state : '/')
            })
    };

    return (
        <div>
            {/* <button onClick={() => handleSocialLogin(handleGoogleLogin)} aria-label="Log in with Google" className="p-3 rounded-sm">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-5 h-5 fill-current">
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                </svg>
            </button> */}
            <div className="form-control mt-4 px-8 pb-6 relative lg:w-full">
                <button onClick={() => handleSocialLogin(handleGoogleLogin)} className="btn border-none text-[#00000082] hover:bg-gray-200 w-full text-center">Continue with Google</button>
                <FcGoogle className="absolute top-3 left-[60px] text-[24px]" />
            </div>
        </div>
    );
};

export default GoogleLogin;