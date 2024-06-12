import { useContext, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import GoogleLogin from '../../GoogleLogin/GoogleLogin';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

const Login = () => {
    const [loginError, setLoginError] = useState('');
    const [showPassword, setShowPassword] = useState(false)

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);

        setLoginError('');

        signIn(email, password)
            .then(result => {
                result.user;
                // console.log(user);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/')

                // Reset form fields
                form.reset();
                setLoginError('');
                navigate(from, { replace: true });
            })
            .catch((error) => {
                
                setLoginError('Wrong Email ID or Password! Please enter correct information.')
                toast.error('Please try again!', error)
                // navigate('/');
                form.reset();
                setLoginError('');
            });
    };



    return (
        <div className="hero min-h-screen bg-base-200 py-10">

            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <h1 className="text-4xl font-bold text-center pt-8">Login now!</h1>
                <form onSubmit={handleLogin} className="card-body">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="password" className="input input-bordered" required />
                        {/* password show toggle button */}
                            <button type="button" className="relative" href="#">
                                <span className="absolute right-4 -top-8" onClick={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </button>
                        <div>
                            {
                                loginError && <p className="text-[12px] text-red-500">{loginError}</p>
                            }
                        </div>
                        <label className="label">
                            <Link to='/forget-password' className="label-text-alt link link-hover">Forgot password?</Link>
                        </label>
                    </div>
                    <p className=" text-center text-[14px] sm:px-6 dark:text-gray-600">Do not have an account?
                        <Link to="/sign-up" rel="noopener noreferrer" href="#" className="underline dark:text-gray-800 hover:text-[#00a1ea] ml-1 ]">Sign up</Link>
                    </p>

                    <div className="form-control mt-6">
                        <input type="submit" className="btn bg-[#00a1ea] text-white" value="Login" />
                    </div>
                </form>
                <div className="flex items-center pt-4 space-x-1">
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                    <p className="px-3 text-sm dark:text-gray-600">Or</p>
                    <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                </div>
                <div className="flex justify-center space-x-4">

                    {/* google login */}
                    <GoogleLogin></GoogleLogin>
                </div>

            </div>
        </div>
    );
};

export default Login;