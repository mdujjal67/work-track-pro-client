import { Link } from "react-router-dom";
import development from "../../assets/under_development.gif"
const ForgetPassword = () => {
    return (
        <div className="container mx-auto">
            <div>
                <img src={development} alt="" className=" w-80 lg:w-96 mx-auto" />
            </div>
            <p className="text-2xl text-center font-semibold">This page is under development</p>
            <div className="text-center">
                <Link to="/login">
                    <button className="btn bg-[#00a1ea] text-white hover:text-black btn-md mt-7">Go Back</button>
                </Link>
            </div>
        </div>
    );
};

export default ForgetPassword;