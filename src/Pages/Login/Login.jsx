import { useContext, useState } from 'react';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../Provider/AuthProvider';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import GoogleLogin from '../../GoogleLogin/GoogleLogin';
import toast from 'react-hot-toast';

const Login = () => {
    const [loginError, setLoginError] = useState('')

    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || "/";

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        setLoginError('');

        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);

                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Login successful",
                    showConfirmButton: false,
                    timer: 2000
                });

                navigate(from, { replace: true });
            })
            .catch((error) => {
                console.log(error)
                setLoginError('Wrong Email ID or Password! Please enter correct information.')
                toast.error('Please try again!');
            });
    };

    // const [disabled, setDisabled] = useState(true)
    // // load captcha auto after click load-captcha
    // useEffect(() => {
    //     loadCaptchaEnginge(6);
    // }, []);

    // const handleValidateCaptcha = (event) => {
    //     const user_captcha_value = event.target.value;
    //     if (validateCaptcha(user_captcha_value)) {
    //         setDisabled(false);
    //     }

    //     else {
    //         alert('Captcha Does Not Match');
    //     }
    // };



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
                        <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        <div>
                                    {
                                        loginError && <p className="text-[12px] text-red-500">{loginError}</p>
                                    }
                                </div>
                        <label className="label">
                            <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                        </label>
                    </div>
                    <p className=" text-center sm:px-6 dark:text-gray-600">Do not have an account?
                        <Link to="/sign-up" rel="noopener noreferrer" href="#" className="underline dark:text-gray-800 hover:text-orange-500 ml-1">Sign up</Link>
                    </p>

                    <div className="form-control mt-6">
                        <input type="submit" className="btn bg-orange-500 text-white" value="Login" />
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