import { FaCircleArrowRight } from "react-icons/fa6";
import 'animate.css';


const SliderContent = () => {
    return (
        <div className="animate__animated animate__slideInLeft">
            <div className="lg:w-3/5 lg:pl-14 pl-10 pr-3">
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-white">Climb to Success with WorkTrackPro!</h1>
                <p className="text-white py-7 text-[14px] lg:w-[550px]">Transform Your Workflow, Enhance Productivity,
                    and Achieve Your Goals. Join the Community of Successful Professionals with WorkTrackPro!</p>
                <a href="#services">
                    <div className="relative flex">
                            <button className="pl-4 pr-10 py-2 text-white bg-[#00a1ea] hover:bg-[#00a1eaCC] hover:opacity-90 rounded-[8px]">Explore More</button>
                        <FaCircleArrowRight className="text-white absolute top-[13px] left-[125px] hover:rotate-90" />
                    </div>
                </a>
            </div>

        </div>
    );
};

export default SliderContent;