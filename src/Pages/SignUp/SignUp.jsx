import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
// import { FcGoogle } from "react-icons/fc";
import GoogleLogin from "../../GoogleLogin/GoogleLogin";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const onSubmit = (data) => {
        // console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                // console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL,
                            bankAccountNumber: data.bankAccountNumber,
                            salary: data.salary,
                            designation: data.designation,
                            role: data.role,
                            isVerified : 'Pending',
                            employeeStatus: 'Active',
                        };
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    Swal.fire({
                                        title: "Success!",
                                        text: "User created successfully!",
                                        icon: "success"
                                    });
                                    reset();
                                    navigate('/');
                                }
                            })
                    })
                    .catch(error => (error))
            })
    };

    return (
        <div>
            <div className=" min-h-screen bg-base-200 py-10">
                <div className="hero-content  container mx-auto">
                    <div className="card shrink-0 w-full lg:w-[700px] shadow-2xl bg-base-100 px-5">
                        <h1 className="text-4xl font-bold text-center my-10">Sign Up now!</h1>
                        <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* This is for name field*/}
                            <div className="form-control col-span-2 lg:col-span-1">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input {...register("name", { required: true })} type="text" name="name" placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">Name is required</span>}
                            </div>

                            {/* This is for email field*/}
                            <div className="form-control col-span-2 lg:col-span-1 ">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email", { required: true })} type="email" name="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">Email is required</span>}
                            </div>

                            {/* This is for Password field*/}
                            <div className="form-control col-span-2 lg:col-span-1 ">
                                <label className="label">
                                    <span className="label-text">Create Password</span>
                                </label>
                                <input {...register("password", { required: true, pattern: /(?=.*[A-Z])(?=.*[!@#$%^&*]).{6,}/ })} type={showPassword ? "text" : "password"} name="password" placeholder="Password" className="input input-bordered" />
                                {/* password show toggle button */}
                                <button type="button" className="relative">
                                    <span className="absolute right-4 -top-8" onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                                    </span>
                                </button>
                                {errors.password?.type === "required" && <span className="text-red-500">Password is required</span>}
                                {errors.password?.type === "pattern" && <span className="text-red-500 text-[12px] mt-2">Password must be at least 6 characters long and contain at least one uppercase letter and one special character</span>}
                            </div>

                            {/* This is for Bank Account field*/}
                            <div className="form-control col-span-2 lg:col-span-1 ">
                                <label className="label">
                                    <span className="label-text">Bank Account Number</span>
                                </label>
                                <input {...register("bankAccountNumber", { required: true })} type="number" name="bankAccountNumber" placeholder="Bank Account Number" className="input input-bordered" />
                                {errors.bankAccountNumber && <span className="text-red-500">Bank Account Number is required</span>}
                            </div>

                            {/* This is for Salary field*/}
                            <div className="form-control col-span-2 lg:col-span-1 ">
                                <label className="label">
                                    <span className="label-text">Salary</span>
                                </label>
                                <input {...register("salary", { required: true })} type="number" name="salary" placeholder="Salary" className="input input-bordered" />
                                {errors.salary && <span className="text-red-500">Salary is required</span>}
                            </div>

                            {/* This is for role field */}
                            <div className="form-control col-span-2 lg:col-span-1">
                                <label className="label">
                                    <span className="label-text">Role</span>
                                </label>
                                <select {...register("role", { required: true })} name="role" className="select select-bordered" >
                                    <option disabled value="">Select Your Role</option>
                                    <option value="HR">HR</option>
                                    <option value="Employee">Employee</option>
                                </select>
                                {errors.role && <span className="text-red-500">Role is required</span>}
                            </div>

                            {/* This is for Designation field*/}
                            <div className="form-control col-span-2 lg:col-span-1">
                                <label className="label">
                                    <span className="label-text">Designation</span>
                                </label>
                                <input {...register("designation", { required: true })} type="text" name="designation" placeholder="Ex: Sales Assistant, Digital Marketer" className="input input-bordered" />
                                {errors.designation && <span className="text-red-500">Designation is required</span>}
                            </div>

                            {/* This is for Photo URL field*/}
                            <div className="form-control col-span-2 lg:col-span-1">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input {...register("photoURL", { required: true })} type="text" name="photoURL" placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-500">Photo URL is required</span>}
                            </div>

                            <p className=" text-center sm:px-6 dark:text-gray-600 col-span-2 text-[14px]">Already have an account?
                                <Link to="/login" rel="noopener noreferrer" className="underline  hover:text-[#00a1ea] ml-1">Login</Link>
                            </p>

                            <div className="form-control mt-6 col-span-2">
                                <input type="submit" className="btn bg-[#00a1ea] text-white w-full" value="Sign Up" />
                            </div>
                        </form>

                        <div className="flex items-center space-x-1">
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                            <p className="px-3 text-sm dark:text-gray-600">Or</p>
                            <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
                        </div>
                        <div className="flex justify-center space-x-4 mx-3">
                            <div className="form-control mt-4 px-8 pb-6 relative">
                                <GoogleLogin>
                                    <button className="btn border-none text-[#00000082] hover:bg-gray-200">Continue with Google</button>
                                </GoogleLogin>

                                {/* <FcGoogle className="absolute top-3 left-[60px] text-[24px]" /> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
